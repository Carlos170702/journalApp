import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyCEZTCQRPC6CAiPgMKiM8lXwUf-DeksTg4",
  authDomain: "journalapp-76d4f.firebaseapp.com",
  projectId: "journalapp-76d4f",
  storageBucket: "journalapp-76d4f.appspot.com",
  messagingSenderId: "979719512672",
  appId: "1:979719512672:web:5bd81c1830ab29b4515905",
  // measurementId: "G-KFDDPQMJ3L"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const fireAnalytics = getAnalytics(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
