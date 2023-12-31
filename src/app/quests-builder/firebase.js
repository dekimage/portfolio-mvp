// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAgonph85DZX-6qS9vX_WAEwIWu58jLT_0",
  authDomain: "pathways-49ff2.firebaseapp.com",
  projectId: "pathways-49ff2",
  storageBucket: "pathways-49ff2.appspot.com",
  messagingSenderId: "877877999214",
  appId: "1:877877999214:web:ea6bb2dad3f0c5158bd87f",
  measurementId: "G-LSTLWXC33L",
};

// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };
