import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AcScores from '../acscore/acScores';
import LoScores from '../loscore/loScores';
import RoScores from '../roscore/roScores';
import Wrapper from './StudentReport';
import axios from "axios";
//import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
//import { BsJustify } from "react-icons/bs";
//import profilePic from '../assets/Group 463.png';
// Registering chart components
//ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
//import { Bar } from "react-chartjs-2";
const Student_report = ({ student, onBack   }) => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [avgScores, setAvgScores] = useState({ avg_ac: 0, avg_lo: 0, avg_ro: 0 });
  const [scores, setScores] = useState({ ac_scores: [], lo_scores: [], ro_scores: [] });
  
  // const chartData = {
  //   labels: ["Science", "Computer Science", "Social Studies", "II Language", "GP"],
  //   datasets: [
  //     {
  //       label: "Marks",
  //       data: [70, 95, 45, 60, 80],
  //       backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#9b59b6", "#e74c3c"],
  //       borderRadius: 5,
  //     },
  //   ],
  // };
   const [userData, setUserData] = useState(null);
      useEffect(() => {
        const userData = sessionStorage.getItem("userData");
        if (userData) {
          setUserData(JSON.parse(userData));
        }
      }, []);
      console.log("Student Data:", student);
      console.log("User Data:", userData);
     console.log("avgscores",avgScores);
  useEffect(() => {
    if (!userData) return; 
    const fetchStudentReport = async () => {
      const headers = {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with actual token
        'Content-Type': 'application/json',
        studentid: student.id,
        year: userData.year,
        classname: userData.class,
        section: userData.section,
        subject: userData.subject,
        quarter: userData.quarter,
      };
      console.log(headers);

      try {
      
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/student-report`, { headers });
        console.log(response.data);
        setScores({
          ac_scores: response.data.ac_scores || [],
          lo_scores: response.data.lo_scores || [],
          ro_scores: response.data.ro_scores || [],
        });
      } catch (error) {
        console.error("Error fetching student report:", error);
      }
    };
    fetchStudentReport();
  }, [userData,student.id]);

useEffect(() => {
  console.log("Scores before computing average:", scores);

  const getAverage = (arr) => {
    if (!arr || arr.length === 0) return 0;
    const validValues = arr.map(item => parseFloat(item.value) || 0);
    return validValues.reduce((sum, val) => sum + val, 0) / validValues.length*100;
  };

  const avg_ac = getAverage(scores.ac_scores);
  const avg_lo = getAverage(scores.lo_scores);
  const avg_ro = getAverage(scores.ro_scores);

  console.log("Computed Averages:", avg_ac, avg_lo, avg_ro);

  setAvgScores({ avg_ac, avg_lo, avg_ro });
}, [scores]);
  const percentages = [
    { value: avgScores.avg_ac, label: "Assessment Criteria", component: "ac" },
    { value: avgScores.avg_lo, label: "Learning Outcome", component: "lo" },
    { value: avgScores.avg_ro, label: "Report Outcome", component: "ro" },
  ];

  const handleComponentClick = (component) => {
    setActiveComponent(component);
  };

  const renderScoreComponent = () => {
    switch(activeComponent) {
      case 'ac':
        return <div className="score-component"><AcScores student={student} scores={scores.ac_scores} /></div>;
      case 'lo':
        return <div className="score-component"><LoScores student={student} scores={scores.lo_scores}/></div>;
      case 'ro':
        return <div className="score-component"><RoScores student={student} scores={scores.ro_scores}/></div>;
      default:
        return null;
    }
  };

  const getPercentageClass = (percentage) => {
    if (percentage < 35) return "#ff4d4d"; // Red
    if (percentage >= 35 && percentage <= 65) return "#ffc107"; // Yellow
    return "#4caf50"; // Green
  };
  
  return (
    <Wrapper>
      <header>
      <div className="st-header">
      <FaArrowLeft className="back-icon" onClick={() => {
      if (activeComponent) {
        setActiveComponent(null); 
      } else {
        onBack(); 
      }
    }} />
        <h2>
      {activeComponent === "ac" ? "AC Scores" :
       activeComponent === "lo" ? "LO Scores" :
       activeComponent === "ro" ? "RO Scores" :
       "Student Report"}
    </h2>
      </div>
      </header>
      
      <div className="main-container">
        {activeComponent === null ? (
          <>
            <div className="student-info">
              <div className="profile-pic">
              <span className="initials">{student.name.split(' ')[0][0] + (student.name.split(' ')[1] ? student.name.split(' ')[1][0].toUpperCase() : "")}</span>
              </div>
              <div className="student-details">
                <p><strong>Name :</strong> {student.name|| userData?.name || "N/A"}</p>
                <p><strong>Roll No : </strong>{student.id|| userData?.id || "N/A"} </p>
                <p><strong>Grade : </strong> {userData?.getclassName || userData?.class || "N/A"}</p>
                <p><strong>Section : </strong>{userData?.sectionName|| userData?.section || "N/A"} </p>
              </div>
            </div>

            <h2 className="average-title" >Average Percentage</h2>
            <div className="percentage-container">
              {percentages.map((item, index) => (
                <div key={index} className="percentage" onClick={() => handleComponentClick(item.component)}>
                  <CircularProgressbar value={item.value} text={`${item.value.toFixed(1)}%`} styles={buildStyles({
                    textSize: "14px", pathColor: "#16a085", textColor: "#333", trailColor: "#d6d6d6", strokeLinecap: "rounded"
                  })} />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            
          </>
        ) : (
          <div className="score-container">
            {renderScoreComponent()}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Student_report;
