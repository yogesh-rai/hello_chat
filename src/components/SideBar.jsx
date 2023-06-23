import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import NavBar from './NavBar';

const SideBar = () => {
  return (
    <div className={styles['sidebar']}>
      <NavBar />
    </div>
  )
}

export default SideBar