import React from 'react'
import Wrapper from './style'
import failIcon from '../assets/remove.png'

const Failed = () => {
  return (
    <Wrapper>
      <div className="popup">
        <div className="popup-content">
          <div className="popup-icon" style={{ color: "red" }}>
            ❌
          </div>
          <h2>Failed</h2>
          <p>Your data could not be saved!</p>
        </div>
      </div>
    </Wrapper>
  )
}
export default Failed
