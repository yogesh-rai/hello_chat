import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import Avatar from 'react-avatar';

const UserList = ({name, handleFunction, selectedUser}) => {
  return (
    <div className={styles['user-chats']} style={{ backgroundColor: selectedUser ? '#d92534' : '' }} onClick={handleFunction}>
        {/* <img src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=" alt="user-img"/> */}
        <Avatar name={name} style={{ border: '2px solid white' }} size="35" round={true} />
        <div className={styles['user-info']} style={{ paddingTop: '5px' }}>
            <span>{name}</span>
        </div>
    </div>
  )
}

export default UserList