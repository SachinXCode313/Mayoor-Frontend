import React from 'react';
import Wrapper from './style';

const DeleteFailed = () => {
  return (
    <Wrapper>
      <div className="popup">
        <div className="popup-content">
          <div className="popup-icon" style={{ color: "red" }}>
            ❌
          </div>
          <h1>Failed</h1>
          {/* <p>Your data is deleted!</p> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default DeleteFailed