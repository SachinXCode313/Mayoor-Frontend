import React, { useState, useEffect, useRef } from "react";
import Wrapper from "./style";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Done from "../assets/check.png";
import SuccessfulDone from "../Popup_successful";
import Failed from "../Popup_Failed/index.jsx";
const Assessment = ({ selectedAssessment, onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const containerRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [scoresLoaded, setScoresLoaded] = useState(false);
  const [studentName, setStudentName] = useState([]);
  const [loading, setLoading] = useState(false);
  // const missingMarksRef = useRef(null);
  useEffect(() => {
    const sessionUserData = sessionStorage.getItem("userData");
    if (sessionUserData) {
      const parsedUserData = JSON.parse(sessionUserData);
      setUserData(parsedUserData);
      if (!scoresLoaded) {
        loadSavedScores(parsedUserData);
        setScoresLoaded(true);
      }
    }
  }, [selectedAssessment]);
  useEffect(() => {
    const loadStudents = async () => {
      if (!userData || studentName.length > 0) return;
      setLoading(true);
      try {
        const headers = {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
          year: userData.year,
          classname: userData.class,
          section: userData.section,
          subject: userData.subject,
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/students`,
          { headers }
        );
        const re = /(\b[a-z](?!\s))/g;
        const formatted = response.data.students.map((student) => ({
          ...student,
          name: student.name.toLowerCase().replace(re, (x) => x.toUpperCase()),
          marks: "",
        }));
        setStudentName(formatted);
      } catch (error) {
        console.error("Error fetching students:", error.response || error.message);
        setStudentName([]);
      } finally {
        setLoading(false);
      }
    };
    if (userData && Object.keys(userData).length > 0 && studentName.length === 0) {
      loadStudents();
    }
  }, [userData]);
  const loadSavedScores = async (userData) => {
    if (loading) return;
    setLoading(true);
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData?.year,
      classname: userData?.class,
      section: userData?.section,
      quarter: userData?.quarter,
      subject: userData?.subject,
      ac_id: selectedAssessment.ac_id,
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria-score`,
        { headers }
      )
      if (response.data && Array.isArray(response.data)) {
        const transformedStudents = response.data.map((item) => ({
          id: item.student_id,
          name: item.student_name
            .toLowerCase()
            .replace(/\b[a-z](?!\s)/g, (x) => x.toUpperCase()),
            marks: (selectedAssessment.max_marks * parseFloat(item.value)) % 1 === 0
            ? (selectedAssessment.max_marks * parseFloat(item.value)).toString()
            : (selectedAssessment.max_marks * parseFloat(item.value)).toFixed(1),
          scoreId: item.id,
        }));
        setStudents(transformedStudents);
      } else {
        setStudents([]);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        console.error("Score API error:", error.response || error.message);
        setStudents([]);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleMarksChange = (e, studentId) => {
    let value = e.target.value;
    if (!/^\d+(\.\d{0,1})?$/.test(value) && value !== "") return;
    const maxMarks = selectedAssessment?.max_marks || 100;
    if (parseFloat(value) > maxMarks || parseFloat(value) < 0) return;
    const sourceList = students.length > 0 ? students : studentName;
    const updatedList = sourceList.map((stu) =>
      stu.id === studentId ? { ...stu, marks: value } : stu
    );
    students.length > 0 ? setStudents(updatedList) : setStudentName(updatedList);
  };
  const submitNewScores = async (newScores, headers) => {
    try {
      const body = {
        ac_id: selectedAssessment.ac_id,
        scores: newScores
      }
      console.log("Submitting new scores:", body)
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria-score`,
        body,
        { headers }
      )
      setShowSuccess(true)
    } catch (error) {
      setShowFailed(true)
      console.error("Failed to submit scores:", error.response || error.message)
    }
  }
  const updateScores = async (updateScoresList, headers) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria-score/?ac_id=${selectedAssessment.ac_id}`,
        { scores: updateScoresList },
        { headers }
      );
      setShowSuccess(true);
    } catch (error) {
      setShowFailed(true);
    }
  };
  const handleSubmit = async () => {
    if (!selectedAssessment?.ac_id || !userData) return
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData?.year,
      classname: userData?.class,
      section: userData?.section,
      quarter: userData?.quarter,
      subject: userData?.subject,
    }
    const dataSource = students.length > 0 ? students : studentName
    const newScores = []
    const updateScoresList = []
    dataSource.forEach((student) => {
      if (student.marks !== null) {
        const marksValue = student.marks === "" ? null : Number(student.marks)
        if (!student.scoreId) {
          newScores.push({ student_id: student.id, obtained_marks: marksValue })
        } else {
          updateScoresList.push({
            id: student.scoreId,
            student_id: student.id,
            obtained_marks: marksValue,
          })
        }
      }
    })
    if (newScores.length > 0) await submitNewScores(newScores, headers)
    if (updateScoresList.length > 0) await updateScores(updateScoresList, headers)
  }
  // useEffect(() => {
  //   const source = students.length > 0 ? students : studentName;
  //   const missingCount = source.filter((stu) => stu.marks === "" || stu.marks === null).length;
  //   if (missingMarksRef.current !== missingCount) {
  //     missingMarksRef.current = missingCount;
  //     onMissingMarksChange(selectedAssessment.ac_id, missingCount);
  //   }
  // }, [students, studentName, selectedAssessment, onMissingMarksChange])
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);
  useEffect(() => {
    if (showFailed) {
      const timer = setTimeout(() => setShowFailed(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showFailed]);
  const displayList = (students.length > 0 ? students : studentName).filter((stu) =>
    stu.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Wrapper>
      <div className="profile-section">
        <div className="search-container">
          <button className="back-button" onClick={onBack}>
            <FaArrowLeft />
          </button>
          <input
            type="text"
            placeholder="Search Student..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
        <div className="info-container">
          <h1 className="name">
            {selectedAssessment ? selectedAssessment.ac_name : "AC-1"}
          </h1>
          <div className="scores">
          <p className="max-marks">Max Marks: {selectedAssessment?.max_marks}</p>
          <p className="average-score">Average Score: {selectedAssessment?.average_score?.toFixed(2)}</p>
          </div>
        </div>
      </div>
      {loading && <p style={{ textAlign: "center" }}>Loading student data...</p>}
      <div className="ac-container">
        <div className="student-list" ref={containerRef}>
          {displayList.map((stu) => (
            <div className="ac-box" key={stu.id}>
              <div className="student-avatar">
                {stu.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0].toUpperCase())
                  .join("")}
              </div>
              <div className="details">
                <h3 className="studentName">{stu.name}</h3>
                <p className="roll-number">Roll Number: {stu.id}</p>
                <input
                  type="number"
                  step="0.1"
                  className="marks-input"
                  value={stu.marks || ""}
                  onChange={(e) => handleMarksChange(e, stu.id)}
                  placeholder="Enter Marks"
                  min="0"
                  max={selectedAssessment?.max_marks || 100}
                  required
                />
              </div>
            </div>
          ))}
        </div>
        <div
        className="add"
      >
        <span className="plus"> <img
          src={Done}
          alt="Done"
          className="done-button"
          onClick={handleSubmit}
        /></span>
      </div>
      </div>
      {showSuccess && (
        <div className="success-overlay">
          <SuccessfulDone />
        </div>
      )}
      {showFailed && (
        <div className="success-overlay">
          <Failed />
        </div>
      )}
    </Wrapper>
  );
};
export default Assessment;