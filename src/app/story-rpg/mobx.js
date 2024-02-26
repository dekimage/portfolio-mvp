import { makeAutoObservable, runInAction } from "mobx";

import { auth, db } from "./firebase";
import {
  onAuthStateChanged,
  signInAnonymously,
  getAuth,
  EmailAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
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

import { rooms, items, stats } from "./data";

const DEFAULT_USER = {
  isCreator: true,
};

class Store {
  user = null;
  pages = rooms;
  items = items;
  stats = stats;

  loading = false;

  projects = [];

  inventory = [];
  usedOptions = [];

  activePage = this.pages[0];

  //reusable from pathways
  isMobileOpen = false;
  // setIsMobileOpen

  constructor() {
    makeAutoObservable(this);
    this.initializeAuth();
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.setActivePage = this.setActivePage.bind(this);
    this.updateStat = this.updateStat.bind(this);
    this.addItemToInventory = this.addItemToInventory.bind(this);
    this.isOptionUnlocked = this.isOptionUnlocked.bind(this);
    this.findItem = this.findItem.bind(this);
    this.findStat = this.findStat.bind(this);
    this.hasItem = this.hasItem.bind(this);
    this.meetsStatCondition = this.meetsStatCondition.bind(this);
    this.useOption = this.useOption.bind(this);
    this.getOptionUsage = this.getOptionUsage.bind(this);
    this.initializeAuth = this.initializeAuth.bind(this);
    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.signupWithEmail = this.signupWithEmail.bind(this);
    this.logout = this.logout.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.sendPasswordReset = this.sendPasswordReset.bind(this);
    this.getProjects = this.getProjects.bind(this);
  }

  initializeAuth() {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        runInAction(() => {
          this.user = { uid: user.uid, ...userDoc.data() };

          this.getProjects();
        });
      } else {
        runInAction(() => {
          this.user = null;
        });
      }
    });
  }

  getProjects() {
    if (!this.userId) return;

    collection("projects")
      .where("creatorId", "==", this.userId)
      .get()
      .then((querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...doc.data() });
        });
        this.projects = projects;
        console.log("Projects fetched: ", projects);
      })
      .catch((error) => {
        console.error("Error fetching projects: ", error);
      });
  }

  useOption(optionIndex) {
    const pageUsage = this.usedOptions.find(
      (usage) => usage.page === this.activePage.page
    );
    if (pageUsage) {
      // If the page already has used options tracked, push the new optionIndex
      pageUsage.optionIndexes.push(optionIndex);
    } else {
      // If it's the first time an option on this page is used, add a new entry
      this.usedOptions.push({
        page: this.activePage.page,
        optionIndexes: [optionIndex],
      });
    }
  }

  getOptionUsage(optionIndex) {
    const pageUsage = this.usedOptions.find(
      (usage) => usage.page === this.activePage.page
    );
    if (!pageUsage) return 0; // If no usage found for the page, return 0
    return pageUsage.optionIndexes.filter((index) => index === optionIndex)
      .length;
  }

  findStat = (statId) => {
    return this.stats.find((stat) => stat.id === statId);
  };

  findItem = (itemId) => {
    return this.items.find((item) => item.id === itemId);
  };

  setActivePage = (page) => {
    const newPage = this.pages.find((p) => p.page === page);
    if (newPage) {
      runInAction(() => {
        this.activePage = newPage;
      });
    } else {
      console.log("Page not found");
    }
  };

  updateStat = (gain_stat) => {
    const statId = Object.keys(gain_stat)[0];
    const statIndex = this.stats.findIndex(
      (stat) => stat.id === parseInt(statId)
    );
    if (statIndex !== -1) {
      runInAction(() => {
        this.stats[statIndex].value += gain_stat[statId];
      });
    }
  };

  addItemToInventory = (gain_item) => {
    const itemToAdd = this.items.find((item) => item.id === gain_item);
    if (itemToAdd) {
      runInAction(() => {
        this.inventory.push(itemToAdd);
      });
    }
  };

  handleOptionClick = (option, optionIndex) => {
    const usageCount = this.getOptionUsage(optionIndex);
    if (option.uses && usageCount >= option.uses) {
      console.log("This option has been used the maximum number of times.");
      return;
    }

    if (option.uses) {
      this.useOption(optionIndex);
    }

    if (option.page) {
      this.setActivePage(option.page);
    }

    if (option.gain_stat) {
      this.updateStat(option.gain_stat);
    }

    if (option.gain_item) {
      this.addItemToInventory(option.gain_item);
    }
  };

  hasItem(itemId) {
    return this.inventory.some((item) => item.id === itemId);
  }

  meetsStatCondition(statCondition) {
    const [statId, operator, value] = statCondition;
    const stat = this.stats.find((stat) => stat.id === statId);

    if (!stat) return false; // Stat not found

    switch (operator) {
      case "<":
        return stat.value < value;
      case ">":
        return stat.value > value;
      case "=":
        return stat.value === value;
      default:
        console.error("Invalid operator", operator);
        return false; // Invalid operator
    }
  }

  isOptionUnlocked = (conditions) => {
    return conditions.every((condition) => {
      if (condition.item) {
        return this.hasItem(condition.item);
      }

      if (condition.stat) {
        return this.meetsStatCondition(condition.stat);
      }

      // Assuming every condition has either an item or stat check,
      // but adding a default true in case a new type of condition without checks is added.
      return true;
    });
  };

  async loginWithEmail({ email, password }) {
    console.log({ email, password });
    try {
      this.loading = true;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      runInAction(() => {
        console.log(userCredential.user);
        this.user = userCredential.user;
        this.loading = false;
      });
    } catch (error) {
      console.error("Error logging in:", error);
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  }

  async signupWithEmail(email, password, username) {
    try {
      this.loading = true;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Additional user properties
      const newUserProfile = {
        ...DEFAULT_USER,
        createdAt: new Date(),
        username: username,
        email: email,
        uid: userCredential.user.uid,
      };

      // Create a user profile in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), newUserProfile);

      runInAction(() => {
        this.user = newUserProfile;
        this.loading = false;
      });
    } catch (error) {
      console.error("Error signing up:", error);
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(auth); // Sign out from Firebase Authentication
      runInAction(() => {
        this.user = null; // Reset the user in the store
      });
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle any errors that occur during logout
    }
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        const newUserProfile = {
          ...DEFAULT_USER,
          createdAt: new Date(),
          username: user.displayName || "New User",
          email: user.email,
          uid: user.uid,
        };

        await setDoc(userDocRef, newUserProfile);

        runInAction(() => {
          this.user = newUserProfile;
        });
      } else {
        runInAction(() => {
          this.user = { uid: user.uid, ...userDoc.data() };
        });
      }
    } catch (error) {
      console.error("Error with Google sign-in:", error);
    }
  }

  async sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      // Handle success, such as showing a message to the user
    } catch (error) {
      console.error("Error sending password reset email:", error);
      // Handle errors, such as invalid email, etc.
    }
  }
}

const MobxStore = new Store();
export default MobxStore;
