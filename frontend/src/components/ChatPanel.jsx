import { useEffect, useState } from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { ChatState } from '../Context/ChatProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getUsersName } from '../config/utils';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";

let socket, selectedChatCompare;

const ChatPanel = () => {

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnection, setSocketConnection] = useState(false);
  const { loggedInUser, selectedChat } =  ChatState();

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
    socket.on("connection", () => {
      setSocketConnection(true);
    });
  }, [selectedChat]);

  useEffect(()=> {
    socket?.on("message recieved", (newMessageRecieved) => {
      if(!selectedChatCompare || selectedChatCompare?._id !== newMessageRecieved?.chat._id) {
        return;
      } else {
        setMessages([...messages, newMessageRecieved]);
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


  const selectedUser = getUsersName(loggedInUser, selectedChat?.users);

  return (
    <div className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <span>{selectedUser}</span>
        <button>create a group</button>
      </div>
      <ChatMessages messages={messages} isLoading={isLoading} />
      <MessageInput newMessage={newMessage} setNewMessage={setNewMessage} sendMessageHandler={(event) => sendMessage(event)}/>
    </div>
  )
}

export default ChatPanel