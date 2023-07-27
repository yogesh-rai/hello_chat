import { useState } from 'react'
import { Icon } from '@iconify/react';
import styles from '../pages/chats/ChatPage.module.css';
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const MessageInput = ({ messages, setMessages }) => {

  const [newMessage, setNewMessage] = useState('');

  const { loggedInUser, selectedChat } =  ChatState();

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  }

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

      } catch (error) {
        const { response } = error;
        const errorMess = response.data.error || error.message || 'Failed to send the message!';
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
  }

  return (
    <div className={styles['messaage-input-box']}>
        <input type="text" placeholder='Type a message to send ...'  value={newMessage} onChange={typingHandler} onKeyDown={sendMessage}/>
        <Icon icon="mdi:image-add" width="28" height="28" color='gray'/>
        <Icon icon="fluent:send-28-filled" onClick={sendMessage}/>
    </div>
  )
}

export default MessageInput