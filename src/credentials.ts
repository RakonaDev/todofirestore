import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import {  Auth, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyC8cH4HdIaCl_mXvPrwuvQxTkkVJlZ5M8w",
  authDomain: "store-fc667.firebaseapp.com",
  projectId: "store-fc667",
  storageBucket: "store-fc667.firebasestorage.app",
  messagingSenderId: "787352696778",
  appId: "1:787352696778:web:87f55b9a5919e11c538133"
};

// Initialize Firebase
export const appFireBase: FirebaseApp = initializeApp(firebaseConfig);
export const dbTareas: Firestore = getFirestore(appFireBase);
export const authFireBase: Auth = getAuth(appFireBase);
