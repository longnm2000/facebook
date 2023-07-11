// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5Cqsb6YDIbYt5jOLB3d6qjlRz3PnsI20",
  authDomain: "longnm-d91c0.firebaseapp.com",
  projectId: "longnm-d91c0",
  storageBucket: "longnm-d91c0.appspot.com",
  messagingSenderId: "663974945065",
  appId: "1:663974945065:web:34afed4f98b5d9adc11738",
  measurementId: "G-F3QV54LX19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
