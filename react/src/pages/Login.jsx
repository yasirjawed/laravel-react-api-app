import React, {useRef, useState} from 'react'
import {Link} from "react-router-dom"
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
function Login() {
    const {setUser,setToken} = useStateContext();
    const [errors, setErrors] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axiosClient.post('/login',payLoad)
        .then(({data}) => {
            console.log(data);
            setUser(data.user);
            setToken(data.token);
        })
        .catch((err) => {
            const response = err.response;
            if(response && response.status == 422){
                setErrors(response.data.errors);
            }
        })
    }
  return (
    <>
        <h1 className='title'>
            Login to your Account
        </h1>
        {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
        <form onSubmit={onSubmit}>
            <input ref={emailRef} type='email' placeholder='Email' />
            <input ref={passwordRef} type='password' placeholder='Password' />
            <button className='btn btn-block'>Login</button>
            <p className='message'>
                Not registered?
                <Link to="/signup"> Create An Account</Link>
            </p>
        </form>
    </>
  )
}

export default Login;
