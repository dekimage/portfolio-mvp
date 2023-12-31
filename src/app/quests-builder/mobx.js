import { makeAutoObservable } from "mobx";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signInAnonymously, getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  query,
  onSnapshot,
  updateDoc,
  getDocs,
  where,
} from "firebase/firestore";

class Store {
  user = null;
  pathways = [];
  userPathways = [];

  constructor() {
    makeAutoObservable(this);
    this.initializeAuth();
    this.fetchPathways();
    // this.fetchUserPathways();
  }

  initializeAuth() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          const newUser = {
            uid: user.uid, // Include the user ID
            level: 1,
            xp: 0,
            createdAt: new Date(),
            name: user.isAnonymous ? "Anonymous" : user.displayName,
          };
          await setDoc(userDocRef, newUser);
          this.user = newUser;
        } else {
          this.user = { uid: user.uid, ...userDoc.data() }; // Include the user ID
        }
        this.fetchUserPathways();
      } else {
        this.user = null;
      }
    });
  }

  fetchPathways() {
    const q = query(collection(db, "pathways"));
    onSnapshot(q, (querySnapshot) => {
      this.pathways = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  }

  async fetchUserPathways() {
    if (!this.user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );
      const querySnapshot = await getDocs(userPathwayRef);

      this.userPathways = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("User pathways fetched successfully");
    } catch (error) {
      console.error("Error fetching user pathways:", error);
    }
  }

  addPathway = async (pathway) => {
    if (!this.user) {
      console.error("Error: User not authenticated.");
      return;
    }

    try {
      const pathwayWithCreator = { ...pathway, creatorId: this.user.uid };
      const docRef = await addDoc(
        collection(db, "pathways"),
        pathwayWithCreator
      );
      console.log("Pathway created with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding pathway: ", error);
    }
  };

  async updatePathway(pathwayId, pathwayData) {
    console.log(
      "Attempting to update pathway with ID:",
      pathwayId,
      "Data:",
      pathwayData
    );
    try {
      const docRef = doc(db, "pathways", pathwayId);
      await updateDoc(docRef, pathwayData);
      console.log("Pathway updated successfully with ID:", pathwayId);
      // Optionally, fetch the document again to verify the update
      const updatedDoc = await getDoc(docRef);
      console.log("Updated document data:", updatedDoc.data());
    } catch (error) {
      console.error("Error updating pathway:", error);
    }
  }

  async updateUserPathway(userPathwayId, pathwayData) {
    if (!this.user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const userPathwayRef = doc(
        db,
        `users/${this.user.uid}/myPathways`,
        userPathwayId
      );
      await updateDoc(userPathwayRef, pathwayData);
      console.log(111, "User pathway updated with ID: ", userPathwayId);
    } catch (error) {
      console.error("Error updating user pathway: ", error);
    }
  }

  // Function to create a copy of the original pathway in the user's subcollection
  async createPathwayCopy(originalPathwayId) {
    console.log(
      "Attempting to create pathway copy with ID:",
      originalPathwayId
    );
    if (!this.user) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Retrieve the original pathway
      const originalPathwayRef = doc(db, "pathways", originalPathwayId);
      const originalPathwayDoc = await getDoc(originalPathwayRef);

      if (!originalPathwayDoc.exists()) {
        console.error("Original pathway not found");
        return;
      }

      const originalPathwayData = originalPathwayDoc.data();
      // const pathwayDataClone = { ...originalPathwayData };

      // delete pathwayDataClone.id;

      const { id, ...pathwayDataWithoutId } = originalPathwayData;

      console.log("Original pathway data:", pathwayDataWithoutId);

      // Create a copy in the user's subcollection
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );

      const docRef = await addDoc(userPathwayRef, {
        ...pathwayDataWithoutId,
        originalPathwayId: originalPathwayId,
        creatorId: this.user.uid,
        modifiedAt: new Date(),
      });

      console.log("Pathway copy created successfully");
      return docRef.id;
    } catch (error) {
      console.error("Error creating pathway copy:", error);
    }
  }

  async getOrCreateUserPathwayCopy(originalPathwayId) {
    if (!this.user) {
      console.error("User not authenticated");
      return null;
    }

    try {
      // Check if the user already has a copy of the pathway
      const userPathwayQuery = query(
        collection(db, `users/${this.user.uid}/myPathways`),
        where("originalPathwayId", "==", originalPathwayId)
      );

      const querySnapshot = await getDocs(userPathwayQuery);

      if (!querySnapshot.empty) {
        // User already has a copy, return its ID
        return querySnapshot.docs[0].id;
      } else {
        // User doesn't have a copy, create a new one
        return this.createPathwayCopy(originalPathwayId);
      }
    } catch (error) {
      console.error("Error in getOrCreateUserPathwayCopy:", error);
      return null;
    }
  }

  // Function to store pathway completion log
  async logPathwayCompletion(userPathwayId, completionDetails) {
    if (!this.user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const logRef = collection(db, `users/${this.user.uid}/activityLogs`);
      await addDoc(logRef, {
        pathwayId: userPathwayId,
        completedAt: new Date(),
        ...completionDetails, // Include other log details like responses
      });

      console.log("Pathway completion logged successfully");
    } catch (error) {
      console.error("Error logging pathway completion:", error);
    }
  }

  signInAnonymously = async () => {
    await signInAnonymously(auth);
  };
}

const MobxStore = new Store();
export default MobxStore;
