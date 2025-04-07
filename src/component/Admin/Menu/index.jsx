import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import MenuWrapper from './style'; // Import the styled component
import cancel from '../Home/cancel.png';
import subjectAdd from '../Home/subjectAdd.png';
import toturial from '../Home/toturial.png';
import notification from '../Home/notification.png';
import adminAdd from '../Home/adminAdd.png';
import teacherList from '../Home/teacherList.png';

const Menu = ({ onMenuClose }) => {
  const[visible,setVisible] = useState(false)
  const navigate = useNavigate();
  const handleChange = (path) => {
    navigate(path)
  }
  return (
    <MenuWrapper>
      <div className='blur-overlay'>
        <div className='humburger'  onClick={() => setVisible(true)}>
          <img src={cancel} alt='Cancel' className='cancel' onClick={onMenuClose} />
          <div className='paths'>
            <img src={teacherList} alt="TeacherList" className='teacherList'onClick={() => handleChange('/admin/teacherList')} />
            <img src={adminAdd} alt="AdminAdd" className='adminAdd'/>
            <img src={notification} alt="Notification" className='notification' onClick={() => handleChange('/admin/pushNotification')}/>
            <img src={toturial} alt="Toturial" className='toturial' />
            <img src={subjectAdd} alt="SubjectAdd" className='subjectAdd' />
          </div>
        </div>
      </div>
    </MenuWrapper>
  );
};

export default Menu;
