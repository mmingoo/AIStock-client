import './App.css';
import LoginPage from './page/LoginPage';
import { Route, Routes } from "react-router-dom";
import SignupPage from './page/SignupPage';
import ForgotPasswordPage from './page/Forgotpasswordpage';
import MainPage from './page/MainPage';

function App() {
  return (
    <Routes>

    <Route path = "/login" element = {<LoginPage/>}/>
    <Route path = "/signup" element = {<SignupPage/>}/>
    <Route path="/forgot-password" element = {<ForgotPasswordPage/>}/>
    <Route path='/main' element = {<MainPage/>}/>
    
    </Routes>
  );
}

export default App;
