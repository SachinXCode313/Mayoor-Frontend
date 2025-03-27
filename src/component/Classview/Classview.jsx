import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Wrapper from "./ClassViewStyle"; 
import Menu from "../MenuBar/index";
import axios from "axios";



const ClassView = ({ setIndex, user,onLogout }) => {
  const [selectedChart, setSelectedChart] = useState("ac");
  const [acData, setAcData] = useState([]);
  const [loData, setLoData] = useState([]);
  const [roData, setRoData] = useState([]);
  const [userData, setUserData] = useState('');
  const [showModal, setShowModal] = useState(false);
const [selectedStudents, setSelectedStudents] = useState([]);


  const studentData = {
    high: ["Aman", "Priya", "Rohit", "Neha", "Vikram"],
    average: ["Karan", "Sneha", "Mohan", "Anjali", "Raj"],
    low: ["Tina", "Arjun", "Simran", "Ravi", "Pooja"],
  };
  
  
  const handleOpenModal = (category) => {
    const selectedChartData = studentDataByChart[selectedChart];
    setSelectedStudents(selectedChartData[category.toLowerCase()]);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalContent = document.querySelector(".modal-content");
  
    if (modalOverlay && modalContent) {
      modalOverlay.classList.add("fadeOut");
      modalContent.classList.add("fadeOut");
  
      setTimeout(() => {
        setShowModal(false);
      }, 300); // Wait for animation to complete
    } else {
      setShowModal(false);
    }
  };
  

  const [metricData, setMetricData] = useState([
    { value: 54, label: "HIGH", range: "67% - 100%", color: "#E8F5E9", border: "#C8E6C9" },
    { value: 40, label: "AVERAGE", range: "35% - 66%", color: "#FFF3E0", border: "#FFCCBC" },
    { value: 10, label: "LOW", range: "0% - 33%", color: "#FFEBEE", border: "#FFCDD2" },
  ]);


  const studentDataByChart = {
    ac: {
      high: ["Aman", "Priya", "Rohit", "Neha", "Vikram"],
      average: ["Karan", "Sneha", "Mohan", "Anjali", "Raj"],
      low: ["Tina", "Arjun", "Simran", "Ravi", "Pooja"],
    },
    lo: {
      high: ["John", "Michael", "Alex", "Emma", "Sophia"],
      average: ["Olivia", "Liam", "Lucas", "Ava", "Grace"],
      low: ["David", "Ethan", "Mia", "Noah", "Chloe"],
    },
    ro: {
      high: ["Raj", "Sanya", "Kabir", "Ishita", "Aryan"],
      average: ["Arjun", "Meera", "Manav", "Aditi", "Kunal"],
      low: ["Neeraj", "Simran", "Tushar", "Isha", "Rohan"],
    },
  };
  




  const selectedData =
    selectedChart === "ac" ? acData :
    selectedChart === "lo" ? loData :
    roData;
    const prefix = selectedChart === "LO" ? "LO" : selectedChart === "RO" ? "RO" : "AC";


  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
   
  
  const loadLoScore = async (userData) => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/class-overview-lo-avg`, { headers });
      console.log('LO API Response:', response.data);
  
      // Ensure response contains valid data
      if (response.data && Array.isArray(response.data.class_lo_averages)) {
        const scores = response.data.class_lo_averages.map(item => item.average_score);
        console.log("Extracted scores:", scores);
        setLoData(scores);
      } else {
        setLoData([]); // Reset to avoid errors
        console.error("Invalid AC Data format:", response.data);
      }
  
  
    } catch (error) {
      console.error('Error fetching LO scores:', error);
      setLoData([]);
    }
  };
  
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadLoScore(userData);
    }
  }, [userData]);


  useEffect(() => {
    // ✅ Mocked dynamic metric data based on selectedChart
    const updatedMetricData =
      selectedChart === "ac"
        ? [
            { value: 54, label: "HIGH", range: "67% - 100%", color: "#E8F5E9", border: "#C8E6C9" },
            { value: 40, label: "AVERAGE", range: "35% - 66%", color: "#FFF3E0", border: "#FFCCBC" },
            { value: 11, label: "LOW", range: "0% - 33%", color: "#FFEBEE", border: "#FFCDD2" },
          ]
        : selectedChart === "lo"
        ? [
          { value: 44, label: "HIGH", range: "67% - 100%", color: "#E8F5E9", border: "#C8E6C9" },
          { value: 30, label: "AVERAGE", range: "35% - 66%", color: "#FFF3E0", border: "#FFCCBC" },
          { value: 12, label: "LOW", range: "0% - 33%", color: "#FFEBEE", border: "#FFCDD2" },
          ]
        : [
          { value: 34, label: "HIGH", range: "67% - 100%", color: "#E8F5E9", border: "#C8E6C9" },
          { value: 20, label: "AVERAGE", range: "35% - 66%", color: "#FFF3E0", border: "#FFCCBC" },
          { value: 13, label: "LOW", range: "0% - 33%", color: "#FFEBEE", border: "#FFCDD2" },
          ];
  
    setMetricData(updatedMetricData);
  }, [selectedChart]);
  



  const loadRoScore = async (userData) => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/class-overview-ro-avg`, { headers });
      console.log('RO API Response:', response.data);
  
      // Ensure response contains valid data
      if (response.data && Array.isArray(response.data.class_ro_averages)) {
        const scores = response.data.class_ro_averages.map(item => item.average_score);
        console.log("Extracted scores:", scores);
        setRoData(scores);
      } else {
        setRoData([]); // Reset to avoid errors
        console.error("Invalid RO Data format:", response.data);
      }
  
    } catch (error) {
      console.error('Error fetching RO scores:', error);
      setRoData([]);
    }
  };
  
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadRoScore(userData);
    }
  }, [userData]);
  
  


  const loadAcScore = async (userData) => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/class-overview-ac-avg`, { headers });
      console.log('AC API Response:', response.data);
  
      // Ensure response data is an array
      if (response.data && Array.isArray(response.data.class_ac_averages)) {
        const scores = response.data.class_ac_averages.map(item => item.average_score);
        console.log("Extracted scores:", scores);
        setAcData(scores);
      } else {
        setAcData([]); // Reset to avoid errors
        console.error("Invalid AC Data format:", response.data);
      }
  
    } catch (error) {
      console.error('Error fetching AC scores:', error);
      setAcData([]);
    }
  };
   
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadAcScore(userData);
    }
  }, [userData]);

  // Chart configuration for ApexCharts
  const getChartOptions = () => ({
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false }, // ✅ Disable zoom
      background: "rgb(158, 184, 160 , 0.05)",
      parentHeightOffset: 10,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: selectedChart === "ac" ? ["#2d6a4f"] : selectedChart === "lo" ? ["#74c69d"] : ["#40916c"],
    markers: {
      size: 6,
      strokeWidth: 2,
      hover: { size: 8 },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.5,
        opacityFrom: 0.6,
        opacityTo: 0.5,
      },
    },
    grid: {
      borderColor: "#ddd",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "14px" },
    },
    xaxis: {
      categories: selectedData.length
        ? selectedData.map((_, i) => `${selectedChart.toUpperCase()} ${i + 1}`)
        : [`${selectedChart.toUpperCase()} 1`, `${selectedChart.toUpperCase()} 2`],
      labels: {  rotate: 0, style: { fontSize: "12px", colors: "#666" } },
      tickAmount: selectedData.length , // ✅ Keep gap consistent
      min: 0,
      max: selectedData.length - 1,
      floating: false,
      axisBorder: { show: true },
      axisTicks: { show: true },
    },
    yaxis: {
      min: 0,
      max: 1,
      tickAmount: 5,
      labels: { formatter: (value) => value.toFixed(2) },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      line: {
        dataLabels: { enabled: false },
      },
    },
    scrollablePlotArea: {
      enabled: true,
      scrollHorizontal: true,
      scrollHeight: undefined,
      padding: {
        right: 10,
      },
    },
    
  });
  
  
  

  const getChartSeries = () => {
    const data =
      selectedChart === "ac" ? acData :
      selectedChart === "lo" ? loData :
      roData;
    console.log("chart",data)
    return [{
      name: selectedChart.toUpperCase() + " Scores",
      data: Array.isArray(data) && data.length > 0 ? data : [0], // Fallback to avoid errors
    }];
  };
  

  const handleClick = () => {
    setIndex(1);
  };

  const handleProfileClick = () => alert("Go to Profile");
  const handleSettingsClick = () => alert("Open Settings");

  // useEffect(() => {
  // const graphContainer = document.querySelector(".chart-wrapper"); // Select chart wrapper
  // if (!graphContainer) return;

  // let startX = 0;
  // let startY = 0;

  // const handleTouchStart = (event) => {
  //   startX = event.touches[0].clientX;
  //   startY = event.touches[0].clientY;
  // };

  // const handleTouchMove = (event) => {
  //   const deltaX = event.touches[0].clientX - startX;
  //   const deltaY = event.touches[0].clientY - startY;

  //   // If horizontal movement is more than vertical, prevent swipe navigation
  //   if (Math.abs(deltaX) > Math.abs(deltaY)) {
  //     event.stopPropagation();
  //     event.preventDefault();
  //   }
  // };

  // graphContainer.addEventListener("touchstart", handleTouchStart);
  // graphContainer.addEventListener("touchmove", handleTouchMove);

  // return () => {
  //   graphContainer.removeEventListener("touchstart", handleTouchStart);
  //   graphContainer.removeEventListener("touchmove", handleTouchMove);
  // 
  // };

  
  
//}, []);

const loadStudentsAvg = async (userData) => {
  const headers = {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
    year: userData.year,
    classname: userData.class,
    section: userData.section,
    subject: userData.subject,
    quarter: userData.quarter,
  };
  
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/class_ac_averages`, { headers });
    console.log('Load Students Response:', response.data);

  } catch (error) {
    console.error('Error fetching AC scores:', error);
    setAcData([]);
  }
};
  
