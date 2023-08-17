import { categoryRef, db } from "./FirebaseAppConfig";
import { setDoc, getDoc, doc } from "firebase/firestore";

export const storeRound = async () => {
  const QuizesRef = doc(db, "Quizes", "Category3");

  try {
    await setDoc(QuizesRef, {
      Round1: {
        quiz1: {
          Question: "Who invent computer",
          Option: ["A", "B", "C", "D"],
          Answer: "C",
        },
        quiz2: {
          Question: "Who invent Electricity",
          Option: ["A", "B", "C", "D"],
          Answer: "A",
        },
      },
    });
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const getQuizData = async (category, round, quiz) => {
  const quizRef = doc(db, "Quizes", category);

  try {
    const docSnapshot = await getDoc(quizRef);
    if (docSnapshot.exists()) {
      const roundData = docSnapshot.data();
      
      const modifiedData = { ...roundData[`Round${round}`][`quiz${quiz}`] }; // Create a shallow copy of the data object
      delete modifiedData.Answer; // Remove the "Answer" property from the copy

      const quizDetails= {'Total Question':Object.keys(roundData[`Round${round}`]).length,'Current Question':quiz} 
      return {'quizDetails':quizDetails,'quizData': modifiedData};

    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};


export const checkQuizAnswer = async (category, round, quiz,Answer) => {
    const quizRef = doc(db, "Quizes", category);
  
    try {
      const docSnapshot = await getDoc(quizRef);
      if (docSnapshot.exists()) {
        const roundData = docSnapshot.data();
        const quizData=roundData[`Round${round}`][`quiz${quiz}`]
        const response={
            'result': Answer === quizData['Answer'],
            'indexNum': quizData['Option'].indexOf(quizData['Answer']),
            'correct': quizData['Answer']
        }
        console.log(response)
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


