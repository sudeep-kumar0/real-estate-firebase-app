// src/firebase.config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWkeI-R8QveLFI3dxZvkfVgKPIrdcNqSg",
  authDomain: "real-92ba5.firebaseapp.com",
  databaseURL:
    "https://real-92ba5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "real-92ba5",
  storageBucket: "real-92ba5.firebasestorage.app",
  messagingSenderId: "735002193972",
  appId: "1:735002193972:web:ffa9e064c13caa69ba1a61",
  measurementId: "G-2WXB52JDLR",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore();
