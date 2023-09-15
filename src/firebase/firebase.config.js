// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6OZOheyQX2Y8PotENX4-kFsgYLKzSB1o",
  authDomain: "shopping-freak-authentication.firebaseapp.com",
  projectId: "shopping-freak-authentication",
  storageBucket: "shopping-freak-authentication.appspot.com",
  messagingSenderId: "714707547493",
  appId: "1:714707547493:web:caf6b60b07a918f1c85d8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
