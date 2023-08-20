import {  db } from "./FirebaseAppConfig";
import { collection, getDocs, setDoc, getDoc, doc, query, where } from "firebase/firestore";
import { MarkQuizComplete } from "./Analaytics";
import { updateUserPoints } from "./User";
//                              Rounds
export const storeQuizDoc = async (category, round) => {
  const QuizesRef = doc(db, "Quizes", category);
  try {
    await setDoc(QuizesRef, round);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

//                        Quiz
export const getQuizData = async (category, round, quiz) => {
  const quizRef = doc(db, "Quizes", category);

  try {
    const docSnapshot = await getDoc(quizRef);
    if (docSnapshot.exists()) {
      const roundData = docSnapshot.data();

      const modifiedData = { ...roundData[`Round${round}`][`quiz${quiz}`] }; // Create a shallow copy of the data object
      delete modifiedData.Answer; // Remove the "Answer" property from the copy

      const quizDetails = {
        "Total Question": Object.keys(roundData[`Round${round}`]).length,
        "Current Question": quiz,
      };
      return { quizDetails: quizDetails, quizData: modifiedData };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};

export const checkQuizAnswer = async (userName,category, round, quiz, Answer) => {
  const quizRef = doc(db, "Quizes", category);

  try {
    const docSnapshot = await getDoc(quizRef);
    if (docSnapshot.exists()) {
      const roundData = docSnapshot.data();
      const quizData = roundData[`Round${round}`][`quiz${quiz}`];
      const response = {
        result: Answer === quizData["Answer"],
        indexNum: quizData["Option"].indexOf(quizData["Answer"]),
        correct: quizData["Answer"],
      };
      // if quiz are apply to check then need to update the analytics
      MarkQuizComplete(userName).then((data) => {
        console.log(`Analytics has been updated and ${userName} had been insert into the analytics`)
      });
      if(response.result){
        updateUserPoints(userName)
      }
      return response;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};

//                  Category
export const getAllCategories = async () => {
  const quizRef = collection(db, "Quizes");

  try {
    const querySnapshot = await getDocs(quizRef);

    const categories = [];
    querySnapshot.forEach((doc) => {
      const category = doc.id; // Assuming your category name is the document ID
      categories.push(category);
    });

    return categories;
  } catch (error) {
    console.error("Error getting categories: ", error);
    return [];
  }
};




export const getRoundData = async (category, round) => {
  const categoryRef = doc(db, "Quizes", category);

  try {
    const docSnapshot = await getDoc(categoryRef);

    if (docSnapshot.exists()) {
      const categoryData = docSnapshot.data();
      const roundData = categoryData[round];
      if (roundData) {
        return roundData;
      } else {
        console.log(`Round ${round} not found in category ${category}`);
        return null;
      }
    } else {
      console.log(`Category ${category} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error getting round data: ", error);
    return null;
  }
};
