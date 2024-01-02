import { makeAutoObservable, runInAction } from "mobx";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signInAnonymously, getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  query,
  onSnapshot,
  updateDoc,
  getDocs,
  where,
} from "firebase/firestore";

const MAX_LOGS_PER_DAY = 5; // change this to user controlled per pathway - pathway.maxLogsPerDay

class Store {
  loading = true;
  user = null;
  rewards = [];
  pathways = [];
  userPathways = [];
  pathwayPlaying = false;

  constructor() {
    makeAutoObservable(this);
    this.initializeAuth();
    this.fetchPathways();
    this.setPathwayPlaying = this.setPathwayPlaying.bind(this);
  }

  initializeAuth() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        runInAction(() => {
          if (!userDoc.exists()) {
            const newUser = {
              uid: user.uid,
              level: 1,
              xp: 0,
              createdAt: new Date(),
            };
            setDoc(userDocRef, newUser).then(() => {
              this.user = newUser;
            });
          } else {
            this.user = { uid: user.uid, ...userDoc.data() };
          }
          this.fetchUserPathways();
          this.fetchUserRewards();
        });
      } else {
        runInAction(() => {
          this.user = null;
        });
      }
      runInAction(() => {
        this.loading = false;
      });
    });
  }

  async fetchUserRewards() {
    if (!this.user) {
      console.log("User not authenticated");
      return;
    }
    try {
      const userRewardsRef = collection(db, `users/${this.user.uid}/rewards`);
      const querySnapshot = await getDocs(userRewardsRef);

      runInAction(() => {
        this.rewards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });

      console.log("User rewards fetched successfully");
    } catch (error) {
      console.log("Error fetching user rewards:", error);
    }
  }

  async addReward(reward) {
    try {
      const userRewardsRef = collection(db, `users/${this.user.uid}/rewards`);

      const docRef = await addDoc(userRewardsRef, reward);

      console.log("Reward added with ID: ", docRef.id);
      runInAction(() => {
        this.rewards.push({
          id: docRef.id,
          ...reward,
        });
      });
      return docRef.id; // Return the ID for further use
    } catch (error) {
      console.log("Error adding reward: ", error);
    }
  }

  // Update an existing reward in the user's subcollection
  async updateReward(reward) {
    try {
      const userRewardRef = doc(
        db,
        `users/${this.user.uid}/rewards`,
        reward.id
      );
      await setDoc(userRewardRef, reward);

      console.log("Reward updated successfully with ID:", reward.id);
      runInAction(() => {
        const index = this.rewards.findIndex((r) => r.id === reward.id);
        if (index !== -1) {
          this.rewards[index] = { id: reward.id, ...reward };
        }
      });
    } catch (error) {
      console.log("Error updating reward:", error);
    }
  }

  async deleteReward(reward) {
    try {
      const userRewardRef = doc(
        db,
        `users/${this.user.uid}/rewards`,
        reward.id
      );
      await deleteDoc(userRewardRef);

      console.log("Reward deleted successfully with ID:", reward.id);

      // Update Mobx variable
      runInAction(() => {
        this.rewards = this.rewards.filter((r) => r.id !== reward.id);
      });
    } catch (error) {
      console.log("Error deleting reward:", error);
    }
  }

  setPathwayPlaying(pathway) {
    runInAction(() => {
      if (pathway) {
        this.pathwayPlaying = pathway;
      } else {
        this.pathwayPlaying = false;
      }
    });
  }

  fetchPathways() {
    const q = query(collection(db, "pathways"));
    onSnapshot(q, (querySnapshot) => {
      runInAction(() => {
        this.pathways = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    });
  }

  async fetchUserPathways() {
    if (!this.user) {
      console.log("User not authenticated");
      return;
    }

    try {
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );
      const querySnapshot = await getDocs(userPathwayRef);

      runInAction(() => {
        this.userPathways = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          creatorId: this.user.uid,
          ...doc.data(),
        }));
      });
    } catch (error) {
      console.log("Error fetching user pathways:", error);
    }
  }

  addUserPathway = async (pathway) => {
    if (!this.user) {
      console.log("Error: User not authenticated.");
      return;
    }

    try {
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );
      const docRef = await addDoc(userPathwayRef, pathway);
      console.log("User pathway created with ID: ", docRef.id);
      return docRef.id; // Return the ID for further use
    } catch (error) {
      console.log("Error adding user pathway: ", error);
    }
  };

  publishPathway = async (pathwayId) => {
    if (!this.user) {
      console.log("Error: User not authenticated.");
      return;
    }

    try {
      const userPathwayRef = doc(
        db,
        `users/${this.user.uid}/myPathways`,
        pathwayId
      );
      const userPathwayDoc = await getDoc(userPathwayRef);

      if (!userPathwayDoc.exists()) {
        console.log("Error: Pathway not found.");
        return;
      }

      const publicPathway = {
        ...userPathwayDoc.data(),
        creatorId: this.user.uid,
        published: true,
      };
      const docRef = await addDoc(collection(db, "pathways"), publicPathway);
      console.log("Pathway published with ID: ", docRef.id);
    } catch (error) {
      console.log("Error publishing pathway: ", error);
    }
  };

  // addPathway = async (pathway) => {
  //   if (!this.user) {
  //     console.log("Error: User not authenticated.");
  //     return;
  //   }

  //   try {
  //     const pathwayWithCreator = { ...pathway, creatorId: this.user.uid };
  //     const docRef = await addDoc(
  //       collection(db, "pathways"),
  //       pathwayWithCreator
  //     );
  //     console.log("Pathway created with ID: ", docRef.id);
  //   } catch (error) {
  //     console.log("Error adding pathway: ", error);
  //   }
  // };

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
      console.log("Error updating pathway:", error);
    }
  }

  async updateUserPathway(userPathwayId, pathwayData) {
    if (!this.user) {
      console.log("User not authenticated");
      return;
    }

    try {
      const userPathwayRef = doc(
        db,
        `users/${this.user.uid}/myPathways`,
        userPathwayId
      );
      await updateDoc(userPathwayRef, pathwayData);
    } catch (error) {
      console.log("Error updating user pathway: ", error);
    }
  }

  // Function to create a copy of the original pathway in the user's subcollection
  async createPathwayCopy(originalPathwayId) {
    console.log(
      "Attempting to create pathway copy with ID:",
      originalPathwayId
    );
    if (!this.user) {
      console.log("User not authenticated");
      return;
    }

    try {
      // Retrieve the original pathway
      const originalPathwayRef = doc(db, "pathways", originalPathwayId);
      const originalPathwayDoc = await getDoc(originalPathwayRef);

      if (!originalPathwayDoc.exists()) {
        console.log("Original pathway not found");
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
        isCopy: true,
        modifiedAt: new Date(),
      });

      console.log("Pathway copy created successfully");
      return docRef.id;
    } catch (error) {
      console.log("Error creating pathway copy:", error);
    }
  }

  async getOrCreateUserPathwayCopy(originalPathwayId) {
    if (!this.user) {
      console.log("User not authenticated");
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
      console.log("Error in getOrCreateUserPathwayCopy:", error);
      return null;
    }
  }

  async addLog(pathwayId, logData) {
    if (!this.user) {
      console.log("User not authenticated");
      return;
    }

    const canSave = await this.canSaveLog(pathwayId);
    if (!canSave) {
      console.log("Log limit reached for the day");
      return;
    }

    try {
      const logRef = collection(db, `users/${this.user.uid}/activityLogs`);
      await addDoc(logRef, {
        pathwayId,
        ...logData,
        timestamp: new Date(),
      });

      console.log("Session log saved successfully");
    } catch (error) {
      console.log("Error saving session log:", error);
    }
  }

  async canSaveLog(pathwayId) {
    if (!this.user) {
      console.log("User not authenticated");
      return false;
    }

    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const logQuery = query(
        collection(db, `users/${this.user.uid}/activityLogs`),
        where("pathwayId", "==", pathwayId),
        where("timestamp", ">=", startOfDay),
        where("timestamp", "<=", endOfDay)
      );

      console.log({ logQuery });

      const querySnapshot = await getDocs(logQuery);
      console.log({ querySnapshot });
      return querySnapshot.size < MAX_LOGS_PER_DAY;
    } catch (error) {
      console.log("Error checking log availability:", error);
      return false;
    }
  }

  signInAnonymously = async () => {
    await signInAnonymously(auth);
    console.log("Signed in anonymously");
  };
}

const MobxStore = new Store();
export default MobxStore;
