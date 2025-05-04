import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKDPbT1r5snl1cQ12EOf8VToHxRAsXGZI",
  authDomain: "furiawebchat.firebaseapp.com",
  projectId: "furiawebchat",
  storageBucket: "furiawebchat.firebasestorage.app",
  messagingSenderId: "938765554238",
  appId: "1:938765554238:web:fd769c41dfb7992314376f",
};

let firebaseApp: FirebaseApp;

try {
  firebaseApp = getApp();
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig);
}

export const db: Firestore = getFirestore(firebaseApp);