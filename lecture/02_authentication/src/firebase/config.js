// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC94bllAhBW0UopvpE6Bvd0sR_vDpS8NxI",
  authDomain: "my-firebase-project-42410.firebaseapp.com",
  projectId: "my-firebase-project-42410",
  storageBucket: "my-firebase-project-42410.firebasestorage.app",
  messagingSenderId: "137607540327",
  appId: "1:137607540327:web:d6a1e65081f92639fc2ec2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app)