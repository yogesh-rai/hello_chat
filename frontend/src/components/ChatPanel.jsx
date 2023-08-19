import { useEffect, useState } from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { ChatState } from '../Context/ChatProvider';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getUsersName } from '../config/utils';
import io from 'socket.io-client';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { useNavigate } from 'react-router-dom';


const ENDPOINT = "http://localhost:5000";

var socket, selectedChatCompare;

const ChatPanel = ({messages, setMessages}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnection, setSocketConnection] = useState(false);
  const { loggedInUser, selectedChat, setSelectedChat, notification, setNotification, fetchAgain, setFetchAgain } =  ChatState();

  useEffect(() => {
    setSelectedChat(null);
  }, [loggedInUser]);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    navigate('/');
  }

  const fetchMessages = async () => {
    if (!selectedChat){
      return;
    }

    setIsLoading(true);
    try {
      const config = {
        headers: {
          authorization: `Bearer ${loggedInUser?.token}`,
        }
      }

      const response = await axios.get(`api/message/${selectedChat?._id}`, config);

      const { data } = response;
      setMessages(data);

      socket?.emit("join chat", selectedChat?._id);

    } catch (error) {
      const { response } = error;
      const errorMess = response?.data.error || error.message || 'Failed to get the messages!';
      toast.error(`${errorMess}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", loggedInUser);
    socket.on("connected", () => setSocketConnection(true));
  }, [selectedChat]);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;

  }, [selectedChat]);

  useEffect(()=> {
    socket.on("message recieved", (newMessageRecieved) => {
      if(!selectedChatCompare || selectedChatCompare?._id !== newMessageRecieved?.chat._id) {
        if(!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
        setFetchAgain(!fetchAgain);
      }
    });
  });

  const sendMessage = async (e) => {
    if ((e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) && newMessage.trim() !== '') {
      setNewMessage('');
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${loggedInUser?.token}`,
          }
        }

        const response = await axios.post('api/message',
          {
            content: newMessage,
            chatId: selectedChat?._id,
          },
          config
        )

        const { data } = response;
        setMessages([...messages, data]);

        socket.emit("new message", data);
        setFetchAgain(!fetchAgain);

      } catch (error) {
        const { response } = error;
        const errorMess = response?.data.error || error.message || 'Failed to send the message!';
        toast.error(`${errorMess}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  }

  const selectedUser = getUsersName(loggedInUser, selectedChat?.users);

  return (
    <div className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <span>{selectedUser}</span>
        <div>
        <Menu menuButton={
          <MenuButton style={{ border: 'none', background: 'transparent', cursor: 'pointer', marginRight: '12px' }}>
            <NotificationBadge count={notification.length} effect={Effect.SCALE}/>
            <Icon icon="ooui:bell" color="white" width="25" height="25" />
          </MenuButton>
        }>
          {
            notification.length > 0 ? notification.map((ele) => {
              return (
                <MenuItem
                 key={ele._id}
                 onClick={() => {
                  setSelectedChat(ele.chat);
                  setNotification(notification.filter((n) => n !== ele));
                }}>
                  New message from {getUsersName(loggedInUser, ele.chat.users)}
                </MenuItem>
              );
            })
            :
            <MenuItem>No new messages</MenuItem>
          }
        </Menu>
        <Icon icon="mingcute:power-fill"  onClick={logoutHandler} width="25" height="25" alt='logout' style={{ cursor: 'pointer', marginRight: '12px' }}/>
        </div>
      </div>
      {
        selectedChat ? 
        <>
          <ChatMessages messages={messages} isLoading={isLoading} />
          <MessageInput 
            newMessage={newMessage}
            sendMessageHandler={(event) => sendMessage(event)}
            onTyping={(event) => typingHandler(event)}
            setNewMessage={setNewMessage}
          />
        </> 
        :
        <div>
          <div className={styles['default-screen']}>Choose a chat to start conversation</div>
        </div>
      }
      
    </div>
  )
}

export default ChatPanel