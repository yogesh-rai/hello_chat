import React from 'react'
import { Icon } from '@iconify/react';
import styles from '../pages/chats/ChatPage.module.css';

const MessageInput = () => {
  return (
    <div className={styles['messaage-input-box']}>
        <input type="text" placeholder='Type a message to send ...'/>
        <Icon icon="mdi:image-add" width="28" height="28" color='gray'/>
        <Icon icon="fluent:send-28-filled" />
    </div>
  )
}

export default MessageInput