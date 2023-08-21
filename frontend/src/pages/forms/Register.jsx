import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { useNavigate, Link } from 'react-router-dom';
import styles from "./Form.module.css";
import axios from 'axios';
import { Oval, ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LOGO_IMG from '../../assets/logo.png';

function Register() {

  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const showHandle = () => {
    setShow(!show)
  }

  const nameHandler = (evt) => {
    setName(evt.target.value);
  }

  const emailHandler = (evt) => {
    setEmail(evt.target.value);
  }

  const passwordHandler = (evt) => {
    setPassword(evt.target.value);
  }

  const uploadAvatarHandler = (evt) => {
    const profilePic = evt.target.files[0]
    if (!profilePic) return;

    if (profilePic.type === 'image/png' || profilePic.type === 'image/jpeg') {
      setIsUploading(true);
      const data = new FormData();
      data.append("file", profilePic);
      data.append("upload_preset", "hello-chat");
      data.append("cloud_name", "dsg6r4u8l");
      fetch("https://api.cloudinary.com/v1_1/dsg6r4u8l/image/upload", {
        method: 'post',
        body: data,
      }).then((res) => res.json())
        .then(resData => {
          setPicture(resData.url.toString());
          setIsUploading(false);
        })
        .catch((err) => {
          setIsUploading(false);
        })
    }
  }

  const submitHandler = async(evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        }
      }
      const result = await axios.post('/api/user', { name, email, password, picture }, config);
      toast.success('Registered succesfully!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored",
      });

      localStorage.setItem('userData', JSON.stringify(result.data));
      navigate('/chats');
      setLoading(false);
      
    } catch (error) {
      const { response } = error;
      const errorMess = response.data.error || error.message || 'Error Occured!';
      toast.error(`${errorMess}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored",
        });
      setLoading(false);
    }
  }

  return (
    <div className={styles["container"]}>
        <img className={styles['logo-img']} src={LOGO_IMG} alt='logo'/>
        <div className={styles['form-wrapper']}>
            <h2>Register</h2>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="username" required onChange={nameHandler} />
                <input type="emai" placeholder="email" required onChange={emailHandler} />
                <div className={styles['input-password-field']}>
                  <input type={show ? "text" : "password"} placeholder="password" required onChange={passwordHandler} />
                    <span onClick={showHandle}>
                      {show ? 
                      <Icon icon="mdi:show" /> 
                      : 
                      <Icon icon="mdi:hide" />
                      }
                    </span>
                </div>
                <input style={{ display: 'none' }} type="file" id="file" onChange={uploadAvatarHandler}/>
                <label htmlFor="file">
                  <Icon icon="bxs:image-add" color='#EE4E35' width="24" height="24" />
                  {
                    isUploading ? 
                    <span style={{ color: '#EE4E35' }}>uplaoding...</span>
                    :
                    <span style={{ color: picture ? '#EE4E35' : '' }}>{picture ? 'Avatar added' : 'Add an avatar'}</span>
                  }
                </label>
                {loading ? 
                    <Oval
                      height={50}
                      width={50}
                      color="#EC2C3B"
                      wrapperStyle={{ display:"flex", justifyContent: 'center' }}
                      visible={true}
                      ariaLabel='oval-loading'
                      secondaryColor="#EC2C3B"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    /> 
                  :
                  <button type='submit'>Sign Up</button>
                }
            </form>
            <p>Already have an account? <Link to='/'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register