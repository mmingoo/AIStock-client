import './App.css';
import LoginPage from './page/LoginPage';
import { Route, Routes } from "react-router-dom";
import SignupPage from './page/SignupPage';
import ForgotPasswordPage from './page/Forgotpasswordpage';

function App() {
  return (
    <Routes>

    <Route path = "/login" element = {<LoginPage/>}/>
    <Route path = "/signup" element = {<SignupPage/>}/>
    <Route path="/forgot-password" element = {<ForgotPasswordPage/>}/>
    
    </Routes>
  );
}

export default App;
