import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMFPg3fOQUkvJJ9w2xoUgR4iuGvXP1eTQ",
  authDomain: "vitality-app-eb561.firebaseapp.com",
  projectId: "vitality-app-eb561",
  storageBucket: "vitality-app-eb561.appspot.com",
  messagingSenderId: "654648768641",
  appId: "1:654648768641:web:4db27d3992761b72813580",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
