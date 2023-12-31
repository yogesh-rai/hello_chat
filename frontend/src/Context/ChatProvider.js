import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userData'));

    if (!userInfo) {
      // navigate('/');
      return;
    }

    setLoggedInUser(userInfo);


  }, [navigate]);


  return (
    <ChatContext.Provider value={{loggedInUser, setLoggedInUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification, fetchAgain, setFetchAgain}}>
        {children}
    </ChatContext.Provider>
  )
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;