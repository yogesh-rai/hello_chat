import { useEffect, useState } from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { ChatState } from '../Context/ChatProvider';
import { Icon } from '@iconify/react';
import animationData from '../animations/typing.json';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getUsersName } from '../config/utils';
import io from 'socket.io-client';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';


const ENDPOINT = "http://localhost:5000";

let socket, selectedChatCompare;

const ChatPanel = () => {

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnection, setSocketConnection] = useState(false);
  const { loggedInUser, selectedChat, setSelectedChat, notification, setNotification } =  ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    setIsLoading(true);
    try {
      const config = {
        headers: {
          authorization: `Bearer ${loggedInUser?.token}`,
        }
      }

      const response = await axios.get(`api/message/${selectedChat?._id}`, config);

      const { data } = response;
      console.log(data);
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
    fetchMessages();

    selectedChatCompare = selectedChat;

    socket = io(ENDPOINT);

    socket.emit("setup", loggedInUser);
    socket.on("connected", () => {
      setSocketConnection(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [selectedChat]);

  useEffect(()=> {
    socket.on("message recieved", (newMessageRecieved) => {
      if(!selectedChatCompare || selectedChatCompare?._id !== newMessageRecieved?.chat._id) {
        if(!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async (e) => {
    if ((e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) && newMessage.trim() !== '') {
      setNewMessage('');
      socket.emit("stop typing", selectedChat._id);
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
        console.log(data);
        setMessages([...messages, data]);

        socket.emit("new message", data);

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

    if(!socketConnection) return;

    if(!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    
    let lastTypedTime = new Date().getTime();
    var timer = 3000;
    setTimeout(() => {
      var currTime = new Date().getTime();
      var timeDiff = currTime - lastTypedTime;

      if(timeDiff >= timer && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }

    }, timer);
  }

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const selectedUser = getUsersName(loggedInUser, selectedChat?.users);

  return (
    <div className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <span>{selectedUser}</span>
        <Menu menuButton={
          <MenuButton style={{ border: 'none', background: 'transparent', cursor: 'pointer', marginRight: '25px' }}>
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
        {/* <button>create a group</button> */}
      </div>
      <ChatMessages messages={messages} isLoading={isLoading} isTyping={isTyping}/>
      <MessageInput 
        newMessage={newMessage}
        sendMessageHandler={(event) => sendMessage(event)}
        onTyping={(event) => typingHandler(event)}
      />
    </div>
  )
}

export default ChatPanel