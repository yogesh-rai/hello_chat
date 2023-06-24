import React from 'react'
import styles from '../pages/chats/ChatPage.module.css';

const  Users = () => {
  return (
    <div>
        <div className={styles['user-chats']}>
            <img src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=" alt="user-img"/>
            <div className={styles['user-info']}>
                <span>John</span>
                <p>hello</p>
            </div>
        </div>
        <div className={styles['user-chats']}>
            <img src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=" alt="user-img"/>
            <div className={styles['user-info']}>
                <span>John</span>
                <p>hello</p>
            </div>
        </div>
        <div className={styles['user-chats']}>
            <img src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=" alt="user-img"/>
            <div className={styles['user-info']}>
                <span>John</span>
                <p>hello</p>
            </div>
        </div>
        <div className={styles['user-chats']}>
            <img src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=" alt="user-img"/>
            <div className={styles['user-info']}>
                <span>John</span>
                <p>hello</p>
            </div>
        </div>
    </div>
  )
}

export default Users;