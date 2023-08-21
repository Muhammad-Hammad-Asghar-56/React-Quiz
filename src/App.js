import logo from './logo.svg';
import './App.css';
import RegisterPage from './Component/RegisterPage';
import QuizPage from './Component/QuizPage';
import {MarkQuizComplete} from './Firebase/Analaytics'
import {
  BrowserRouter as Router,
  Routes, // Import Routes
  Route,
} from "react-router-dom";
import CongratPage from './Component/CongratPage';
import CategoriesPage from './Component/CategoriesPage';


function App() {
  return (
    <Router>
    <div className="App w-[100vw] h-[100vh] flex items-center justify-center  bg-darkBlue">
      <div id="adsense-top" class="adsense-unit"></div>
      <Routes>
        <Route path="/" element={<RegisterPage/>} />
        <Route path="/:username/Categories" element={<CategoriesPage/>} />
        <Route path="/:username/:Category/Quiz/:round/" element={<QuizPage/>} />
        <Route path="/:username/Complete/:Category/:round" element={<CongratPage/>}/>
      </Routes>
    </div>
  </Router>


    
  );
}

export default App;
