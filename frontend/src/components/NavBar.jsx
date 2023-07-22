import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import { ChatState } from '../Context/ChatProvider';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const { user } =  ChatState();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    navigate('/');
  }

  return (
    <div className={styles['navbar']}>
        <div className={styles['logo']}>Hello Chat</div>
        <div  className={styles['admin']}>
            {/* <img src='https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=' alt='' /> */}
            <Avatar name={user?.name} style={{ border: '2px solid white' }} textSizeRatio={1.75} size="30" round={true} color={Avatar.getRandomColor('sitebase', ['blue', 'orange', 'green'])} />
            <span>{user?.name}</span>
            <button onClick={logoutHandler}>logout</button>
        </div>
    </div>
  )
}

export default NavBar