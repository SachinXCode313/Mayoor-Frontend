import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "./style";
import axios from "axios";
import imgUser from "./user.png";
import hamburger from './hamburger.png';
import Menu from '../Menu'; // Import the Menu component

const ClassView = ({ setIndex, user }) => {
  const [selectedChart, setSelectedChart] = useState("ac");
  const [acData, setAcData] = useState([]);
  const [loData, setLoData] = useState([]);
  const [roData, setRoData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("1");
  const [selectedSection, setSelectedSection] = useState("1");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedQuater, setSelectedQuater] = useState("1");
  const [selectedSubject, setSelectedSubject] = useState("1");
  const [userData, setUserData] = useState('');

  const [menuVisible, setMenuVisible] = useState(false);
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
      const response = await axios.get(`https://mayoor-server.vercel.app/api/class-overview-ro-avg`, { headers });
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
  
  

  const handleMenuClose = () => {
    setMenuVisible(false);
  };
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
      const response = await axios.get(`https://mayoor-server.vercel.app/api/class-overview-ac-avg`, { headers });
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
      zoom: { enabled: true },
      background: "rgb(158, 184, 160 , 0.05)",
      scrollablePlotArea: {
        enabled: true, // Enables scrolling
        scrollHeight: undefined,
        scrollHorizontal: true,
      },
      
      
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
      labels: { style: { fontSize: "12px", colors: "#666" } },
      tickAmount: selectedData.length,
    },
    
    yaxis: {
      min: 0,
      max: 1,
      tickAmount: 5,
      floating: false,
      labels: { formatter: (value) => value.toFixed(2) }, 
    },
   // legend: { position: "top", horizontalAlign: "center" },
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
  const handleLogoutClick = () => alert("Logging Out...");

  useEffect(() => {
  const graphContainer = document.querySelector(".chart-wrapper"); // Select chart wrapper
  if (!graphContainer) return;

  let startX = 0;
  let startY = 0;

  const handleTouchStart = (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;

    // If horizontal movement is more than vertical, prevent swipe navigation
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  graphContainer.addEventListener("touchstart", handleTouchStart);
  graphContainer.addEventListener("touchmove", handleTouchMove);

  return () => {
    graphContainer.removeEventListener("touchstart", handleTouchStart);
    graphContainer.removeEventListener("touchmove", handleTouchMove);
  };
}, []);
  

  return (
    <>
    <div className="app">
<header className="classview-header">
  <img src={hamburger} alt="Menu" className="cv-icon" onClick={() => setMenuVisible(true)} />
  {menuVisible && <Menu onMenuClose={handleMenuClose} />}
  <img src={imgUser} alt="User" className="cv-icon" />
</header>
<h2 className="class-view-heading">Student’s List</h2>
<div className="classview-filters">
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
            
            <select onChange={(e) => setSelectedQuater(e.target.value)}>
              <option value="1">Q1</option>
              <option value="2">Q2</option>
            </select>
            
            <select onChange={(e) => setSelectedSubject(e.target.value)}>
              <option value="1">English</option>
              <option value="2">Hindi</option>
              <option value="3">Mathematics</option>
            </select>
          </div>


      <div className="classview-container">
        <div className="info-box">
          <div className="info-text">
            <p><strong>Class:</strong> {userData.class}</p>
            <p><strong>Year:</strong> {userData.year}</p>
            <p><strong>Subject:</strong> {userData.subject}</p>
          </div>
          <div className="info-text">
            <p><strong>Section:</strong> {userData.section}</p>
            <p><strong>Quarter:</strong> {userData.quarter}</p>
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
          <div className="chart-container">
            <ReactApexChart 
              options={getChartOptions()} 
              series={getChartSeries()} 
              type="line" 
              height={250} 
            />
          </div>
        </div>


        
      </div>
      </div>
    </>
  );
};

export default ClassView;
