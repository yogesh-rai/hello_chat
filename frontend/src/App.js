import './App.css';
import ChatPage from './pages/chats/ChatPage';
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LOGO_IMG from '../src/assets/logo.png';


function App() {
  return (
    <div>
       <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chats' element={<ChatPage />} />
       </Routes>
       <ToastContainer />
    </div>
  );
}

export default App;
