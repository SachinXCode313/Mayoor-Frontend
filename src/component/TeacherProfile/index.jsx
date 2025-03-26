import React, { useState } from "react";
import Wrapper from "./styles.js";

const TeacherProfile = () => {
  const [username, setUsername] = useState("Lady Gaga"); 
  const [tempUsername, setTempUsername] = useState("Lady Gaga"); 
  const [email] = useState("ladygaga06771@gmail.com"); 
  const [userId, setUserId] = useState("83020")
  const handleTempUsernameChange = (event) => {
    setTempUsername(event.target.value);
  };

  const handleSaveChanges = () => {
    setUsername(tempUsername); 
  };

  return (
    <Wrapper>
      <div className="container">
      <div className="header">
        <button className="btn" id="backBtn">&larr;</button>
        <h1>Edit Profile</h1>
         <button className="btn" id="notificationBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
        </button>
        <button className="btn icon-btn" id="logoutBtn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 17l5-5-5-5"></path>
            <path d="M21 12H9"></path>
            <path d="M3 19V5a2 2 0 0 1 2-2h4"></path>
          </svg>
        </button>
      </div>

      <div className="profile-section">
        <div className="avatar-container">
          <div className="avatar">
            <span className="avatar-text">{username[0]}</span> 
          </div>
          <div className="user-details">
            <h2 className="username">{username}</h2>
              <p className = "userId"><b>Id: </b>{userId}</p>
          </div> 
        </div>

        <div className="form-container">
          <p className="form-criteria" htmlFor="form-username">Username</p>
          <input 
            type="text" 
            className="form-input" 
            id="form-username" 
            value={tempUsername} 
            onChange={handleTempUsernameChange} 
          />
          <p className="form-criteria" htmlFor="form-mail">Email Id</p>
          <input 
            type="text" 
            className="form-input" 
            id="form-mail" 
            value={email} 
            readOnly 
          />
          <p className="form-criteria" htmlFor="form-class">Class</p>
          <select className="form-input dropdown" id="form-class">
            <option>Class 3</option>
            <option>Class 4</option>
            <option>Class 5</option>
          </select>
          <button id="save-button" onClick={handleSaveChanges}>Save Changes
              <svg id = "pencilIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg></button>
        </div>
      </div>
    </div>
    </Wrapper>
  );
};

export default TeacherProfile;