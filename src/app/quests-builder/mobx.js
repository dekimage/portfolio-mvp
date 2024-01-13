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
  orderBy,
  limit,
} from "firebase/firestore";

const MAX_LOGS_PER_DAY = 5; // change this to user controlled per pathway - pathway.maxLogsPerDay

class Store {
  loading = true;
  logs = [];
  user = null;
  rewards = [];
  pathways = [];
  recentPathways = [];
  topPlayedPathways = [];
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
          this.fetchLogs();
          this.fetchTopPlayedPathways();
          this.fetchRecentPathways();
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

  async fetchLogs() {
    try {
      const logRef = collection(db, `users/${this.user.uid}/activityLogs`);
      const querySnapshot = await getDocs(logRef);

      runInAction(() => {
        this.logs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });

      console.log("Logs fetched successfully");
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  }

  // Fetch Top 5 Most Played Pathways
  async fetchTopPlayedPathways() {
    try {
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );
      const topPlayedQuery = query(
        userPathwayRef,
        orderBy("playCount", "desc"),
        limit(5)
      );
      const querySnapshot = await getDocs(topPlayedQuery);

      runInAction(() => {
        // Store top played pathways in MobX store
        this.topPlayedPathways = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    } catch (error) {
      console.error("Error fetching top played pathways:", error);
    }
  }

  // Fetch Top 5 Most Recent Pathways
  async fetchRecentPathways() {
    console.log(this.user.uid);
    try {
      console.log(this.user.uid);
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );

      const recentQuery = query(
        userPathwayRef,
        orderBy("modifiedAt", "desc"),
        limit(5)
      );

      const querySnapshot = await getDocs(recentQuery);

      runInAction(() => {
        // Store recent pathways in MobX store
        this.recentPathways = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    } catch (error) {
      console.error("Error fetching recent pathways:", error);
    }
  }

  async fetchUserRewards() {
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

  async addLog(pathway, logData) {
    const canSave = await this.canSaveLog(pathway.id);
    if (!canSave) {
      console.error("Log limit reached for the day");
      return;
    }

    // UPDATE PLAY COUNT on the myPathways's subcollection (for top 5 most played)
    const userPathwayRef = doc(
      db,
      `users/${this.user.uid}/myPathways`,
      pathway.id
    );
    const userPathwayDoc = await getDoc(userPathwayRef);
    if (userPathwayDoc.exists()) {
      const currentPlayCount = userPathwayDoc.data().playCount || 0;

      // Increment play count manually
      await updateDoc(userPathwayRef, {
        playCount: currentPlayCount + 1,
      });
    } else {
      console.error("Pathway not found");
      return;
    }

    try {
      const logRef = collection(db, `users/${this.user.uid}/activityLogs`);
      const docRef = await addDoc(logRef, {
        pathwayId: pathway.id,
        ...logData,
        timestamp: new Date(),
      });

      runInAction(() => {
        // Add the new log to the MobX store
        const newLog = {
          id: docRef.id,
          pathwayId: pathway.id,
          ...logData,
          timestamp: new Date(),
        };
        // Assuming you have a logs array in your store
        this.logs.push(newLog);
      });

      console.log("Session log saved successfully");
    } catch (error) {
      console.error("Error saving session log:", error);
    }

    // update streak 9MAKE IT AS SEPERATE STREAK FUNCTION
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastPlayed = new Date(this.user.lastPlayed);
    lastPlayed.setHours(0, 0, 0, 0);

    if (today - lastPlayed === ONE_DAY) {
      this.user.streak++;
    } else if (today - lastPlayed > ONE_DAY) {
      this.user.streak = 1;
    }

    this.user.lastPlayed = today;

    // Update the user's streak in Firestore
    const userRef = doc(db, "users", this.user.uid);
    await updateDoc(userRef, {
      streak: this.user.streak,
      lastPlayed: today,
    });
  }

  async canSaveLog(pathwayId) {
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

      const querySnapshot = await getDocs(logQuery);
      console.log({ querySnapshot });
      return querySnapshot.size < MAX_LOGS_PER_DAY;
    } catch (error) {
      console.log("Error checking log availability:", error);
      return false;
    }
  }

  async buyReward(reward) {
    if (reward.cost > this.user.gold) {
      return { error: "Not enough gold" };
    }

    const newGoldAmount = this.user.gold - reward.cost;

    // Update user's gold in Firebase
    const userDocRef = doc(db, "users", this.user.uid);
    await updateDoc(userDocRef, { gold: newGoldAmount });

    // Add log entry for the reward purchase
    const rewardPurchaseLog = {
      reward: reward,
      balanceBefore: this.user.gold,
      balanceAfter: newGoldAmount,
      timestamp: new Date(),
    };

    const logRef = collection(db, `users/${this.user.uid}/activityLogs`);
    const logDocRef = await addDoc(logRef, rewardPurchaseLog);

    runInAction(() => {
      this.user.gold = newGoldAmount;
      this.logs.push({ id: logDocRef.id, ...rewardPurchaseLog });
    });

    console.log("Reward purchased successfully");
  }

  signInAnonymously = async () => {
    await signInAnonymously(auth);
    console.log("Signed in anonymously");
  };
}

const MobxStore = new Store();
export default MobxStore;
