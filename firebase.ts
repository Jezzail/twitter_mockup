// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhLn6J8tgZw94k0xPjc-WHRzAXY-7UxR4",
  authDomain: "twitter-mockup-357609.firebaseapp.com",
  projectId: "twitter-mockup-357609",
  storageBucket: "twitter-mockup-357609.appspot.com",
  messagingSenderId: "556746757627",
  appId: "1:556746757627:web:15d1d01be2d8b93922275e"
};
// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
