// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6lec89mlv6pWavKZP3FZE8sqTLSF6DOQ",
  authDomain: "haaa-ba709.firebaseapp.com",
  databaseURL:
    "https://haaa-ba709-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "haaa-ba709",
  storageBucket: "haaa-ba709.firebasestorage.app",
  messagingSenderId: "752173051769",
  appId: "1:752173051769:web:839baacfb40a049d8b89a8",
  measurementId: "G-DN41MGK47C",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
