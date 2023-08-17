import logo from './logo.svg';
import './App.css';
import RegisterPage from './Component/RegisterPage';
import QuizPage from './Component/QuizPage';

import {
  BrowserRouter as Router,
  Routes, // Import Routes
  Route,
} from "react-router-dom";
import CongratPage from './Component/CongratPage';


function App() {
  return (
    <Router>
    <div className="App w-[100vw] h-[100vh] flex items-center justify-center  sm:bg-darkBlue">
      <Routes>
        
        <Route path="/" element={<RegisterPage/>} />
        {/* <Route path="/Complete" element={<CategoryPage/>} /> */}
        <Route path="/Quiz/:round/" element={<QuizPage/>} />
        <Route path="/Complete" element={<CongratPage/>} />
        
      </Routes>
    </div>
  </Router>


    
  );
}

export default App;
