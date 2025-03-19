import React from 'react'
import {Link} from "react-router-dom"
function Login() {
    const onSubmit = (ev) => {

    }
  return (
    <>
        <h1 className='title'>
            Login to your Account
        </h1>
        <form onSubmit={onSubmit}>
            <input type='email' placeholder='Email' />
            <input type='password' placeholder='Password' />
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
