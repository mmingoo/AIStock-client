import logo from './logo.svg';
import './App.css';
import LoginPage from './page/LoginPage';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>

    <Route path = "/login" element = {<LoginPage/>}/>

    </Routes>
  );
}

export default App;
