import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';
import Avatar from 'react-avatar';

const UserList = ({name, pic, handleFunction, selectedUser, latestMessage}) => {

  return (
    <div className={`${styles.userlists} ${latestMessage ? styles.userChats : ''}`} style={{ backgroundColor: selectedUser ? '#d92534' : '' }} onClick={handleFunction}>
        {/* <img src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=" alt="user-img"/> */}
        <Avatar name={name} src={pic} style={{ border: '2px solid white' }} size="32" round={true} />
        <div className={styles['user-info']}>
            <span>{name}</span>
            {
              latestMessage ? <p>{latestMessage === 'Draft' ? <i>Draft</i> : latestMessage}</p> : <></>
            }
        </div>
    </div>
  )
}

export default UserList