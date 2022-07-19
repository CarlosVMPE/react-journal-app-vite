// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironmets } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Dev / Prod
/* const firebaseConfig = {
    apiKey: "AIzaSyBBQegSuujnSiSHX-_oTAaXQVG9g5TbRuQ",
    authDomain: "react-cursos-8e3a7.firebaseapp.com",
    projectId: "react-cursos-8e3a7",
    storageBucket: "react-cursos-8e3a7.appspot.com",
    messagingSenderId: "460718625591",
    appId: "1:460718625591:web:01cf1635d8322b2c6100b2"
}; */

//console.log(import.meta.env)
//console.log(process.env)

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironmets();

// Testing
/* const firebaseConfig = {
  apiKey: "AIzaSyDptedF2_0Pd0ytbwhcE1OUOj418yZ0T8w",
  authDomain: "firestore-grafica-a192a.firebaseapp.com",
  databaseURL: "https://firestore-grafica-a192a.firebaseio.com",
  projectId: "firestore-grafica-a192a",
  storageBucket: "firestore-grafica-a192a.appspot.com",
  messagingSenderId: "940889345017",
  appId: "1:940889345017:web:53d9793cf57bee19100b28"
}; */

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  databaseURL: VITE_DATABASEURL,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);