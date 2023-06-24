import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';

const Message = () => {
  return (
    <div className={`${styles.message} ${styles.owner}`}>
      <div className={styles['message-info']}>
        <img src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=" alt="user-img"/>
      </div>
      <div className={styles['message-content']}>
        <p>hello my name is john, how are you? hello my name is john, how are you? hello my name is john, how are you? hello my name is john, how are you?</p>
      </div>
    </div>
  )
}

export default Message