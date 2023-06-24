import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';

const ChatPanel = () => {
  return (
    <div className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <span>John</span>
        <button>create a group</button>
      </div>
      <ChatMessages />
      <MessageInput />
    </div>
  )
}

export default ChatPanel