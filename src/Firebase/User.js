import { db } from "./FirebaseAppConfig";
import { collection, addDoc,updateDoc, getDocs } from "firebase/firestore";

export const addUser = async (name, email) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const getUser = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const usersData = [];
    usersSnapshot.forEach((doc) => {
      if (doc) {
        usersData.push(doc.data());
      }
    });
    return usersData;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
