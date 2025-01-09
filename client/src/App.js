import './App.css';
import Auth from './auth/auth';
import Chat1 from './Chat/Chat1';
import User from './components/User.jsx';
import Login from './pages/login';
import Home from './pages/Home';
import ResetPassword from './pages/resetPassword';
import EmailVerify from './pages/EmailVerify';
import Navbar from './components/navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header.jsx';
import { ToastContainer} from 'react-toastify';
import Admin from './components/Admin.jsx';
import Package from './components/Package.jsx';
import HostingCycles from './components/showhostingCycleSchema.jsx';

function App() {
  return (
    <BrowserRouter> {/* Use BrowserRouter here */}
      <div className="App">
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/chat" element={<Chat1/>} />
          <Route path="/Auth" element={<Auth/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
          <Route path="/EmailVerify" element={<EmailVerify/>} />
          <Route path="/navbar" element={<Navbar/>} />
          <Route path="/header" element={<Header/>} />
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/User/:userId" element={<User />} />
          <Route path="/Package" element={<Package />} />
          <Route path="/showhostingCycleSchema" element={<HostingCycles />} />
          


        </Routes>
      </div>
    </BrowserRouter> 

  );
}

export default App;
