import React from 'react'
import Wrapper from './style'

const SuccessfulDone = () => {
  return (
    <Wrapper>
      <div className="popup">
        <div className="popup-content">
            <div className="popup-icon">
                ✔
            </div>
            <h2>Success</h2>
            <p>Your data was saved!</p>
        </div>
    </div>
    </Wrapper>
  )
}
export default SuccessfulDone
