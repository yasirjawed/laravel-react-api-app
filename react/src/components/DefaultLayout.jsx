import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import {useStateContext} from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
function DefaultLayout() {
    const {user,token,setUser,setToken} = useStateContext();
    if(!token){
        return <Navigate to="/login"/>
    }
    const Logout = () => {
        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div id='defaultLayout'>
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className='content'>
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href='#' onClick={Logout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DefaultLayout
