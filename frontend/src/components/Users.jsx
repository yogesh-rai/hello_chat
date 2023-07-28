import { useEffect } from 'react'
import { ChatState } from '../Context/ChatProvider';
// import styles from '../pages/chats/ChatPage.module.css';
import UserList from './UserList';
import { getUsersName } from '../config/utils';
import axios from 'axios';
import { toast } from 'react-toastify';

const  Users = () => {

  const { loggedInUser, selectedChat, setSelectedChat, chats, setChats } =  ChatState();

  // const { users } = selectedChat || [];
  console.log(loggedInUser);

  const fetchChats = async () => {

    try {
      const config = {
        headers: {
          authorization: `Bearer ${loggedInUser?.token}`,
        }
      };

      const response = await axios.get('api/chat', config);
      const { data } = response;

      setChats(data);
      // console.log(data);
      
    } catch (error) {
      console.log(error);
      const { response } = error;
      const errorMess = response.data.error || error.message || 'Error fetching the chats!';
      toast.error(`${errorMess}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    fetchChats();
  }, [])
  

  // console.log(selectedChat);
  console.log(chats);
  return (
    <div>
        {
            chats && 
            chats.map((chat) => (
              <div>
                <UserList
                  name={getUsersName(loggedInUser, chat.users)}
                  handleFunction={() => setSelectedChat(chat)}
                  selectedUser={selectedChat?._id === chat._id}
                />
              </div>
            ))
        }
    </div>
  )
}

export default Users;