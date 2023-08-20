import { categoryRef, db } from "./FirebaseAppConfig";
import {
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export const MarkQuizComplete = async (userName) => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const todayDate = `${year}-${month}-${day}`;

  try {
    const quizRef = doc(db, "Analytics", todayDate);
    const docSnapshot = await getDoc(quizRef);

    if (docSnapshot.exists()) {
      await updateDoc(quizRef, {
        completeQuiz: docSnapshot.data().completeQuiz + 1,
        activeUser: arrayUnion(userName),
      });

      console.log("Updated");

      return docSnapshot.data();
    } else {
      const initialData = {
        activeUser: [userName],
        completeQuiz: 1,
      };

      await setDoc(quizRef, initialData);
      return initialData;
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};