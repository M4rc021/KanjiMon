import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json" with { type: "json" };

try {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  console.log("Success! db id:", db.type);
} catch (e) {
  console.error("Error:", e.message);
}
