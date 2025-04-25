// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6Du4ht30GyDNZatSJj76iOVX5yEanpn0",
  authDomain: "reclutamiento-12537.firebaseapp.com",
  projectId: "reclutamiento-12537",
  storageBucket: "reclutamiento-12537.firebasestorage.app",
  messagingSenderId: "631445831916",
  appId: "1:631445831916:web:61934b286a7ee7321fa5c9",
  measurementId: "G-DBP89N0JJ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
