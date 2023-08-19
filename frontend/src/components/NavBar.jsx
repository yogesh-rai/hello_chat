import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import { ChatState } from '../Context/ChatProvider';
import Avatar from 'react-avatar';

const NavBar = () => {

  const { loggedInUser } =  ChatState();

  return (
    <div className={styles['navbar']}>
        <div className={styles['logo']}>Hello Chat</div>
        <div  className={styles['admin']}>
            {/* <img src='https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=' alt='' /> */}
            <Avatar name={loggedInUser?.name} src={loggedInUser.picture} style={{ border: '2px solid white' }} textSizeRatio={1.75} size="30" round={true} />
            <span>{loggedInUser?.name}</span>
        </div>
    </div>
  )
}

export default NavBar