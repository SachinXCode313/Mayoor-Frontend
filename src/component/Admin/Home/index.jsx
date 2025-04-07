import React, { useState } from 'react'
import Wrapper from './style'
import humburger from './hamburger.png';
import Menu from '../Menu'; // Import the Menu component

const Home = () => {

  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  return (
    <Wrapper>
      <div className='cover'>
        <div className='menu'>
          <img src={humburger} alt="Humburger" onClick={() => setMenuVisible(true)}/>
          {menuVisible && <Menu onMenuClose={handleMenuClose} />}
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
