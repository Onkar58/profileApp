// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADinfa-_n2d3wbMiLfJU-3aybVAy1L3-A",
  authDomain: "page-for-trial-1.firebaseapp.com",
  projectId: "page-for-trial-1",
  storageBucket: "page-for-trial-1.appspot.com",
  messagingSenderId: "118811660574",
  appId: "1:118811660574:web:af291d28dfde55ecb5b90f",
  measurementId: "G-2DLQ6K47MN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export {db, auth, storage};