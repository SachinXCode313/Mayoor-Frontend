import React, { useState, useRef, useEffect } from 'react';
import Wrapper from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsSendArrowUp } from "react-icons/bs";
import { PiUserList, PiMonitorPlay, PiTreeStructure } from "react-icons/pi";
import { TbLogout2, TbFilterStar } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { RiListSettingsLine } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";
import Tutorial from '../Tutorial';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("User"))
  const [isVisible, setIsVisible] = useState(null);
  const menuRef = useRef(null);
  const tutorialRef = useRef();

  const handleVisibility = (section) => {
    setIsVisible(isVisible === section ? null : section);
  };

  const handleTutorial = () => {
    tutorialRef.current?.startTutorial(); // 👈 Manual trigger
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsVisible(null);
      }
    };
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <Wrapper>
      <div className='menu'>
        <div className='hamburger'>
          <FiMenu size={30} onClick={() => handleVisibility("menu")} />
        </div>

        <div className={`menu-bar ${isVisible === "menu" ? "show" : ""}`} ref={menuRef}>
          <div className='heading'>
            <div className="avatar">
              {user.image
                ? <img src={user.image} alt="User Icon" referrerPolicy="no-referrer" />
                : <CiUser size={60} color='#008680' />}
            </div>
            <div className="profile-info">
              <h2>{user.name}</h2>
              <span onClick={() => navigate('/user/profile')}>View Profile</span>
            </div>
          </div>

          <div className='paths'>
            <div onClick={() => navigate(`/user/homelist`)}>
              <RiListSettingsLine size={30} className='icon' />
              <span>Filter Setting</span>
            </div>
            <div onClick={() => navigate(`/user/mapping-tree`)}>
              <PiTreeStructure size={30} className='icon' />
              <span>Mapping Tree</span>
            </div>
            <div onClick={() => navigate(`/user/dashboard`)}>
              <PiUserList size={30} className='icon' />
              <span>Teachers Dashboard</span>
            </div>
            <div onClick={handleTutorial}>
              <PiMonitorPlay size={30} className='icon' />
              <span>Tutorial</span>
            </div>
            <div className='logout' onClick={handleLogout}>
              <TbLogout2 size={30} className='icon' />
              <span>Logout</span>
            </div>
            <div onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLScNz0eRnql-p_drunBT2NrPbvruEq96XCGL2eWK4a0h8QhcrQ/viewform?usp=header", "_blank")}>
              <VscFeedback size={30} className='icon' />
              <span>Feedback</span>
            </div>
          </div>
        </div>
        <Tutorial ref={tutorialRef} />

        {isVisible === "menu" && (
          <div className="overlay" onClick={() => handleVisibility(null)} />
        )}
      </div>
    </Wrapper>
  );
};

export default Menu;
