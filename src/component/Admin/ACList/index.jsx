import react, { useEffect, useRef, useState } from 'react'
import Wrapper from './style'
import Menu from '../Menu';
import Form_AC from '../Form_Ac';
import SuccessfulDone from '../SuccessfulDone';
import SuccessfulDeleted from '../SuccessfulDeleted';
import AreYouSure from '../AreYouSure';
import DeleteFailed from '../DeleteFailed';
import Failed from '../Failed';
import axios from 'axios';
import MenuDots from '../MenuDots';
import Assessment from '../Assessment';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import Skeleton from 'react-loading-skeleton';
import ReactLoading from 'react-loading'

const ACList = ({ acItems, setAcItems, handleAcItems, studentsData, user, onLogout, filters, setFilters }) => {

  const REACT_APP_API_URL = "https://mayoor-server.vercel.app"

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
  const [heldAC, setHeldAC] = useState(null); // :fire: Track which RO is being held
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const holdTimeoutRef = useRef(null);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      // loadAC(parsedUserData); // Call loadAC immediately after setting userData
    }
  }, [])

  const { year, subject, quarter, classname, section } = filters;

  const loadAC = async () => {
    if (!year || !subject || !quarter || !classname || !section) {
      setAcList([]);
      setFilteredAcList([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/assessment-criteria`, {
        headers: {
          // Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with actual token
          'Content-Type': 'application/json',
          year,
          classname,
          subject,
          quarter,
          section,
        },
      });

      if (response.data.length === 0) {
        setAcItems([]);
        setFilteredAcList([]);
      } else {
        setAcItems(response.data);
        setFilteredAcList(response.data);
      }

      console.log(response.data);
    } catch (error) {
      console.error('Error fetching learning outcomes:', error);
      setAcItems([]);
      setFilteredAcList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAC();
  }, [year, subject, quarter, classname]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess])

  useEffect(() => {
    if (showFailed) {
      const timer = setTimeout(() => {
        setShowFailed(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showFailed])

  useEffect(() => {
    if (showDeleted) {
      const timer = setTimeout(() => {
        setshowDeleted(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showDeleted])

  useEffect(() => {
    if (showDeleteFailed) {
      const timer = setTimeout(() => {
        setShowDeleteFailed(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showDeleteFailed])

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
  }

  const handleBackToList = () => {
    setSelectedAssessment(null);
  };
  // Function to show the confirmation modal before deletion
  const handleDeleteClick = (acId) => {
    setDeleteAcId(acId);
    setShowConfirmation(true);
  }

  const handleConfirm = async () => {
    if (!deleteAcId) return;
    setLoading(true);
    const headers = {

    }
    try {
      const headers = {
        classname,
        section,
        year,
        quarter
      }
      const response = await axios.delete(
        `${REACT_APP_API_URL}/api/assessment-criteria?id=${deleteAcId}`,{headers});
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
  }

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  }

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
        filters={filters}
      />
    );
  }

  const handleTouchStart = (ac, event) => {
    if (!event || !event.currentTarget) return;  // Add safeguard against undefined event
    const targetElement = event.currentTarget.getBoundingClientRect();

    holdTimeoutRef.current = setTimeout(() => {
      setHeldAC(ac);

      const offsetX = 0;
      const offsetY = 0;

      const newPosition = {
        left: Math.min(targetElement.left + offsetX, window.innerWidth - 200),
        top: Math.min(targetElement.bottom + offsetY, window.innerHeight - 200)
      };

      setPopupPosition(newPosition);
    }, 800);
  }

  const handleTouchEnd = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    setHeldAC(null);
  }

  const handleMouseLeave = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    setHeldAC(null);
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  }

  return (
    <Wrapper>
      <div className="search-container">
        <div className="icon">
          <Menu
          />
        </div>
        <input
          type="text"
          placeholder="Search Assessment Criteria..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="ac-list-heading">
        <h2 className='top-heading'>
          Assessment Criteria
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
        <select value={section} onChange={(e) => handleFilterChange('section', e.target.value)}>
          <option value="1">Orchid</option>
          <option value="2">Tulip</option>
          <option value="3">Daffodil</option>
        </select>
      </div>

      <ul className="ac-list">
        {loading ? (
          <li className="loading-message">
            <div>
              <span>Loading...  </span>
              <ReactLoading type="spin" color="#135D5D" height={40} width={40} />
              <Skeleton count={3} />

            </div>
          </li>
        ) : filteredAcList.length > 0 ? (
          filteredAcList.map((item, index) => (
            <li
              key={item.ac_id}
              className="ac-list-item"
              onClick={() => handleStartAssessment(item)}
              onTouchStart={(e) => handleTouchStart(item, e)}  // Pass 'event' here
              onTouchEnd={handleTouchEnd}
            >
              <div className="ac-header">
                <div className="list-icon-containers">
                  {/* <img src={List} alt="" className="list-icons" /> */}
                  <HiOutlineDocumentText size={30} color="#222" />
                </div>
                <div className="ac-info">
                  <p className="item-title">{item.ac_name}</p>
                </div>

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
              {heldAC && (
                <div className="held-popup" style={{ top: popupPosition.top, left: popupPosition.left }}>
                  <div className='mapLoItem'>{heldAC.ac_name}</div>
                </div>
              )}
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
        <span className="plus"><HiOutlineDocumentPlus size={30} color="#000" /></span>
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
              filters={filters}
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
          <SuccessfulDeleted />
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
  )
}

export default ACList