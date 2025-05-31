import React, { useState, useEffect, useRef } from "react"
import Wrapper from "./style"
import { FaArrowLeft } from "react-icons/fa"
import axios from "axios"
import Done from "../assets/check.png"
import SuccessfulDone from "../Popup_successful"
import Failed from "../Popup_Failed/index.jsx"
const Assessment = ({ selectedAssessment, onBack, onMissingMarksChange }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [userData, setUserData] = useState(null)
  const [students, setStudents] = useState([])
  const [studentName, setStudentName] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFailed, setShowFailed] = useState(false)
  const [scoresLoaded, setScoresLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [averageScore, setAverageScore] = useState(0)
  const containerRef = useRef(null)
  useEffect(() => {
    const sessionUserData = sessionStorage.getItem("userData")
    if (sessionUserData) {
      const parsedUserData = JSON.parse(sessionUserData)
      setUserData(parsedUserData)
      if (!scoresLoaded) {
        loadSavedScores(parsedUserData)
        setScoresLoaded(true)
      }
    }
  }, [selectedAssessment])
  useEffect(() => {
    const loadStudents = async () => {
      if (!userData || studentName.length > 0) return
      setLoading(true)
      try {
        const headers = {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
          year: userData.year,
          classname: userData.class,
          section: userData.section,
          subject: userData.subject,
        }
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/students`,
          { headers }
        )
        const re = /(\b[a-z](?!\s))/g
        const formatted = response.data.students.map((student) => ({
          ...student,
          name: student.name.toLowerCase().replace(re, (x) => x.toUpperCase()),
          marks: "",
        }))
        setStudentName(formatted)
        setAverageScore(0)
      } catch (error) {
        setStudentName([])
        setAverageScore(0)
      } finally {
        setLoading(false)
      }
    }
    if (userData && studentName.length === 0) {
      loadStudents()
    }
  }, [userData])
  const loadSavedScores = async (userData) => {
    if (loading) return
    setLoading(true)
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData?.year,
      classname: userData?.class,
      section: userData?.section,
      quarter: userData?.quarter,
      subject: userData?.subject,
      ac_id: selectedAssessment.ac_id,
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria-score`,
        { headers }
      )
      if (Array.isArray(response.data)) {
        const transformed = response.data.map((item) => {
          const marks =
            (selectedAssessment.max_marks * parseFloat(item.value)) % 1 === 0
              ? (selectedAssessment.max_marks * parseFloat(item.value)).toString()
              : (selectedAssessment.max_marks * parseFloat(item.value)).toFixed(1)
          return {
            id: item.student_id,
            name: item.student_name
              .toLowerCase()
              .replace(/\b[a-z](?!\s)/g, (x) => x.toUpperCase()),
            marks,
            scoreId: item.id,
          }
        })
        setStudents(transformed)
        updateAverage(transformed)
        if (typeof onMissingMarksChange === "function") {
          const missingCount = transformed.filter(s => s.marks === "").length
          onMissingMarksChange(selectedAssessment.ac_id, missingCount)
        }
      } else {
        setStudents([])
        setAverageScore(0)
      }
    } catch (error) {
      setStudents([])
      setAverageScore(0)
    } finally {
      setLoading(false)
    }
  }
  const updateAverage = (list) => {
    const valid = list.map((s) => parseFloat(s.marks)).filter((n) => !isNaN(n))
    if (valid.length === 0) return setAverageScore(0)
    const sum = valid.reduce((a, b) => a + b, 0)
    setAverageScore((sum / valid.length).toFixed(2))
  }
  const handleSearchChange = (e) => setSearchQuery(e.target.value)
  const handleMarksChange = (e, studentId) => {
    let value = e.target.value
    if (!/^\d+(\.\d{0,1})?$/.test(value) && value !== "") return
    const max = selectedAssessment?.max_marks || 100
    if (parseFloat(value) > max || parseFloat(value) < 0) return
    const source = students.length > 0 ? students : studentName
    const updated = source.map((s) =>
      s.id === studentId ? { ...s, marks: value } : s
    )
    if (students.length > 0) {
      setStudents(updated)
      updateAverage(updated)
    } else {
      setStudentName(updated)
      updateAverage(updated)
    }
  }
  const submitNewScores = async (newScores, headers) => {
    try {
      const body = {
        ac_id: selectedAssessment.ac_id,
        scores: newScores,
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria-score`,
        body,
        { headers }
      )
      setShowSuccess(true)
    } catch (error) {
      setShowFailed(true)
    }
  }
  const updateScores = async (updateScoresList, headers) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria-score/?ac_id=${selectedAssessment.ac_id}`,
        { scores: updateScoresList },
        { headers }
      )
      setShowSuccess(true)
    } catch (error) {
      setShowFailed(true)
    }
  }
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
    dataSource.forEach((s) => {
      const marks = s.marks === "" ? null : Number(s.marks)
      if (s.scoreId) {
        updateScoresList.push({ id: s.scoreId, student_id: s.id, obtained_marks: marks })
      } else {
        newScores.push({ student_id: s.id, obtained_marks: marks })
      }
    })
    if (newScores.length > 0) await submitNewScores(newScores, headers)
    if (updateScoresList.length > 0) await updateScores(updateScoresList, headers)
    updateAverage(dataSource)
  }
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])
  useEffect(() => {
    if (showFailed) {
      const timer = setTimeout(() => setShowFailed(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [showFailed])
  const displayList = (students.length > 0 ? students : studentName).filter((stu) =>
    stu.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
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
          <h1 className="name">{selectedAssessment?.ac_name || "AC-1"}</h1>
          <div className="scores">
            <p className="max-marks">Max Marks: {selectedAssessment?.max_marks}</p>
            <p className="average-score">Average Score: {averageScore}</p>
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
                  type="text"
                  step="0.1"
                  className="marks-input"
                  value={isNaN(stu.marks) ? "" : stu.marks}
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
        <div className="add">
          <span className="plus">
            <img src={Done} alt="Done" className="done-button" onClick={handleSubmit} />
          </span>
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
  )
}
export default Assessment