useEffect(() => {
  if (userData && Object.keys(userData).length > 0) {
    loadStudentsAvg(userData);
  }
}, [userData]);


const chartWidth = Math.max(1200, selectedData.length * 0); // Adjust width dynamically


  return (
    <Wrapper>
      <div className="class-header">
        <div className="icon">
          <Menu
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onLogoutClick={onLogout}
            onReturnClick={handleClick}
          />
        </div>
        <div className="class-title">
          <h2>Class Overview</h2>
        </div>
      </div>

      <div className="class-container">
        <div className="info-box">
          <div className="info-text">
            <p><strong>Class:</strong> {userData.getclassName}</p>
            <p><strong>Year:</strong> {userData.year}</p>
            <p><strong>Subject:</strong> {userData.subjectName}</p>
          </div>
          <div className="info-text">
            <p><strong>Section:</strong> {userData.sectionName}</p>
            <p><strong>Quarter:</strong> {userData.quarterName}</p>
          </div>
        </div>

        <div className="chart-selection">
  <div className="custom-dropdown">
    <select
      className="chart-dropdown"
      value={selectedChart}
      onChange={(e) => setSelectedChart(e.target.value)}
    >
      <option value="ac">AC Average</option>
      <option value="lo">LO Average</option>
      <option value="ro">RO Average</option>
    </select>
  </div>
</div>


        {/* Chart Display */}
        <div className="chart-wrapper">
          <div className="chart-container"  style={{ width: `${chartWidth}px` }} >
            <ReactApexChart 
              options={getChartOptions()} 
              series={getChartSeries()} 
              type="line" 
              height={250} 
            />
          </div>
        </div>
        
      
<div className="metric-cards-container">
  {metricData.map((metric, index) => (
    <div
      key={index}
      className="metric-card"
      style={{
        backgroundColor: metric.color,
        border: `1px solid ${metric.border}`,
      }}
    >
      <div className="metric-value">{metric.value}</div>
      <div className="metric-label">{metric.label}</div>
      <div className="metric-range">{metric.range}</div>

      <button
        className="view-button"
        onClick={() => handleOpenModal(metric.label)}
      >
        View Students
      </button>
    </div>
  ))}
</div>


</div>

{/* 
{showModal && (
  <div className="modal-overlay" onClick={handleCloseModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-icon" onClick={handleCloseModal}>
        ✕
      </button>
      <h3>Student List</h3>
      <ul className="student-list">
        {selectedStudents.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>
    </div>
  </div>
)}
*/}


    </Wrapper>
  );
};

export default ClassView;