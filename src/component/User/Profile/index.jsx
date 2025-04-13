import React from 'react'
import Wrapper from './style'
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from 'react-router'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("User"))
  const navigate = useNavigate()

  return (
    <Wrapper>
      <div className='profile'>
        <div className='header'>
        <TbArrowBackUp size={30} onClick={() => navigate(-1)}/>
          <h2>Profile</h2>
        </div>
        <div className='container'>
          <div className='admin'>
            <img src={user.image} alt="Admin Image" />
            <h1>{user.name}</h1>
          </div>
          <div className='admin-detail'>
            <div className='admin-name'>  
              <h3>Name</h3>
              <input type='text'
                value={user.name}
                readOnly
              />
            </div>
            <div className='admin-email'>
              <h3>Email</h3>
              <input type='text'
                value={user.email}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Profile
