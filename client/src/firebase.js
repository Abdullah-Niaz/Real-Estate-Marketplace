// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "real-estate-41ae1.firebaseapp.com",
    projectId: "real-estate-41ae1",
    storageBucket: "real-estate-41ae1.firebasestorage.app",
    messagingSenderId: "17464747185",
    appId: "1:17464747185:web:05f102763fb088dd64ee90",
    measurementId: "G-5RKDTG4100"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
