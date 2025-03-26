import React, { useState, useEffect, useRef } from 'react';
import Wrapper from './style';
import ACMapping from '../LO_AC_Mapping';
import List from '../images/list.png';
import axios from 'axios';
import Form_LO from '../Form_LO';
import MenuDots from '../MenuDots';
import Menu from '../MenuBar';
import SuccessfulDone from "../Popup_successful";
import Failed from "../Popup_Failed/index.jsx";
import DeletedSuccessfully from "../DeletedSuccessfully/index.jsx";
import DeleteFailed from "../DeleteFailed/index.jsx";
import AreYouSure from "../AreYouSure"; 

const LOlist = ({ acItems, setAcItems, loItems, setLoItems, handleLoItems, setIndex,onLogout }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [filteredLoList, setFilteredLoList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [acList, setAcList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteLoId, setDeleteLoId] = useState(null); // Store LO ID for deletion
  const [editItem, setEditItem] = useState(null);
  const [showDeleteFailed, setShowDeleteFailed] = useState(false); // New state for delete failure
  const [heldLO, setHeldLO] = useState(null); // :fire: Track which RO is being held
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const holdTimeoutRef = useRef(null);
  // const timeoutRef = useRef(null);
  const handleClick = () => setIndex(1);
  const toggleDropdown = (index) => setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  const loadLO = async (userData) => {
    setLoading(true);
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/learning-outcome`, { headers });
      setLoItems(response.data);
      setFilteredLoList(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching report outcomes:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userData) {
      loadLO(userData);
    }
  }, [userData]);
  useEffect(() => {
    if (!searchQuery) {
      setFilteredLoList(loItems);  // Reset to the full list when search query is empty
    } else {
      const filteredData = loItems.filter((item) =>
        item?.lo_name?.toLowerCase().includes(searchQuery.toLowerCase())  // Use correct property
      );
      setFilteredLoList(filteredData);
    }
  }, [searchQuery, loItems]);
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
  useEffect(() => {
    if (showDeleted) {
      const timer = setTimeout(() => setShowDeleted(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showDeleted]);
  useEffect(()=>{
    if(showDeleteFailed) {
      const timer = setTimeout(()=>{
        setShowDeleteFailed(false)
      }, 1000)
      return ()=> clearTimeout(timer)
    }
  }, [showDeleteFailed])
  // Function to show the confirmation modal before deletion
  const handleDeleteClick = (loId) => {
    setDeleteLoId(loId);
    setShowConfirmation(true);
  };
  // Function to perform the deletion if confirmed
  const handleConfirm = async () => {
    if (!deleteLoId) return;
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/learning-outcome?lo_id=${deleteLoId}`);
      // Remove deleted item from the list
      const updatedLoItems = filteredLoList.filter(item => item.lo_id !== deleteLoId);
      setLoItems(updatedLoItems);
      setFilteredLoList(updatedLoItems);
      setShowDeleted(true); // Show success message
    } catch (error) {
      setShowDeleteFailed(true);
      console.error("Error deleting Learning Outcome:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
      setDeleteLoId(null);
    }
  };
  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };
  const handleTouchStart = (lo, event) => {
    if (!event || !event.currentTarget) return;  // Add safeguard against undefined event
    const targetElement = event.currentTarget.getBoundingClientRect();
  
    holdTimeoutRef.current = setTimeout(() => {
      setHeldLO(lo);
  
      const offsetX = 20;
      const offsetY = 20;
  
      const newPosition = {
        left: Math.min(targetElement.left + offsetX, window.innerWidth - 200),
        top: Math.min(targetElement.bottom + offsetY, window.innerHeight - 200)
      };
  
      setPopupPosition(newPosition);
    }, 800);
  };
  const handleTouchEnd = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    setHeldLO(null);
  };
  const handleMouseLeave = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    setHeldLO(null);
  };
  return (
    <Wrapper>
      <div className="search-container">
        <div className="icon">
          <Menu
            onProfileClick={() => alert("Go to Profile")}
            onSettingsClick={() => alert("Open Settings")}
            onLogoutClick={onLogout}
            onReturnClick={handleClick}
          />
        </div>
        <input
          type="text"
          placeholder="Search LO..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <ul className="lo-list">
        {loading ? (
          <li>
            {/* <div className="circular"></div> */}
            <p className="loading-message">Loading....</p>
          </li>
        ) : filteredLoList.length > 0 ? (
          filteredLoList.map((item, index) => {
            // Count ACs with null priority
            const nullPriorityCount = item.assessment_criterias
              ? item.assessment_criterias.filter(ac => ac.priority === null).length
              : 0;
            return (
              <li key={item.lo_id} 
              className={`lo-list-item ${activeIndex === index ? 'active' : ''}`} 
              onTouchStart={(e) => handleTouchStart(item, e)}  // Pass 'event' here
              onTouchEnd={handleTouchEnd} 
              onContextMenu={(e) => e.preventDefault()}>
                <div className="lo-header" onClick={() => toggleDropdown(index)}>
                  <div className="list-icon-containers">
                    <img src={List} alt="" className="list-icons" />
                  </div>
                  <div className="lo-info">
                    <p className="item-title">{item.lo_name}</p>
                  </div>
                  <div className="mapCounter">{nullPriorityCount}</div> {/* Show count here */}
                  <div onClick={() => toggleDropdown(index)}>
                    <MenuDots
                      index={index}
                      activeMenuIndex={activeMenuIndex}
                      setActiveMenuIndex={setActiveMenuIndex}
                      onEditClick={() => handleEdit(item)}
                      onDeleteClick={() => handleDeleteClick(item.lo_id)}
                    />
                  </div>
                </div>
                {/* :fire: Show LO names when held */}
                {heldLO && (
        <div className="held-popup" style={{ top: popupPosition.top, left: popupPosition.left }}>
          {heldLO.assessment_criterias && heldLO.assessment_criterias.length > 0 ? (
            heldLO.assessment_criterias.map((ac) => (
              <div key={ac.ac_id} className='mapLoItem'>{ac.ac_name}</div>
            ))
          ) : (
            <div className="no-data">No data available</div>
          )}
        </div>
      )}
                <div className={`lo-dropdown-content ${activeIndex === index ? 'show' : 'hide'}`}>
                  {activeIndex === index && (
                    <ACMapping acItems={acItems} setAcItems={setAcItems} loId={item.lo_id} acList={acList} setAcList={setAcList} loData={[item]} />
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <li className="no-results">
            <p className="no_results">No Results Found</p>
          </li>
        )}
      </ul>
      <div className="add" onClick={() => { setEditItem(null); setShowForm(true); }}>
        <span className="plus">+</span>
      </div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_LO
              closeForm={() => { setShowForm(false); setShowSuccess(true); }}
              closeForm2={() => { setShowForm(false); setShowFailed(true); }}
              closeFormOnly={() => setShowForm(false)}
              loadLO={loadLO}
              setShowSuccess={setShowSuccess}
              setShowFailed={setShowFailed}
              editItem={editItem}
              setEditItem={setEditItem}
            />
            {/* <Form /> */}
          </div>
        </div>
      )}
      {showSuccess && <div className="success-overlay"><SuccessfulDone /></div>}
      {showFailed && <div className="success-overlay"><Failed /></div>}
      {showDeleted && <div className="success-overlay"><DeletedSuccessfully /></div>}
      {showConfirmation && (
        <div className='success-overlay'>
          <AreYouSure
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirmation(false)}
          />
        </div>
      )}
      {showDeleteFailed && (
        <div className='success-overlay'>
        <DeleteFailed/>
        </div>
      )}
    </Wrapper>
  );
};
export default LOlist;