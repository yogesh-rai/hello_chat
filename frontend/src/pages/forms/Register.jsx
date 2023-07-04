import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import styles from "./Form.module.css";

function Register() {

  const [show, setShow] = useState(false);
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const showHandle = () => {
    setShow(!show)
  }

  return (
    <div className={styles["container"]}>
        <div className={styles['form-wrapper']}>
            <h2>Register</h2>
            <form >
                <input type="text" placeholder="username" required />
                <input type="emai" placeholder="email" required />
                <div className={styles['input-password-field']}>
                  <input type={show ? "text" : "password"} placeholder="password" required />
                    <span onClick={showHandle}>
                      {show ? 
                      <Icon icon="mdi:show" /> 
                      : 
                      <Icon icon="mdi:hide" />
                      }
                    </span>
                </div>
                <input style={{ display: 'none' }} type="file" id="file" />
                <label htmlFor="file">
                  <Icon icon="bxs:image-add" color='#EE4E35' width="24" height="24" />
                  <span>Add an avatar</span>
                </label>
                <button>Sign Up</button>
            </form>
            <p>Already have an account? Login</p>
        </div>
    </div>
  )
}

export default Register