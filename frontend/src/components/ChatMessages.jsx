import React, { useEffect, useRef } from 'react'
import Message from './Message'
import styles from '../pages/chats/ChatPage.module.css';
import { Oval } from 'react-loader-spinner';
import Lottie from 'react-lottie';
import animationData from '../animations/typing.json';

const ChatMessages = ({ messages, isLoading, isTyping }) => {
  console.log(messages);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [isTyping]);

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
      <div ref={ref}>
        {isTyping ? 
        <>
          <Lottie
            options={defaultOptions} 
            width={70}
            height={30}
            style={{ marginBottom: '10px', marginLeft: '0px' }}
          />
        </>
        : 
        <></>}
      </div>
    </div>
  )
}

export default ChatMessages