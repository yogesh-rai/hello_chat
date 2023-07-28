import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import Avatar from 'react-avatar';
import { ChatState } from '../Context/ChatProvider';

const Message = ({ message }) => {
  const { content, sender } = message;
  
  const { loggedInUser } =  ChatState();


  return (
    <div className={`${styles.message} ${sender?._id === loggedInUser?._id ? styles.owner : ''}`}>
      <div className={styles['message-info']}>
        {/* <img src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=" alt="user-img"/> */}
        <div className={styles['sender-info']}>
          <Avatar name={sender?.name} style={{ border: '2px solid white' }} size="30" round={true} />
        </div>
      </div>
      <div className={styles['message-content']}>
        <p>{content}</p>
        {/* <p>Hi how are you Hi how are you Hi how are youHi how are youHi how are you Hi how are you Hi how are you Hi how are you Hi how are you Hi how are youHi how are you Hi how are you Hi how are you Hi how are you</p> */}
      </div>
    </div>
  )
}

export default Message