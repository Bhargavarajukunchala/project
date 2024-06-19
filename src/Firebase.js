import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCa2HPBGduYSWEc_Jy-8o5q0RmGAOXJ41w",
  authDomain: "chat-b8328.firebaseapp.com",
  projectId: "chat-b8328",
  storageBucket: "chat-b8328.appspot.com",
  messagingSenderId: "94939484765",
  appId: "1:94939484765:web:2dbe0abd8e47bb959073b4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();