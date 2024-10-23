// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdSccPmPL4i7OP9m8it8yP7t-fQwH11V8",
    authDomain: "glamping-estonia.firebaseapp.com",
    databaseURL: "https://glamping-estonia-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "glamping-estonia",
    storageBucket: "glamping-estonia.appspot.com",
    messagingSenderId: "749739590764",
    appId: "1:749739590764:web:4e567569c5db92aa8f0449",
    measurementId: "G-D4F7LM25GV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

