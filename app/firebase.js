// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMYG_zb9y11q0UrkBLFTrYPUZWipNlD2o",
    authDomain: "finddy-4eada.firebaseapp.com",
    projectId: "finddy-4eada",
    storageBucket: "finddy-4eada.appspot.com",
    messagingSenderId: "886741090394",
    appId: "1:886741090394:web:9689aae7e0e91dc76dd863",
    measurementId: "G-LXHPTCM55B",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore();
