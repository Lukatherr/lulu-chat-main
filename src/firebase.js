// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHtcrjoyqWnRI116G-ysYqAKbpE6MR3y4",
  authDomain: "lulu-chat-b699d.firebaseapp.com",
  projectId: "lulu-chat-b699d",
  storageBucket: "lulu-chat-b699d.appspot.com",
  messagingSenderId: "963318491455",
  appId: "1:963318491455:web:b7ea6e240806e1fb9c4b8a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);

