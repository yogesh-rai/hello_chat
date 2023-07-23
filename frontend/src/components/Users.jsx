import React from 'react'
import { ChatState } from '../Context/ChatProvider';
import styles from '../pages/chats/ChatPage.module.css';
import UserList from './UserList';

const  Users = () => {

  const { selectedChat } =  ChatState();

  const { users } = selectedChat || [];

  const recieverName = users?.length > 0 ? users[1] : '';

  return (
    <div>
        {
            users && 
            <UserList
              name={recieverName.name}
            />
        }
    </div>
  )
}

export default Users;