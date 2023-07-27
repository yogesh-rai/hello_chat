import { useEffect, useState } from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { ChatState } from '../Context/ChatProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

const ChatPanel = () => {

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

    } catch (error) {
      const { response } = error;
      const errorMess = response.data.error || error.message || 'Failed to get the messages!';
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
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

console.log(messages);
  return (
    <div className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <span>John</span>
        <button>create a group</button>
      </div>
      <ChatMessages messages={messages} isLoading={isLoading} />
      <MessageInput messages={messages} setMessages={setMessages} />
    </div>
  )
}

export default ChatPanel