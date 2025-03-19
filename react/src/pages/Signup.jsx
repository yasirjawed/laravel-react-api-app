import React, { useRef, useState } from 'react'
import {Link} from "react-router-dom"
import {useStateContext} from "../contexts/ContextProvider"
import axiosClient from "../axios-client"
function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext();
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payLoad = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        axiosClient.post('/signup',payLoad).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            if(response && response.status == 422){
                setErrors(response.data.errors);
            }
        });
    }
  return (
    <>
        <h1 className='title'>
            Register your account
        </h1>
        {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
        <form onSubmit={onSubmit}>
            <input ref={nameRef} type='text' placeholder='Full Name' />
            <input ref={emailRef} type='email' placeholder='Email' />
            <input ref={passwordRef} type='password' placeholder='Password' />
            <input ref={passwordConfirmationRef} type='password' placeholder='Confirm Password' />
            <button className='btn btn-block'>Login</button>
            <p className='message'>
                Already registered?
                <Link to="/login"> Login your account</Link>
            </p>
        </form>
    </>
  )
}

export default Signup;
