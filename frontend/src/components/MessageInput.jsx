import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import EmojiPicker from 'emoji-picker-react';
import styles from '../pages/chats/ChatPage.module.css';

const MessageInput = ({ newMessage, sendMessageHandler, onTyping, setNewMessage }) => {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  let emojiPickerRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!emojiPickerRef.current?.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    }
  });
  

  const emojiPickerHandler = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const emojiSelectHandler = (emoji) => {
    let msg = newMessage;
    msg += emoji?.emoji;
    setNewMessage(msg);
  }

  return (
    <div className={styles['messaage-input-box']}>
        <div ref={emojiPickerRef}>
          <Icon icon="fluent:emoji-add-24-filled" color='#424242' style={{ marginLeft: '2px' }} onClick={emojiPickerHandler}/>
          {showEmojiPicker && <EmojiPicker emojiStyle='native' onEmojiClick={emojiSelectHandler} />}
        </div>
        <input type="text" placeholder='Type a message to send ...'  onFocus={() => setShowEmojiPicker(false)} value={newMessage} onChange={onTyping} onKeyDown={sendMessageHandler} />
        <Icon icon="fluent:send-28-filled" onClick={sendMessageHandler} />
    </div>
  )
}

export default MessageInput