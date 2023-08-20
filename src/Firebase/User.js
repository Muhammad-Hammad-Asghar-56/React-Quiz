import { db } from "./FirebaseAppConfig";
import {
  setDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export const updateUserPoints = async (userName) => {
  
  try {
    const userRef = doc(db, "User", userName);
    const docSnapshot = await getDoc(userRef);

    if (docSnapshot.exists()) {
      await updateDoc(userRef, {
        points: docSnapshot.data().points + 100
      });

      console.log("User Points has been Updated");

      return docSnapshot.data();
    } else {
      const initialData = {
        points: 100
      };

      await setDoc(userRef, initialData);
      return initialData;
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};