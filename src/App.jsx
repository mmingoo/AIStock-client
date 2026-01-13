import logo from './logo.svg';
import './App.css';
import LoginPage from './page/LoginPage';
import { Route, Routes } from "react-router-dom";
import SignupPage from './page/SignupPage';

function App() {
  return (
    <Routes>

    <Route path = "/login" element = {<LoginPage/>}/>
    <Route path = "/signup" element = {<SignupPage/>}/>

    </Routes>
  );
}

export default App;
