import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import styles from "./Form.module.css";

function Login() {

  const [show, setShow] = useState<boolean>(false);

  const showHandle = ():void => {
    setShow(!show)
  }

  return (
    <div className={styles["container"]}>
        <div className={styles['form-wrapper']}>
            <h2>Login</h2>
            <form >
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
                <button>Sign In</button>
            </form>
            <p>Don't have an account? Register</p>
        </div>
    </div>
  )
}

export default Login