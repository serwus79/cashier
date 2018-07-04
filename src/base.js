import Rebase from "re-base";
import firebase from "firebase";
import config from "./config";

const firebaseApp = firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
