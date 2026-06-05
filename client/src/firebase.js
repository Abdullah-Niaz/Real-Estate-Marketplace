// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "real-estate-mern-31937.firebaseapp.com",
    projectId: "real-estate-mern-31937",
    storageBucket: "real-estate-mern-31937.firebasestorage.app",
    messagingSenderId: "99713942370",
    appId: "1:99713942370:web:735bf166d51173c23ea23b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
