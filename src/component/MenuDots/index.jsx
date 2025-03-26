import React, { useState, useEffect } from "react";
import dotsIcon from "../assets/dots.png";
import Wrapper from "./style";
import pen from '../assets/edit.png';
import deletebtn from "../assets/delete.png";

const MenuDots = ({ onEditClick, onDeleteClick, index, activeMenuIndex, setActiveMenuIndex }) => {
  const isActive = activeMenuIndex === index;

  // Handle menu toggle
  const handleToggle = (e) => {
    e.stopPropagation();
    setActiveMenuIndex(isActive ? null : index); // Close if already open
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dots-menu-container")) {
        setActiveMenuIndex(null); // Close all menus
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <Wrapper>
      <div className="dots-menu-container">
        {/* Three Dots Icon */}
        <img
          src={dotsIcon}
          alt="Menu"
          className={`dots-icon ${isActive ? "active" : ""}`}
          onClick={handleToggle}
        />

        {/* Popup Menu */}
        {isActive && (
          <div className="popup-menu">
            <button onClick={onEditClick}><img src={pen} className="pen" alt="Edit" /></button>
            <button onClick={onDeleteClick}><img src={deletebtn} className="deletebtn" alt="Delete" /></button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default MenuDots;
