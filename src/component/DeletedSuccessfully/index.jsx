import React from 'react'
import Wrapper from './style'

const SuccessfulDeleted = () => {
  return (
    <Wrapper>
      <div className="popup">
        <div className="popup-content">
            <div className="popup-icon">
                ✔
            </div>
            <h1>Deleted Successfully</h1>
            {/* <p>Your data is deleted!</p> */}
        </div>
    </div>
    </Wrapper>
  )
}
export default SuccessfulDeleted
