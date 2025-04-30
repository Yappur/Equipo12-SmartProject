import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6Du4ht30GyDNZatSJj76iOVX5yEanpn0",
  authDomain: "reclutamiento-12537.firebaseapp.com",
  projectId: "reclutamiento-12537",
  storageBucket: "reclutamiento-12537.firebasestorage.app",
  messagingSenderId: "631445831916",
  appId: "1:631445831916:web:61934b286a7ee7321fa5c9",
  measurementId: "G-DBP89N0JJ8",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
