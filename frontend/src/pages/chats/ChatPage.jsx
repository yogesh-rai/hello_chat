import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar';
import ChatPanel from '../../components/ChatPanel';
import styles from './ChatPage.module.css';
import styleList from '../forms/Form.module.css'
import { ChatState } from '../../Context/ChatProvider';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const { loggedInUser, setSelectedChat } =  ChatState();
  
  // useEffect(() => {
  //   setMessages([]);
  //   setSelectedChat(null);
  // }, []);


  return (
    <div className={styleList['container']}>
      <div className={styles['wrapper']}>
        <SideBar messages={messages} />
        <ChatPanel messages={messages} setMessages={setMessages} />
      </div>
    </div>
  )
}

export default ChatPage;
