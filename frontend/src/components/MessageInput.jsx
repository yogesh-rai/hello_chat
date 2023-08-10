import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import styles from '../pages/chats/ChatPage.module.css';
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

const MessageInput = ({ newMessage, sendMessageHandler, onTyping }) => {

  return (
    <div className={styles['messaage-input-box']}>
        <input type="text" placeholder='Type a message to send ...'  value={newMessage} onChange={onTyping} onKeyDown={sendMessageHandler}/>
        <Icon icon="mdi:image-add" width="28" height="28" color='gray'/>
        <Icon icon="fluent:send-28-filled" onClick={sendMessageHandler}/>
    </div>
  )
}

export default MessageInput