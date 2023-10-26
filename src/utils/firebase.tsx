"use client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQ82_Th2Z2gbn9uMDf6aho_eDE5cfMS0w",
  authDomain: "legalprod-a6f03.firebaseapp.com",
  projectId: "legalprod-a6f03",
  storageBucket: "legalprod-a6f03.appspot.com",
  messagingSenderId: "277259536696",
  appId: "1:277259536696:web:d2a0506105b145775819cd",
  measurementId: "G-L413DPWK05",
};

const app = initializeApp(firebaseConfig);

export const startAnalytics = () => {
  if (typeof window !== "undefined") {
    const analytics = getAnalytics(app);
    console.log("Firebase Initialized");
    return analytics;
  } else {
    return null;
  }
};

export default app;
