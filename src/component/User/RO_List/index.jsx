import React, { useState, useEffect, useRef } from 'react';
import Wrapper from './style';
import LOMapping from '../RO_LO_Mapping';
import List from '../images/list.png';
import axios from 'axios';
import noData from "../assets/noData.png";
import Menu from '../MenuBar';
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import { HiOutlineDocumentText } from "react-icons/hi2";

const ROlist = ({ loItems, setLoItems, setIndex, handleLoItems, acItems ,onLogout}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [roList, setRoList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoList, setFilteredRoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [heldRO, setHeldRO] = useState(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const handleSuccess = () => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      loadRO(JSON.parse(userData)); // Reload data after a successful update
    }
  };
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      loadRO(JSON.parse(userData));
    }
  }, [refreshKey])
  // console.log(userData)
  const loadRO = async (userdata) => {
    console.log(userdata)
    setLoading(true);
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userdata.year,
      classname: userdata.class,
      section: userdata.section,
      subject: userdata.subject,
      quarter: userdata.quarter
    };
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/report-outcome`, { headers });
      setRoList(response.data);
      setFilteredRoList(response.data);
    } catch (error) {
      console.error('Error fetching report outcomes:', error.response || error.message);
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
  // :white_tick: Toggle only when clicking the same item
  // const handleToggle = (index) => {
  //   setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  // };
  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // :fire: Touch and Hold Logic
  const handleTouchStart = (ro) => {
    timeoutRef.current = setTimeout(() => {
      setHeldRO(ro);
    }, 800); // 800ms delay for touch hold
  };
  const handleTouchEnd = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setHeldRO(null);
  };
  const handleReturnClick = () => {
    navigate("/user/homelist"); // Navigate to HomeList
  };
  return (
    <Wrapper>
      <div className="search-container">
        <div className="icon">
          <Menu
            onProfileClick={() => alert("Go to Profile")}
            onSettingsClick={() => alert("Open Settings")}
            onLogoutClick={onLogout}
            onReturnClick={handleReturnClick}
          />
        </div>
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
          <li className="loading-message">
            <div>
            <ReactLoading type="spin" color="#135D5D" height={100} width={100}  />
            <Skeleton count={3} />
            </div>
          </li>
        ) : filteredRoList.length > 0 ? (
          filteredRoList.map((item, index) => {
            const loCount = item.learning_outcomes ? item.learning_outcomes.length : 0; // Count LOs
            const nullPriorityCount = item.learning_outcomes
              ? item.learning_outcomes.filter(lo => lo.priority === null).length
              : 0;
            return (
              <li
                key={item.ro_id}
                className="ro-list-item"
                onTouchStart={() => handleTouchStart(item)}
                onTouchEnd={handleTouchEnd}
                onContextMenu={(e) => e.preventDefault()}
              >
                <div className="ro-header" onClick={() => toggleDropdown(index)}>
                  <div className="list-icon-containers">
                    {/* <img src={List} alt="" className="list-icons" /> */}
                    <HiOutlineDocumentText size={35} color="#2f2e2e"  />
                  </div>
                  <div className="ro-info">
                    <p className="item-title">{item.ro_name}</p>
                    <p className="item-info">Pending Priority: {nullPriorityCount}</p>
                  </div>
                  {/* :white_tick: Display LO count inside mapCounter div */}
                  <div className="mapCounter">
                    {loCount}
                  </div>
                </div>
                {activeIndex === index && (
                  <div className="lomapping-container">
                    <LOMapping
                      roData={[item]}
                      loItems={loItems}
                      setLoItems={setLoItems}
                      handleLoItems={handleLoItems}
                      acItems={acItems}
                      key={refreshKey}
                      onSuccess={handleSuccess}
                    />
                  </div>
                )}
                {heldRO && heldRO.ro_id === item.ro_id && (
                  <div className="held-popup">
                    <div className='mapLoItem'>{heldRO.ro_name}</div>
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <li className="no-results">No Result Found</li>
        )}
      </ul>
    </Wrapper>
  );
};
export default ROlist;