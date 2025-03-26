import React from 'react'
import Wrapper from './style';

function AreYouSure({ onConfirm, onCancel }) {
  return (
    <Wrapper>
    <div className='mainContainer'>
    <div className='container1'>
        Are you sure?
    </div>
    <div className='container2'>
        <div onClick={onCancel} style={{cursor: 'pointer'}}>
            No
        </div>
        <div onClick={onConfirm} style={{cursor: 'pointer'}}>
            Yes
        </div>
    </div>
    </div>
    </Wrapper>
  )
}

export default AreYouSure;