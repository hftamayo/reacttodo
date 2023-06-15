// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOpQ1YducKYq-yVnMeU5zOvb9T79sJ62Q",
  authDomain: "todo-8ed5c.firebaseapp.com",
  projectId: "todo-8ed5c",
  storageBucket: "todo-8ed5c.appspot.com",
  messagingSenderId: "809302930976",
  appId: "1:809302930976:web:c4fb7d9b8173ccb0b76e45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)