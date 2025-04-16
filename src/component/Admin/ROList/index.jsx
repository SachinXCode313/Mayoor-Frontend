import React, { useState, useEffect, useRef } from 'react';
import Wrapper from './style';
import List from '../assets/List.png';
import axios from 'axios';
import noData from "../assets/noData.png";
import Menu from '../Menu';
import { FaPlus } from 'react-icons/fa';
import LOMapping from '../LOMapping';
import MenuDots from '../MenuDots';
import SuccessfulDone from '../SuccessfulDone';
import Failed from '../Failed';
import SuccessfulDeleted from '../SuccessfulDeleted';
import AreYouSure from '../AreYouSure';
import DeleteFailed from '../DeleteFailed';
import Skeleton from 'react-loading-skeleton';
import ReactLoading from 'react-loading'
import { HiOutlineDocumentText } from 'react-icons/hi';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';

const ROList = ({ onLogout, filters, setFilters, loItems, setLoItems, handleLoItems, acItems }) => {
  const REACT_APP_API_URL = "https://mayoor-server.vercel.app";

  const [activeIndex, setActiveIndex] = useState(null);
  const [roList, setRoList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoList, setFilteredRoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(null);
  const [newROName, setNewROName] = useState(""); // State for new RO input
  const [errorMessage, setErrorMessage] = useState("");
  const [editROItem, setEditROItem] = useState(null);
  const [heldRO, setHeldRO] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [deleteRoId, setDeleteRoId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [roItems, setRoItems] = useState([]); // Or however you fetch initial data
  const [showDeleted, setshowDeleted] = useState(false);
  const [showDeleteFailed, setShowDeleteFailed] = useState(false);


  const timeoutRef = useRef(null);


  const handleVisibility = (section) => {
    setIsVisible(section);
    setErrorMessage(""); // Clear errors when opening modal
  };

  const handleCancel = () => {
    setIsVisible(null);
    setNewROName(""); // Reset input field
    setErrorMessage("");
  };

  const { year, subject, quarter, classname, section } = filters;

  const fetchROList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/report-outcome`, {
        headers: { year, subject, quarter, classname }
      });

      if (response.data.length === 0) {
        setRoList([]);
        setFilteredRoList([]);
      } else {
        setRoList(response.data);
        setFilteredRoList(response.data);
      }
    } catch (error) {
      setRoList([]);
      setFilteredRoList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!year || !subject || !quarter || !classname) {
      setRoList([]);
      setFilteredRoList([]);
      return;
    }

    fetchROList();
  }, [year, subject, quarter, classname]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredRoList(roList);
    } else {
      setFilteredRoList(
        roList.filter(item =>
          item.ro_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.learning_outcomes.some(lo => lo.lo_name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    }
  }, [searchQuery, roList]);

  const handleEdit = (item) => {
    if (!item || typeof item.ro_id === "undefined") {
      console.error("Invalid item passed to edit:", item);
      setErrorMessage("Something went wrong while selecting the Report Outcome.");
      return;
    }

    setEditROItem(item);                // Set the selected item
    setNewROName(item.ro_name);        // Preload the name in the modal
    setIsVisible("modal");             // Show modal
  };

  const handleUpdateRO = async () => {
    if (!editROItem || typeof editROItem.ro_id === "undefined") {
      setErrorMessage("Cannot update: missing Report Outcome ID.");
      return;
    }

    if (!newROName.trim()) {
      setErrorMessage("Please enter a valid RO name.");
      return;
    }

    try {
      await axios.put(
        `${REACT_APP_API_URL}/api/report-outcome?id=${editROItem.ro_id}`,
        { name: newROName.trim() }
      );

      // ✅ Re-fetch updated RO list so updated name reflects
      await fetchROList();

      // ✅ Reset form and modal state
      setIsVisible(null);
      setEditROItem(null);
      setNewROName("");
      setErrorMessage("");

      // ✅ Show success feedback
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating RO:", error.response?.data || error.message);
      setErrorMessage("Failed to update Report Outcome.");
      setShowFailed(true);
    } finally {
      setTimeout(() => {
        setShowSuccess(false);
        setShowFailed(false);
      }, 2000);
    }
  };

  const handleDeleteClick = (roId) => {
    setDeleteRoId(roId);
    setShowConfirmation(true);
  }
  const handleConfirm = async () => {
    if (!deleteRoId) return;
    setLoading(true);

    try {
      await axios.delete(`${REACT_APP_API_URL}/api/report-outcome`, {
        params: { id: deleteRoId },
      });

      const updatedRoItems = roList.filter((item) => item.ro_id !== deleteRoId);
      setRoList(updatedRoItems);
      setFilteredRoList(updatedRoItems);

      // ✅ Show success overlay
      setshowDeleted(true);

      // ✅ Hide overlay after 2 seconds
      setTimeout(() => {
        setshowDeleted(false);
      }, 2000);

    } catch (error) {
      setShowDeleteFailed(true);
      console.error(
        "Error deleting Report Outcome:",
        error.response?.data || error.message
      );

      // ❌ Auto-hide error overlay too (optional)
      setTimeout(() => {
        setShowDeleteFailed(false);
      }, 2000);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
      setDeleteRoId(null);
    }
  };


  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Function to Add New RO
  const handleAddRO = async () => {
    if (!year || !subject || !quarter || !classname || !section || !newROName.trim()) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    try {
      await axios.post(
        `${REACT_APP_API_URL}/api/report-outcome`,
        { name: newROName.trim() },
        {
          headers: {
            year,
            subject,
            quarter,
            classname,
            section,
          },
        }
      );

      // ✅ Reload latest RO list from backend
      fetchROList();

      // ✅ Reset form
      setIsVisible(null);
      setNewROName("");
      setEditROItem(null);

      // ✅ Show success feedback
      setShowSuccess(true);
    } catch (error) {
      console.error("Error in Report Outcome operation:", error.response?.data || error.message);
      setErrorMessage("Failed to save Report Outcome.");

      // ❌ Show failed feedback
      setShowFailed(true);
    } finally {
      // ✅ Auto-hide feedback after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setShowFailed(false);
      }, 2000);
    }
  };

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

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  return (
    <Wrapper>
      <div>
        <div className="search-container">
          <div className="icon">
            <Menu
            />
          </div>
          <input
            type="text"
            placeholder="Search Reported Outcome..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>

        <div className="ro-list-heading">
        <h2 className='top-heading'>
          Reported Outcome
        </h2>
        </div>

        <div className='filters'    >
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
      </div>

      <ul className="ro-list">
        {loading ? (
          <li className="loading-message">
            <div>
              <span>Loading...  </span>
              <ReactLoading type="spin" color="#135D5D" height={40} width={40} />
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
                className={`ro-list-item`} // Added class for styling
                onTouchStart={() => handleTouchStart(item)}
                onTouchEnd={handleTouchEnd}
                onContextMenu={(e) => e.preventDefault()} // Prevent long-press menu
              >
                <div className="ro-header" onClick={() => toggleDropdown(index)}>
                  <div className="list-icon-containers">
                    <HiOutlineDocumentText size={35} color="#2f2e2e" />
                  </div>
                  <div className="ro-info">
                    <p className="item-title">{item.ro_name}</p>
                    <p className="item-info">Pending Priority: {nullPriorityCount}</p>
                  </div>
                  <div className='mapCounter'>
                    {loCount}
                  </div>
                  <div onClick={() => toggleDropdown(index)} className='menu-dots-dropdown'>
                    <MenuDots
                      index={index}
                      activeMenuIndex={activeMenuIndex}
                      setActiveMenuIndex={setActiveMenuIndex}
                      onEditClick={() => handleEdit(item)}
                      onDeleteClick={() => handleDeleteClick(item.ro_id)}
                    />
                  </div>
                </div>

                {/* Show LOMapping only for the clicked item */}
                {activeIndex === index && (
                  <div className="lomapping-container">
                    <LOMapping
                      roData={[item]}
                      loItems={loItems}
                      setLoItems={setLoItems}
                      handleLoItems={handleLoItems}
                      acItems={acItems}
                      filters={filters}
                    />
                  </div>
                )}

                {heldRO && heldRO.ro_id === item.ro_id && (
                  <div className="held-popup">
                    <div className='mapLoItem'>{heldRO.ro_name}</div>
                  </div>
                )}

              </li>
            )
          })
        ) : (
          <li className="no-results">
            <img className='no-results' src={noData} alt="No Data" />
          </li>
        )}
      </ul>

      <p className='add' onClick={() => handleVisibility("add")}><HiOutlineDocumentPlus size={30} color="#000" /></p>
      {isVisible === "add" && (
        <div className='modal-background'>
          <div className="modal-overlay">
            <h3>Add New Report Outcome</h3>
            <input
              type="text"
              className="input"
              placeholder="Enter Report Outcome"
              value={newROName}
              onChange={(e) => setNewROName(e.target.value)}
            />
            <div className="buttons">
              <button className="closebtn" onClick={handleCancel}>Close</button>
              <button className="savebtn" onClick={handleAddRO}>Submit</button>
            </div>
          </div>
        </div>
      )}
      {isVisible === "modal" && editROItem && (
        <div className={`modal-background ${isVisible === "modal" ? "show" : ""}`}>
          <div className={`modal-overlay ${isVisible === "modal" ? "show" : ""}`}>
            <h3>Edit Report Outcome</h3>
            <input
              type="text"
              value={newROName}
              onChange={(e) => setNewROName(e.target.value)}
              placeholder="Enter new RO name"
              className='input'
            />
            <div className="buttons">
              <button
                className="closebtn"
                onClick={() => {
                  setIsVisible(null);
                  setEditROItem(null);
                  setNewROName("");
                }}
              >
                Close
              </button>
              <button className="savebtn" onClick={handleUpdateRO}>Update</button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && <div className="success-overlay"><SuccessfulDone /></div>}
      {showFailed && <div className="success-overlay"><Failed /></div>}
      {showDeleted && <div className="success-overlay"><SuccessfulDeleted /></div>}
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

export default ROList;
