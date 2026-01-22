import './App.css';
import LoginPage from './page/LoginPage';
import { Route, Routes } from "react-router-dom";
import SignupPage from './page/SignupPage';
import ForgotPasswordPage from './page/Forgotpasswordpage';
import MainPage from './page/MainPage';
import MyPage from './page/MyPgae';
import SavedSectorsPage from './page/SavedSectorsPage';
import SectorHistoryPage from './page/SectorHistoryPage';
import StockChartPage from './page/StockChartPage';

function App() {
  return (
    <Routes>

    <Route path = "/login" element = {<LoginPage/>}/>
    <Route path = "/signup" element = {<SignupPage/>}/>
    <Route path="/forgot-password" element = {<ForgotPasswordPage/>}/>
    <Route path='/main' element = {<MainPage/>}/>
    <Route path='mypage' element = {<MyPage/>}/>
    <Route path="/saved-sectors" element={<SavedSectorsPage/>}/>
    <Route path="/sector-history" element={<SectorHistoryPage/>}/>
    <Route path="/stock-chart" element={<StockChartPage/>}/>

    </Routes>
  );
}

export default App;
