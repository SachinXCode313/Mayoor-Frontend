import React from 'react'
import Wrapper from './style'
import backArrow from './backArrow.png'
import { useNavigate } from 'react-router'

const PushNotification = () => {

  const navigate = useNavigate()

  const handleChange = () => {
    navigate(-1)
  }

  return (
    <Wrapper>
      <div className='cover'>
        <div className='header'>
          <img src={backArrow} alt='BackArrow' onClick={handleChange}/>
          <h2>Send Notification</h2>
        </div>
        <div className='section'>
            <h2>Title</h2>
            <input type='text'
              placeholder='Enter Notification Title*'
              name='Title'
              required
            />
            <h2>Body</h2>
            <textarea placeholder='Enter the Notification Body*'
            name='Body'/>
            <div className='submit'>
            <input type='button'
              placeholder='Send'
              value='Send'
              name='Send'
            />
            </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default PushNotification
