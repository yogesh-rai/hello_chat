import React from 'react'
import Message from './Message'
import styles from '../pages/chats/ChatPage.module.css';
import { Oval } from 'react-loader-spinner';

const ChatMessages = ({ messages, isLoading }) => {
  return (
    <div className={styles['chat-messages']}>
      {
        isLoading ? 
        <Oval
          height={80}
          width={80}
          color="#EC2C3B"
          wrapperStyle={{ display:"flex", justifyContent: 'center' }}
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#EC2C3B"
          strokeWidth={2}
          strokeWidthSecondary={2}
        /> 
        :
        messages.length > 0 && messages.map((m) => (
          <Message message={m}/>
        ))
      }
    </div>
  )
}

export default ChatMessages