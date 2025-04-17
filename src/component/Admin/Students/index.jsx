import React, { useState, useEffect, useRef } from "react";
import hamburgerIcon from "../Home/hamburger.png";
import Menu from '../Menu'; // Import the Menu component
import userIcon from "../TeacherList/user.png";
import { FaPlus } from "react-icons/fa";
import Wrapper from "./style";
import avtar from './kavya.png'; // Import the Menu component
import DownloadChecklist from "../../User/Donwload";

const Students = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("1");
  const [selectedSection, setSelectedSection] = useState("1");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const holdTimeout = useRef(null);
  const containerRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedYear || !selectedClass || !selectedSection) return;
      try {
        const response = await fetch("https://mayoor-server.vercel.app/api/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Year": selectedYear,
            "ClassName": selectedClass,
            "Section": selectedSection,
          },
        });

        const data = await response.json();
        if (Array.isArray(data.students)) {
          setStudentsData(data.students);
        } else {
          setStudentsData([]);
        }
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchStudents();
  }, [selectedClass, selectedSection, selectedYear]);

  const handleHoldStart = (e) => {
    holdTimeout.current = setTimeout(() => {
      setShowCheckboxes(true);
    }, 900);
    e.preventDefault();
  };

  const handleHoldEnd = () => {
    clearTimeout(holdTimeout.current);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".student-card") && !event.target.closest("input[type='checkbox']")) {
      setShowCheckboxes(false);
      setSelectAll(false);
      setSelectedStudents([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(studentsData.map((student) => student.id));
    }
    setSelectAll(!selectAll);
  };
  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  return (
    <Wrapper ref={containerRef}>
      <div className="app">
        <header className="header">
          <Menu />
        </header>
        <h2 className="student-list-heading">Students</h2>
        <div className="layout">
          <div className="filters">
            <select onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <select onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="1">Class: I</option>
              <option value="2">Class: II</option>
              <option value="3">Class: III</option>
              <option value="4">Class: IV</option>
              <option value="5">Class: V</option>
              <option value="6">Class: VI</option>
              <option value="7">Class: VII</option>
              <option value="8">Class: VIII</option>
            </select>
            <select onChange={(e) => setSelectedSection(e.target.value)}>
              <option value="1">Orchid</option>
              <option value="2">Daffodil</option>
              <option value="3">Tulip</option>
            </select>
            <div className="download-icon">
              <DownloadChecklist />
            </div>
            {showCheckboxes && (
              <label className="select-all">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </label>
            )}
          </div>
          <div className="st-container">
            <div className="student-list">
              {studentsData.map((student, index) => (
                <div
                  className="student-card"
                  key={index}
                  onMouseDown={handleHoldStart}
                  onMouseUp={handleHoldEnd}
                  onTouchStart={handleHoldStart}
                  onTouchEnd={handleHoldEnd}
                  onClick={() => {
                    if (showCheckboxes) {
                      handleCheckboxChange(student.id); // Use student ID
                    }
                  }}
                >
                  {showCheckboxes && (
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)} // Use student ID
                      onChange={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  <img src={avtar} alt="Profile" className="namebox" />
                  <div className="stname">
                    <h5>{student.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Students;
