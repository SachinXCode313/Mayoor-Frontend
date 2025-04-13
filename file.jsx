import React, { useState, useEffect, useRef } from "react";
import imgMenu from "../assets/menu.png";
import Wrapper from "./style";
import { useNavigate } from "react-router";
import Tutorial from "../Tutorial";

const Menu = ({ onLogoutClick, onReturnClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const tutorialRef = useRef(); // 👈 Ref to control tutorial

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDashboard = () => {
    navigate("/user/home/dashboard");
  };

  const handleTutorial = () => {
    tutorialRef.current?.startTutorial(); // 👈 Manual trigger
  };

  const handleLogout = async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/");
  };

  const handleMappingTree = () => {
    navigate("/user/home/mapping-tree");
  };

  return (
    <Wrapper>
      <div className="menu-container">
        <img
          src={imgMenu}
          alt="Menu"
          className="menu-icon"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        />
        <div className={`sidebar ${menuOpen ? "open" : ""}`}>
          <button onClick={onReturnClick}>Menu⤴</button>
          <button onClick={handleDashboard}>Teacher's Dashboard</button>
          <button onClick={handleTutorial}>Tutorial</button>
          <button onClick={handleMappingTree}>Mapping Tree</button>
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
        </div>
      </div>
      <Tutorial ref={tutorialRef} /> {/* 👈 Attach the ref here */}
    </Wrapper>
  );
};

export default Menu;
