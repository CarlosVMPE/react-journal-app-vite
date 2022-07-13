// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBQegSuujnSiSHX-_oTAaXQVG9g5TbRuQ",
    authDomain: "react-cursos-8e3a7.firebaseapp.com",
    projectId: "react-cursos-8e3a7",
    storageBucket: "react-cursos-8e3a7.appspot.com",
    messagingSenderId: "460718625591",
    appId: "1:460718625591:web:01cf1635d8322b2c6100b2"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);