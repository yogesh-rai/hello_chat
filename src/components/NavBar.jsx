import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';

const NavBar = () => {
  return (
    <div className={styles['navbar']}>
        <div className={styles['logo']}>Hello Chat</div>
        <div  className={styles['admin']}>
            <img src='https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=' alt='' />
            <span>Yogesh</span>
            <button>logout</button>
        </div>
    </div>
  )
}

export default NavBar