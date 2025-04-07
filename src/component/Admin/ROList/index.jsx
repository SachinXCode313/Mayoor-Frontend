import React, { useState, useEffect, useRef } from 'react';
import Wrapper from './style';
import List from './list (1).png';
import noData from "./noData.png";
import hamburgerIcon from "../Home/hamburger.png"; 
import userIcon from "../TeacherList/user.png";

const ROlist = ({ loItems, setLoItems, setIndex, handleLoItems, acItems }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [roList, setRoList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoList, setFilteredRoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [heldRO, setHeldRO] = useState(null);
  const timeoutRef = useRef(null);
  
  // State for menu visibility
  const [menuVisible, setMenuVisible] = useState(false);

  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedClass, setSelectedClass] = useState("1");
  const [selectedSection, setSelectedSection] = useState("1");
  const [selectedSubject, setSelectedSubject] = useState("1");

  useEffect(() => {
    loadRO();
  }, [selectedYear, selectedClass, selectedSection, selectedSubject]);

  const loadRO = async () => {
    if (!selectedYear || !selectedClass || !selectedSection || !selectedSubject) return;
    setLoading(true);
    try {
      console.log("Fetching data with headers:", {
      year: selectedYear,
      classname: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      quarter: 1,
      });

      const response = await fetch("https://mayoor-server.vercel.app/api/report-outcome", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Year": selectedYear,
          "ClassName": selectedClass,
          "Section": selectedSection,
          "Subject": selectedSubject,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setRoList(data);
      setFilteredRoList(data);
    } catch (error) {
      console.error("Error fetching report outcomes:", error);
      setRoList([]);
      setFilteredRoList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setFilteredRoList(roList);
    } else {
      const filteredData = roList.filter(item =>
        item.ro_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRoList(filteredData);
    }
  }, [searchQuery, roList]);

  return (
    <Wrapper>
      <div className="app">
        <header className="header">
          <img src={hamburgerIcon} alt="Menu" className="icon" onClick={() => setMenuVisible(true)}/>
          <img src={userIcon} alt="User" className="icon" />
        </header>
        <h2 className="student-list-heading">RO List</h2>
        <div className="header-filters">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="1">Class: I</option>
            <option value="2">Class: II</option>
            <option value="3">Class: III</option>
          </select>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
            <option value="1">Orchid</option>
            <option value="2">Daffodil</option>
            <option value="3">Tulip</option>
          </select>
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="1">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
          </select>
        </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search RO..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <ul className="ro-list">
        {loading ? (
          <li className="loading-message">Loading...</li>
        ) : filteredRoList.length > 0 ? (
          filteredRoList.map((item) => (
            <li key={item.ro_id} className="ro-list-item">
              <div className="ro-header">
                <img src={List} alt="" className="list-icons" />
                <div className="ro-info">
                  <p className="item-title">{item.ro_name}</p>
                </div>
                <div className='mapCounter'>
                  {item.learning_outcomes ? item.learning_outcomes.length : 0}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="no-results">
            <img className='no-results' src={noData} alt="No Data" />
          </li>
        )}
      </ul>
      
      </div>
    </Wrapper>
  );
};

export default ROlist;
