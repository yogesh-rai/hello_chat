import './App.css';
import ChatPage from './pages/chats/ChatPage';
import Login from './pages/forms/Login.tsx';
import Register from './pages/forms/Register.tsx';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
       <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chats' element={<ChatPage />} />
       </Routes>
    </div>
  );
}

export default App;
