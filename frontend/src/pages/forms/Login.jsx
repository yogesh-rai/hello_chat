import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import styles from "./Form.module.css";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showHandle = () => {
    setShow(!show)
  }

  const emailHandler = (evt) => {
    setEmail(evt.target.value);
  }

  const passwordHandler = (evt) => {
    setPassword(evt.target.value);
  }

  const submitHandler = async(evt) => {
    evt.preventDefault();
    // console.log(email, password);
    setLoading(true);

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        }
      }
      const result = await axios.post('/api/user/login', { email, password }, config);

      toast.success('Logged In succesfully!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored",
      });

      localStorage.setItem('userData', JSON.stringify(result?.data));
      navigate('/chats');
      setLoading(false);
      
    } catch (error) {
      console.log(error);
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
        <div className={styles['form-wrapper']}>
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <input type="emai" placeholder="email" required value={email} onChange={emailHandler} />
                <div className={styles['input-password-field']}>
                  <input type={show ? "text" : "password"} placeholder="password" required value={password} onChange={passwordHandler} />
                    <span onClick={showHandle}>
                      {show ? 
                      <Icon icon="mdi:show" /> 
                      : 
                      <Icon icon="mdi:hide" />
                      }
                    </span>
                </div>
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
                  <>
                    <button type='submit'>Sign In</button>
                    <button
                      type='button'
                      style={{ backgroundColor: 'grey' }}
                      onClick={() => {
                        setEmail('guest@example.com');
                        setPassword('GuestUser123');
                      }}
                    >
                      Get guest user credentials
                    </button>
                  </>
                }
            </form>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
    </div>
  )
}

export default Login