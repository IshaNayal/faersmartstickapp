import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "",
  authDomain: "faersmartstickapp-35ad8.firebaseapp.com",
  projectId: "faersmartstickapp-35ad8",
  storageBucket: "faersmartstickapp-35ad8.firebasestorage.app",
  messagingSenderId: "132163559183",
  appId: "1:132163559183:web:2cc4c64294359c5b36a87a",
  measurementId: "G-YXWHY0PZKS"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // declare only once

export { auth, db };
