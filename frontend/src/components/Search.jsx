import { useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import styles from '../pages/chats/ChatPage.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import UserList from './UserList';

const Search = () => {

  const { loggedInUser, setSelectedChat, chats, setChats } =  ChatState();

  const [searchRes, setSearchRes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [resLoading, setResLoading] = useState(false);

  const handleQuery = (evt) => {
      if ((evt.target.value).trim() !== '') {
        setSearchQuery(evt.target.value)
      } else {
        setSearchQuery('');
        setSearchRes([]);
      }
  }

  const handleSearch = async (evt) => {
    // console.log(searchQuery);
    if (evt.key === 'Enter' && searchQuery !== '') {
      setResLoading(true);
      try {
        const config = {
          headers: {
            authorization: `Bearer ${loggedInUser.token}`,
          }
        };

        const response = await axios.get(`api/user?search=${searchQuery}`, config);
        const { data } = response;
        // console.log(response);
        setSearchRes(data);

      } catch (error) {
        const { response } = error;
        const errorMess = response.data.error || error.message || 'User not found!';
        toast.error(`${errorMess}`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setResLoading(false);
    }
  };

  const accessChat = async (receiverId) => {
    setResLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${loggedInUser.token}`,
        }
      };

      const response = await axios.post('api/chat', {receiverId},  config);
      const { data } = response;

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setSearchQuery('');
      setSearchRes([]);
      
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
    setResLoading(false);
  }


  return (
    <div style={{ borderBottom: '2px solid white'}}>
        <div className={styles['search-user-form']}>
            <input type='text' placeholder='Search user...' value={searchQuery} onChange={handleQuery} onKeyDown={handleSearch}/>
        </div>
       <div className={styles['search-result']}>
           {  resLoading ? 
                <Oval
                  height={40}
                  width={40}
                  color="white"
                  wrapperStyle={{ display:"flex", justifyContent: 'center' }}
                  visible={true}
                  ariaLabel='oval-loading'
                  secondaryColor="white"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                /> 
             :
              searchRes.length > 0 && searchRes.map((item) => (
                <UserList
                  name={item?.name}
                  key={item._id}
                  pic={item?.picture}
                  handleFunction={() => accessChat(item._id)}
                />
              ))
            }
       </div>
    </div>
  )
}

export default Search