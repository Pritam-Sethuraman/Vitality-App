import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    //auth
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("Got user: ", user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
    }
  };

  // Sign In Logic
  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (msg.includes("(auth/invalid-credential)"))
        msg = "Invalid  credentials";
      return { success: false, msg };
    }
  };

  // Sign Out Logic
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };

  // Sign Up Logic
  const register = async (email, password, username, profileUrl) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User: ", res?.user);

      // Not using addDoc because it sets the user id automatically.
      // setDoc allows us to use manual doc id
      await setDoc(doc(db, "users", res?.user?.uid), {
        username,
        profileUrl,
        userId: res?.user?.uid,
      });

      return { success: true, data: res?.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "This email is already in use";
      if (msg.includes("(auth/weak-password)"))
        msg = "Password should be at least 6 characters";
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContext");
  }

  return value;
};
