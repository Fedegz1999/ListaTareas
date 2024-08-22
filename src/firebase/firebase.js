import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "lista-de-tareas-19c77.firebaseapp.com",
  projectId: "lista-de-tareas-19c77",
  storageBucket: "lista-de-tareas-19c77.appspot.com",
  messagingSenderId: "275868891402",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-MWWC9GXFG8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
