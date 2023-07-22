import { useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import styles from '../pages/chats/ChatPage.module.css';
import axios from 'axios';
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {

  const { user } =  ChatState();

  const [searchRes, setSearchRes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuery = (evt) => {
      if ((evt.target.value).trim() !== '') {
        setSearchQuery(evt.target.value)
      } else {
        setSearchQuery('');
        setSearchRes([]);
      }
  }

  const handleSearch = async(evt) => {
    // console.log(searchQuery);
    if (evt.keyCode === 13 && searchQuery !== '') {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${user.token}`,
          }
        };

        const response = await axios.get(`api/user?search=${searchQuery}`, config);
        const { data } = response;
        console.log(response);
        setSearchRes(data);
        setSearchQuery('');

      } catch (error) {
        const { response } = error;
        const errorMess = response.data.error || error.message || 'Error Occured!';
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
    }
  };


  return (
    <div style={{ borderBottom: '2px solid white'}}>
        <div className={styles['search-user-form']}>
            <input type='text' placeholder='Search user...' onChange={handleQuery} onKeyDown={handleSearch}/>
        </div>
        {/* <div className={styles['user-chats']}>
            <img src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=" alt="user-img"/>
            <div className={styles['user-info']}>
                <span>John</span>
            </div>
        </div> */}
        {
        searchRes.length > 0 && searchRes.map((item) => {
          return (
            <div className={styles['user-chats']} style={{ paddingBottom: '7px' }}>
            {/* <img src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw=" alt="user-img"/> */}
            <Avatar name={item?.name} style={{ border: '2px solid white' }} size="35" round={true} />
            <div className={styles['user-info']} style={{ paddingTop: '5px' }}>
              <span>{item?.name}</span>
            </div>
          </div>
          )
        })
        }
    </div>
  )
}

export default Search