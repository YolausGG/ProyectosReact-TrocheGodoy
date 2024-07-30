import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOj-A4He02iLjHc4KLpBG0ebkxLqSoMwo",
  authDomain: "ecommerce-images-4cfcf.firebaseapp.com",
  projectId: "ecommerce-images-4cfcf",
  storageBucket: "ecommerce-images-4cfcf.appspot.com",
  messagingSenderId: "19992936333",
  appId: "1:19992936333:web:be60907d93a7827da847c4"
};
 
// Initialize Firebase
export const appFireBase = initializeApp(firebaseConfig);
