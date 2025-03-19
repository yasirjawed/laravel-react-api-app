import React, { useState, useEffect } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'

function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUsers()      
  }, [])
  const deleteUser = (user) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
      setIsLoading(true)
      axiosClient.delete(`/users/${user.id}`)
        .then(() => {
          fetchUsers()
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
        })
    }
  }
  const fetchUsers = async () => {
    setIsLoading(true)
    axiosClient.get('/users')
      .then((res) => {
        setUsers(res.data.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Users</h1>
        <Link to="/users/create" className='btn-add'>Create User</Link>
      </div>
      <div className='card animated fadeInDown'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            
            {isLoading && 
              <tbody>
                <tr>
                  <td colSpan={5} className='text-center'>Loading...</td>
                </tr>
              </tbody>
            }
            {!isLoading && 
              <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.created_at}</td>
                      <td>
                        <Link to={`/users/${user.id}`} className='btn-edit'>Edit</Link>
                        &emsp;
                        <button onClick={()=>deleteUser(user)} className='btn-delete'>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            }
          </table>
      </div>
    </div>
  )
}

export default Users
