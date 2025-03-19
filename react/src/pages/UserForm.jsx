import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
function UserForm() {
  const {id} = useParams()
  const [user, setUser] = useState({
    'id': '',
    'name': '',
    'email': '',
    'password': '',
    'password_confirmation': ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (id) {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          console.log(data.user)
          setUser(data.user)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <div>
      {
        user.id ? ( 
            <h1>Edit User</h1>
        ) : (
            <h1>Create User</h1>
        )
      }
      <div className='card animated fadeInDown'>
        {loading && <div className='text-center'>Loading...</div>}
        {
          errors && 
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={handleSubmit}>
            <input type="text" name='name' value={user.name} onChange={(e) => setUser({...user,  })} placeholder='Full Name'/>
            <input type="text" name='email' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}  placeholder='Email'/>
            <input type="text" name='password' onChange={(e) => setUser({...user, password: e.target.value})} placeholder='Password'/>
            <input type="text" name='password_confirmation' onChange={(e) => setUser({...user, password_confirmation: e.target.value})} placeholder='Confirm Password'/>
            <button className='btn btn-block'>Save</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserForm
