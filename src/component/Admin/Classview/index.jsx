import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "./style";
import axios from "axios";
import imgUser from "./user.png";
import hamburger from './hamburger.png';
import Menu from '../Menu'; // Import the Menu component
import Wrapper from "./style";

const ClassView = ({ setIndex, user, filters, setFilters }) => {
  const [selectedChart, setSelectedChart] = useState("ac");
  const [acData, setAcData] = useState([]);
  const [loData, setLoData] = useState([]);
  const [roData, setRoData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [metricData, setMetricData] = useState([]);
  const [overallData, setOverallData] = useState({});


  const { year, subject, quarter, classname, section } = filters;

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    console.log(filters)
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const handleOpenModal = (category) => {
    const selectedChartData =
      category === "HIGH" ? overallData?.above_average?.map(item => item.student_name) :
        category === "AVERAGE" ? overallData?.average?.map(item => item.student_name) :
          overallData?.below_average?.map(item => item.student_name)

    setSelectedStudents(selectedChartData);
    console.log(selectedChartData)
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

  useEffect(() => {
    // ✅ Mocked dynamic metric data based on selectedChart
    const updatedMetricData =
      selectedChart === "ac"
        ? [
          { value: overallData?.above_average?.length || 0, label: "HIGH", range: "67% - 100%", color: "#E8F5E9", border: "#C8E6C9" },
          { value: overallData?.average?.length || 0, label: "AVERAGE", range: "35% - 66%", color: "#FFF3E0", border: "#FFCCBC" },
          { value: overallData?.below_average?.length || 0, label: "LOW", range: "0% - 33%", color: "#FFEBEE", border: "#FFCDD2" },
        ]
        : selectedChart === "lo"
          ? [
            { value: overallData?.above_average?.length || 0, label: "HIGH", range: "67% - 100%", color: "#E8F5E9", border: "#C8E6C9" },
            { value: overallData?.average?.length || 0, label: "AVERAGE", range: "35% - 66%", color: "#FFF3E0", border: "#FFCCBC" },
            { value: overallData?.below_average?.length || 0, label: "LOW", range: "0% - 33%", color: "#FFEBEE", border: "#FFCDD2" },
          ]
          : [
            { value: overallData?.above_average?.length || 0, label: "HIGH", range: "67% - 100%", color: "#E8F5E9", border: "#C8E6C9" },
            { value: overallData?.average?.length || 0, label: "AVERAGE", range: "35% - 66%", color: "#FFF3E0", border: "#FFCCBC" },
            { value: overallData?.below_average?.length || 0, label: "LOW", range: "0% - 33%", color: "#FFEBEE", border: "#FFCDD2" },
          ];
    console.log("Matric data : ", updatedMetricData)
    setMetricData(updatedMetricData);
  }, [selectedChart, overallData]);

  useEffect(() => {
    console.log(acData)
    const data =
      selectedChart === "ac" ? acData.class_ac_averages :
        selectedChart === "lo" ? loData.class_lo_averages :
          roData.class_ro_averages;

    if (data) {
      setSelectedData(data);
    }
  }, [selectedChart, acData, loData, roData]);

  useEffect(() => {
    const data =
      selectedChart === "ac" ? acData.overall_distribution :
        selectedChart === "lo" ? loData.overall_distribution :
          roData.overall_distribution;

    if (data) {
      setOverallData(data);
    }
    console.log("Overall data : ", data)
  }, [selectedChart, acData, loData, roData])

  const loadAcScore = async () => {
    const headers = { year, subject, quarter, classname, section }

    try {
      const response = await axios.get(`https://mayoor-server.vercel.app/api/class-overview-ac-avg`, { headers });
      console.log('AC API Response:', response.data);

      // Ensure response data is an array
      if (response.data) {
        setAcData(response.data);
        console.log("Extracted scores:", response.data);
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
    loadAcScore();
  }, [filters]);

  const loadLoScore = async () => {
    const headers = { year, subject, quarter, classname, section }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/class-overview-lo-avg`, { headers });
      console.log('LO API Response:', response.data);

      // Ensure response contains valid data
      if (response.data) {
        setLoData(response.data);
        console.log("Extracted scores:", response.data);
      } else {
        setLoData([]); // Reset to avoid errors
        console.error("Invalid LO Data format:", response.data);
      }


    } catch (error) {
      console.error('Error fetching LO scores:', error);
      setLoData([]);
    }
  };

  useEffect(() => {
    loadLoScore();
  }, [filters]);

  const loadRoScore = async () => {
    const headers = { year, subject, quarter, classname, section }

    try {
      const response = await axios.get(`https://mayoor-server.vercel.app/api/class-overview-ro-avg`, { headers });
      console.log('RO API Response:', response.data);

      // Ensure response contains valid data
      if (response.data) {
        setRoData(response.data);
        console.log("Extracted scores:", response.data);
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
    loadRoScore();
  }, [filters]);

  const handleMenuClose = () => {
    setMenuVisible(false);
  };
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
      labels: { rotate: 0, style: { fontSize: "12px", colors: "#666" } },
      tickAmount: selectedData.length, // ✅ Keep gap consistent
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
    console.log(selectedChart)
    const data =
      selectedChart === "ac" ? selectedData.map(item => item.average_score) :
        selectedChart === "lo" ? selectedData.map(item => item.average_score) :
          selectedData?.map(item => item.average_score);
    console.log("chart", data)
    return [{
      name: selectedChart.toUpperCase() + " Scores",
      data: Array.isArray(data) && data.length > 0 ? data : [], // Fallback to avoid errors
    }];
  };

  const chartWidth = selectedData.length > 5 ? Math.max(400, selectedData.length * 80) : 400; // Adjust width dynamically


  return (
    <Wrapper>
      <div className="app">
        <header className="classview-header">
          <Menu />
        </header>
        <h2 className="class-view-heading">Class Overview</h2>
        <div className="classview-filters">
          <select onChange={(e) => handleFilterChange('year', e.target.value)}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select onChange={(e) => handleFilterChange('classname', e.target.value)}>
            <option value="1">Class: I</option>
            <option value="2">Class: II</option>
            <option value="3">Class: III</option>
            <option value="4">Class: IV</option>
            <option value="5">Class: V</option>
            <option value="6">Class: VI</option>
            <option value="7">Class: VII</option>
            <option value="8">Class: VIII</option>
          </select>
          <select onChange={(e) => handleFilterChange('section', e.target.value)}>
            <option value="1">Orchid</option>
            <option value="2">Daffodil</option>
            <option value="3">Tulip</option>
          </select>

          <select onChange={(e) => handleFilterChange('quarter', e.target.value)}>
            <option value="1">FA 1</option>
            <option value="2">FA 2</option>
            <option value="3">SA 1</option>
            <option value="4">FA 3</option>
            <option value="5">FA 4</option>
            <option value="6">SA 2</option>
          </select>

          <select onChange={(e) => handleFilterChange('subject', e.target.value)}>
            {["English", "Hindi", "Mathematics", "Science", "Computer Sc.", "Social Studies", "III Language", "GP Values", "Music", "Dance/Dramatics", "Art", "Sports", "Discipline", "Attendance"].map((subj, index) => (
              <option key={index} value={index + 1}>{subj}</option>
            ))}
          </select>
        </div>


        <div className="classview-container">
          <div className="info-box">
            <div className="info-text">
              <p><strong>Class:</strong> {classname}</p>
              <p><strong>Year:</strong> {year}</p>
              <p><strong>Subject:</strong> {subject}</p>
            </div>
            <div className="info-text">
              <p><strong>Section:</strong> {section}</p>
              <p><strong>Quarter:</strong> {quarter}</p>
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
            <div className="chart-container" style={{ width: `${chartWidth}px` }} >
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
      </div>
    </Wrapper>
  );
};

export default ClassView;
