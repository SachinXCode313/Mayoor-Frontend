import React, { useState, useEffect } from "react";
import backArrow from "../PushNotification/backArrow.png";
import userIcon from "./user.png";
import { FaPlus } from "react-icons/fa";
import TeacherModal from "./TeacherModal/index.jsx";
import Wrapper from "./style";
import { useNavigate } from "react-router";

const TeacherList = () => {
  const [teachersData, setTeachersData] = useState([]); // State for API data

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("https://mayoor-server.vercel.app/api/teachers");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); 

        // ✅ Ensure 'teachers' exists and is an array
        if (!data || !data.teachers || !Array.isArray(data.teachers)) {
          console.error("Invalid API response format:", data);
          return;
        }

        // ✅ Format API Data
        const formattedData = data.teachers.map((teacher) => ({
          teacher_name: teacher.teacher_name,
          classes: teacher.class || "Unknown Class",
          subjects: teacher.subject
            ? Array.isArray(teacher.subject)
              ? teacher.subject
              : [teacher.subject]
            : ["Unknown"],
          role: teacher.role || "Unknown Role",
          email: teacher.email || "No Email",
          section: teacher.section || "No Section",
          avatar: require("./kavya.png"), // Default static avatar
        }));

        setTeachersData(formattedData);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeachers();
  }, []);

  // State for filters
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  // State for modal
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Filtering Logic
  const filteredTeachers = teachersData.filter((teacher) => {
    const matchesSubject = selectedSubject
      ? teacher.subjects.some((subject) => subject.includes(selectedSubject))
      : true;
    const matchesClass = selectedClass ? teacher.classes.includes(selectedClass) : true;
    const matchesSection = selectedSection ? teacher.section.includes(selectedSection) : true; // ✅ Added section filter
  
    return matchesSubject && matchesClass && matchesSection;
  });

  // ✅ Handle Modal Open
  const handleCardClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  // ✅ Handle Modal Close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(-1)
  };

  const handleChange = (path) => {
    navigate(path);
  };

  return (
    <Wrapper>
      <div className="app">
        <header className="header">
          <img
            src={backArrow}
            alt="BackArrow"
            className="icon"
            onClick={() => handleNavigation()}
          />
          <div className="active-users">
            <button className="active-user-button">
              <img src={require("./kavya.png")} alt="User 1" className="active-user" />
            </button>
            <button className="active-user-button">
              <img src={require("./kavya.png")} alt="User 2" className="active-user" />
            </button>
          </div>
          <img src={userIcon} alt="User" className="icon" />
        </header>

        <h2 className="teachers-list-heading">Teacher’s List</h2>

        <div className="layout">
          <div className="filters">
            <select onChange={(e) => setSelectedSubject(e.target.value)}>
              <option value="">Subject</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
            <select onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">Class</option>
              <option value="1ST">I</option>
              <option value="2ND">II</option>
              <option value="3RD">III</option>
              <option value="4TH">IV</option>
              <option value="5TH">V</option>
              <option value="6TH">VI</option>
              <option value="7TH">VII</option>
              <option value="8TH">VIII</option>
              <option value="9TH">IX</option>
            </select>
            <select onChange={(e) => setSelectedSection(e.target.value)}>
              <option value="">Section</option>
              <option value="Orchid">Orchid</option>
              <option value="Daffodil">Daffodil</option>
              <option value="Tulip">Tulip</option>
            </select>
          </div>

          <div className="container">
            {/* <div className="not-assigned">Not Assigned: 5</div> */}
            <div className="teacher-list">
              {filteredTeachers.map((teacher, index) => (
                <div
                  className="teacher-card"
                  key={index}
                  onClick={() => handleCardClick(teacher)}
                >
                  <img src={teacher.avatar} alt="Profile" className="avatar" />
                  <div className="details">
                    <div className="name-class">
                      <h4>{teacher.teacher_name}</h4>
                      <p>Class: {teacher.classes}</p>
                    </div>
                    <div className="subjects">
                      {teacher.subjects.map((subject, idx) => (
                        <span key={idx}>{subject}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <button className="add-button" onClick={() => handleChange("/admin/addteacher")}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && <TeacherModal teacher={selectedTeacher} onClose={closeModal} />}
      </div>
    </Wrapper>
  );
};

export default TeacherList;
