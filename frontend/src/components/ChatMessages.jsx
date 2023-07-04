import React from 'react'
import Message from './Message'
import styles from '../pages/chats/ChatPage.module.css';

const ChatMessages = () => {
  return (
    <div className={styles['chat-messages']}>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
    </div>
  )
}

export default ChatMessages