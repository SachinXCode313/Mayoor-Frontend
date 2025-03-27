import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import List from "../images/list.png";
import axios from "axios";
import Form_AC from "../Form_AC";
import Assessment from "../Start_Assesment/index.jsx";
import Menu from "../MenuBar/index.jsx";
import MenuDots from "../MenuDots/index.jsx";
import SuccessfulDone from "../Popup_successful";
import Failed from "../Popup_Failed/index.jsx";
import AreYouSure from "../AreYouSure/index.jsx";
import DeleteFailed from "../DeleteFailed/index.jsx";
import DeletedSuccessfully from "../DeletedSuccessfully/index.jsx";
const AC_List = ({
  acItems,
  setAcItems,
  handleAcItems,
  studentsData,
  setIndex,
  onLogout
}) => {
  const [acList, setAcList] = useState([]);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAcList, setFilteredAcList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showDeleted, setshowDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteAcId, setDeleteAcId] = useState(null);
  const [showDeleteFailed, setShowDeleteFailed] = useState(false);
  const [missingMarksCount, setMissingMarksCount] = useState({});
  const handleClick = () => {
    setIndex(1);
  };
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);
  const loadAC = async () => {
    if (
      !userData ||
      !userData.year ||
      !userData.class ||
      !userData.section ||
      !userData.subject ||
      !userData.quarter
    ) {
      console.warn("Missing user data, skipping API call.");
      return;
    }
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria`,
        { headers }
      );
      console.log("Response Data:", response.data);
      const data = response.data;
      setAcList(data);
      setFilteredAcList(data);
      setAcItems(data);
    } catch (error) {
      console.error(
        "Error fetching assessment criteria:",
        error.response?.data || error.message
      );
      setAcList([]);
      setFilteredAcList([]);
      setAcItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadAC();
  }, [userData]);
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);
  useEffect(() => {
    if (showFailed) {
      const timer = setTimeout(() => {
        setShowFailed(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showFailed]);
  useEffect(() => {
    if (showDeleted) {
      const timer = setTimeout(() => {
        setshowDeleted(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showDeleted]);
  useEffect(() => {
    if (showDeleteFailed) {
      const timer = setTimeout(() => {
        setShowDeleteFailed(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showDeleteFailed]);
  useEffect(() => {
    if (!searchQuery) {
      setFilteredAcList(acList);
    } else {
      const filteredData = acList.filter((item) =>
        (item.ac_name || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAcList(filteredData);
    }
  }, [searchQuery, acList]);
  const handleStartAssessment = (item) => {
    if (activeMenuIndex !== null) {
      return;
    }
    setSelectedAssessment(item);
  };
  const handleBackToList = () => {
    setSelectedAssessment(null);
  };
  // Function to show the confirmation modal before deletion
  const handleDeleteClick = (acId) => {
    setDeleteAcId(acId);
    setShowConfirmation(true);
  };
  const handleConfirm = async () => {
    if (!deleteAcId) return;
    setLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria?id=${deleteAcId}`
      );
      const updatedAcItems = acItems.filter((item) => item.acId !== deleteAcId);
      setAcItems(updatedAcItems);
      setFilteredAcList(updatedAcItems);
      setshowDeleted(true);
    } catch (error) {
      setShowDeleteFailed(true);
      console.error(
        "Error deleting Assessment :",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
      setShowConfirmation(false);
      setDeleteAcId(null);
    }
  };
  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };
  // The missingMarksChange function to handle missing marks update
  const onMissingMarksChange = (ac_id, count) => {
    setMissingMarksCount((prev) => ({
      ...prev,
      [ac_id]: count,
    }));
  };
  if (selectedAssessment) {
    return (
      <Assessment
        selectedAssessment={selectedAssessment}
        onBack={handleBackToList}
        studentsData={studentsData}
        onMissingMarksChange={onMissingMarksChange}  // Pass the function here
      />
    );
  }
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
          placeholder="Search AC..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <ul className="ac-list">
        {loading ? (
          <li>
            {/* <div class="circular"></div> */}
            <p className="loading-message">Loading....</p>
          </li>
        ) : filteredAcList.length > 0 ? (
          filteredAcList.map((item, index) => (
            <li
              key={item.ac_id}
              className="ac-list-item"
              onClick={() => handleStartAssessment(item)}
            >
              <div className="ac-header">
                <div className="list-icon-containers">
                  <img src={List} alt="" className="list-icons" />
                </div>
                <div className="ac-info">
                  <p className="item-title">{item.ac_name}</p>
                </div>
                {/* <div className="mapCounter">
                  {missingMarksCount[item.ac_id] ?? 0}
                </div> */}
                <div>
                  <MenuDots
                    index={index}
                    activeMenuIndex={activeMenuIndex}
                    setActiveMenuIndex={setActiveMenuIndex}
                    onEditClick={() => handleEdit(item)}
                    onDeleteClick={() => handleDeleteClick(item.ac_id)}
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="no-results">
            No Results Found
          </li>
        )}
      </ul>
      <div
        className="add"
        onClick={() => {
          setEditItem(null); // Reset editItem
          setShowForm(true);
        }}
      >
        <span className="plus">+</span>
      </div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_AC
              closeForm={() => {
                setShowForm(false);
                setShowSuccess(true);
              }}
              closeForm2={() => {
                setShowForm(false);
                setShowFailed(true);
              }}
              closeFormOnly={() => setShowForm(false)}
              loadAC={loadAC}
              setShowSuccess={setShowSuccess}
              setShowFailed={setShowFailed}
              editItem={editItem}
              setEditItem={setEditItem}
            />
          </div>
        </div>
      )}
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
      {showDeleted && (
        <div className="success-overlay">
          <DeletedSuccessfully />
        </div>
      )}
      {showConfirmation && (
        <div className="success-overlay">
          <AreYouSure
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirmation(false)}
          />
        </div>
      )}
      {showDeleteFailed && (
        <div className="success-overlay">
          <DeleteFailed />
        </div>
      )}
    </Wrapper>
  );
};
export default AC_List