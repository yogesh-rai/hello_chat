import { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
// import styles from '../pages/chats/ChatPage.module.css';
import UserList from './UserList';
import { getUserPic, getUsersName } from '../config/utils';
import axios from 'axios';
import { toast } from 'react-toastify';

const  Users = ({messages}) => {

  const [loggedUser, setLoggedUser] = useState();

  const { loggedInUser, selectedChat, setSelectedChat, chats, setChats, fetchAgain, setFetchAgain } =  ChatState();

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

      
    } catch (error) {
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
    // setLoggedUser(JSON.parse(localStorage.getItem('userData')));
    // if (loggedInUser === loggedInUser) {
    //   fetchChats();
    // }
    fetchChats();
  }, [loggedInUser, fetchAgain]);
  

 
  const getLatestMessage = (chat) => {
    if (!chat.latestMessage) return 'Draft';
    const str = chat?.latestMessage?.content.length > 13
    ? chat.latestMessage?.content.substring(0, 14) + "..."
    : chat.latestMessage?.content
    return str;
  };



  return (
    <div>
        {
          chats && 
          chats.map((chat) => (
            <div>
              <UserList
                name={getUsersName(loggedInUser, chat.users)}
                pic={getUserPic(loggedInUser, chat.users)}
                handleFunction={() => setSelectedChat(chat)}
                selectedUser={selectedChat?._id === chat._id}
                latestMessage={getLatestMessage(chat)}
              />
            </div>
          ))
        }
    </div>
  )
}

export default Users;