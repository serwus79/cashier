import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleAuthProvider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  console.log("generateUserDocument");

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    try {
      const userData = {
        displayName: user.displayName || "Anonymous",
        email: user.email || "",
        photoURL: user.photoURL || "",
        ...additionalData,
      };
      console.log("generateUserDocument userRef set", JSON.stringify(userData));
      await userRef.set(userData);
      return { uid: user.uid, ...userData };
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    console.log("getUserDocument");
    const userDocument = await firestore.doc(`users/${uid}`).get();
    console.log("got UserDocument", userDocument);
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
