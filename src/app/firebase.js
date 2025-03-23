// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiNhJvdHm9_QUVZHG_KCY3cq9m-FCMNvs",
  authDomain: "physio-healers-at-home.firebaseapp.com",
  projectId: "physio-healers-at-home",
  storageBucket: "physio-healers-at-home.firebasestorage.app",
  messagingSenderId: "346463292501",
  appId: "1:346463292501:web:540e7d769ee11613a8d8dc",
  measurementId: "G-RN9359MQS4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
