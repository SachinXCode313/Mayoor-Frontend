import React, { useState } from "react"; 
import backArrow from "../PushNotification/backArrow.png";
import userIcon from "./user.png";
import { FaPlus } from "react-icons/fa";
import Wrapper from "./style";
import { useNavigate } from "react-router";

const AddTeacher = () => {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState({
    name: '',
    email: '',
    classname: '',
    section: '',
    subject: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://mayoor-server.vercel.app/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(teacherData)
      });
      if (response.ok) {
        console.log("Teacher added successfully");
        navigate("/admin/teacherList"); // Redirect to teacher list after successful addition
      } else {
        console.error("Failed to add teacher:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Wrapper>
      <div className="app">
        <header className="header">
          <img src={backArrow} alt="BackArrow" className="icon" onClick={() => {handleNavigation("/admin/teacherList")}}/>
          <div className="active-users"></div>
          <img src={userIcon} alt="User" className="icon" />
        </header>
        <h2 className="teachers-add-heading">Add Teacher</h2>
        <div className="container"> 
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" placeholder="Enter full name" value={teacherData.name} onChange={handleChange} required />
            
            <label>Email:</label>
            <input type="email" name="email" placeholder="Enter Email Address" value={teacherData.email} onChange={handleChange} required />
            
            <label>Class:</label>
            <select name="classname" value={teacherData.classname} onChange={handleChange} required>
              <option value="">Select Class</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              {/* Add more class options as needed */}
            </select>

            <label>Section:</label>
            <select name="section" value={teacherData.section} onChange={handleChange} required>
              <option value="">Select Section</option>
              <option value="1">Section 1</option>
              <option value="2">Section 2</option>
              {/* Add more section options as needed */}
            </select>

            <label>Subject:</label>
            <select name="subject" value={teacherData.subject} onChange={handleChange} required>
              <option value="">Select subject</option>
              <option value="5">Computer Science</option>
              {/* Add more role options as needed */}
            </select>
            <label>Role:</label>
            <select name="role" value={teacherData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Class Teacher">Class Teacher</option>
              <option value="Teacher">Teacher</option>
              {/* Add more role options as needed */}
            </select>

            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddTeacher;