import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBJe4lt-jpIIvy1M0eh_V3sN-mSp5SdOq4",
  authDomain: "my-quiz-72d6b.firebaseapp.com",
  projectId: "my-quiz-72d6b",
  storageBucket: "my-quiz-72d6b.appspot.com",
  messagingSenderId: "268664605539",
  appId: "1:268664605539:web:68caa0359a4f374d6ba156",
  measurementId: "G-S7PEBDBGX4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

// Assuming "Category" is the root node
const categoryRef = ref(database, 'Category');

export { app, db, categoryRef };
