import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBD7PQD5xkpCI47mIeEG4KDkqZAoJBWaYk",
    authDomain: "svelte-crud-c814d.firebaseapp.com",
    projectId: "svelte-crud-c814d",
    storageBucket: "svelte-crud-c814d.appspot.com",
    messagingSenderId: "913144735223",
    appId: "1:913144735223:web:1e1d5234da546018f1baf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)