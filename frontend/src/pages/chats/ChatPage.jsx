import React from 'react'
import SideBar from '../../components/SideBar';
import ChatPanel from '../../components/ChatPanel';
import styles from './ChatPage.module.css';
import styleList from '../forms/Form.module.css'

const ChatPage = () => {
  return (
    <div className={styleList['container']}>
      <div className={styles['wrapper']}>
        <SideBar />
        <ChatPanel />
      </div>
    </div>
  )
}

export default ChatPage;
