import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBHmuFd8qrWp66q4Jj424ibcTpp1lopcw",
  authDomain: "car-showroom-3ec4f.firebaseapp.com",
  projectId: "car-showroom-3ec4f",
  storageBucket: "car-showroom-3ec4f.firebasestorage.app",
  messagingSenderId: "362606458950",
  appId: "1:362606458950:web:f94458dc8bee0b190ab247",
  measurementId: "G-8G3P4F7YWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);