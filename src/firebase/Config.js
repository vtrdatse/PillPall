import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkhWAThqp9JiGgS1N36bOrNL1tzZAWB8c",
    authDomain: "pillpall-web67.firebaseapp.com",
    projectId: "pillpall-web67",
    storageBucket: "pillpall-web67.appspot.com",
    messagingSenderId: "566713348521",
    appId: "1:566713348521:web:da1f3d18390ec4263594b8",
    measurementId: "G-CDHYV7YKFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage and export it
export const storage = getStorage(app);
