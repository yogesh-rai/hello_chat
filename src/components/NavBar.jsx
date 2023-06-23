import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';

const NavBar = () => {
  return (
    <div className={styles['navbar']}>
        <div className={styles['logo']}>Hello Chat</div>
        <div  className={styles['user']}>
            <img src='' alt='' />
            <span>Yogesh</span>
            <button>logout</button>
        </div>
    </div>
  )
}

export default NavBar