import React, { useState } from 'react';
import Wrapper from './style';
import { Outlet } from 'react-router';
import BottomTab from '../BottomTab';
import Menu from '../Menu'; // Import the Menu component

const Layout = () => {
  const [menuVisible, setMenuVisible] = useState(false); // State for menu visibility

  return (
    <Wrapper>
      <div className="layout">
        <header>
        </header>
        <div className='outlet'>
          <Outlet />
        </div>
        <div className='bottom-tab'>
          <BottomTab />
        </div>
      </div>
    </Wrapper>
  );
}

export default Layout;
