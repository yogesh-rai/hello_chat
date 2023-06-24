import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import NavBar from './NavBar';
import Search from './Search';
import Users from './Users';

const SideBar = () => {
  return (
    <div className={styles['sidebar']}>
      <NavBar />
      <Search />
      <Users />
    </div>
  )
}

export default SideBar