import React, { useState, useEffect } from "react";
import dotsIcon from "../assets/dots.png";
import Wrapper from "./style";
import pen from '../assets/edit.png';
import deletebtn from "../assets/delete.png";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

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
            <button onClick={onEditClick}><TbEdit size={35} color="#6c6c6c" /></button>
            <button onClick={onDeleteClick}><MdDeleteOutline size={35} color="#6c6c6c"/></button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default MenuDots;
