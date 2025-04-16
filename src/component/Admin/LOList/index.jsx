import React, { useState, useEffect, useRef } from 'react';
import Wrapper from './style';
import ACMapping from '../ACMapping';
import List from '../assets/List.png';
import axios from 'axios';
import Form_LO from '../Form_LO';
import MenuDots from '../MenuDots';
import Menu from '../Menu';
import SuccessfulDone from "../SuccessfulDone";
import Failed from "../Failed";
import DeletedSuccessfully from "../SuccessfulDeleted";
import DeleteFailed from "../DeleteFailed";
import AreYouSure from '../AreYouSure';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';

const LOlist = ({ loItems, setLoItems, handleLoItems, acItems, setAcItems, onLogout, filters, setFilters }) => {

  const REACT_APP_API_URL = "https://mayoor-server.vercel.app"

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

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const { year, subject, quarter, classname,section } = filters;

  const loadLO = async () => {
    if (!year || !subject || !quarter || !classname) {
      setLoItems([]);
      setFilteredLoList([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/learning-outcome`, {
        headers: {
          Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with actual token
          'Content-Type': 'application/json',
          year,
          classname,
          subject,
          quarter,
        },
      });

      if (response.data.length === 0) {
        setLoItems([]);
        setFilteredLoList([]);
      } else {
        setLoItems(response.data);
        setFilteredLoList(response.data);
      }

      console.log(response.data);
    } catch (error) {
      console.error('Error fetching learning outcomes:', error);
      setLoItems([]);
      setFilteredLoList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLO();
  }, [year, subject, quarter, classname]);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

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

  useEffect(() => {
    if (showDeleteFailed) {
      const timer = setTimeout(() => {
        setShowDeleteFailed(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [showDeleteFailed])

  const handleDeleteClick = (loId) => {
    setDeleteLoId(loId);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (!deleteLoId) return;
    setLoading(true);
    try {
      const headers = {
        year,
        quarter,
        classname,
        section
      }
      await axios.delete(`${REACT_APP_API_URL}/api/learning-outcome?id=${deleteLoId}`,{headers});
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
          <Menu />
        </div>
        <input
          type="text"
          placeholder="Search Learning Outcome..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="lo-list-heading">
        <h2 className='top-heading'>
          Learning Outcome
        </h2>
      </div>

      <div className='filters'>
        <select value={year} onChange={(e) => handleFilterChange('year', e.target.value)}>
          <option value="2025">2025-2026</option>
          <option value="2024">2024-2025</option>
        </select>

        <select value={subject} onChange={(e) => handleFilterChange('subject', e.target.value)}>
          {["English", "Hindi", "Mathematics", "Science", "Computer Sc.", "Social Studies", "III Language", "GP Values", "Music", "Dance/Dramatics", "Art", "Sports", "Discipline", "Attendance"].map((subj, index) => (
            <option key={index} value={index + 1}>{subj}</option>
          ))}
        </select>

        <select value={quarter} onChange={(e) => handleFilterChange('quarter', e.target.value)}>
        <option value="1">FA 1</option>
            <option value="2">FA 2</option>
            <option value="3">SA 1</option>
            <option value="4">FA 3</option>
            <option value="5">FA 4</option>
            <option value="6">SA 2</option>
        </select>

        <select value={classname} onChange={(e) => handleFilterChange('classname', e.target.value)}>
          {["1", "2", "3", "4", "5", "6", "7", "8"].map((c, index) => (
            <option key={index} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <ul className="lo-list">
        {loading ? (
          <li>
            {/* <div className="circular"></div> */}
            <p className="loading-message">Loading....</p>
          </li>
        ) : filteredLoList.length > 0 ? (
          filteredLoList.map((item, index) => {
            const acCount = item.assessment_criterias ? item.assessment_criterias.length : 0
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
                    <HiOutlineDocumentText size={35} color="#191919" />
                  </div>
                  <div className="lo-info">
                    <p className="item-title">{item.lo_name}</p>
                    <p className="item-info">Pending Priority: {nullPriorityCount}</p>
                  </div>
                  <div className="mapCounter">{acCount}</div> {/* Show count here */}
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
                    <div className='mapLoItem'>{heldLO.lo_name}</div>
                  </div>
                )}
                <div className={`lo-dropdown-content ${activeIndex === index ? 'show' : 'hide'}`}>
                  {activeIndex === index && (
                    <ACMapping acItems={acItems} setAcItems={setAcItems} loId={item.lo_id} acList={acList} setAcList={setAcList} loData={[item]} filters={filters} />
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
        <span className="plus"><HiOutlineDocumentPlus size={30} color="#000" /></span>
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
              // setEditItem={setEditItem}
              // userData = {userData}
              filters={filters}
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
          <DeleteFailed />
        </div>
      )}
    </Wrapper>
  );
};
export default LOlist;