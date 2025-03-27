import React, { useState, useEffect } from "react";
import imgMenu from "../assets/menu.png";
import Wrapper from "./style";
const Menu = ({ onProfileClick, onSettingsClick, onLogoutClick, onReturnClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <Wrapper>
    <div className="menu-container">
      {/* Hamburger Icon */}
      <img
        src={imgMenu}
        alt="Menu"
        className="menu-icon"
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing when clicking the icon
          setMenuOpen(!menuOpen);
        }}
      />
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        {/* <button onClick={onProfileClick}>Profile</button> */}
        <button onClick={onReturnClick}>Menu⤴</button>
        {/* <button onClick={onSettingsClick}>Settings</button> */}
        <button onClick={onLogoutClick} className="logout-btn">
          Log Out
        </button>
      </div>
    </div>
    </Wrapper>
  );
};
export default Menu;