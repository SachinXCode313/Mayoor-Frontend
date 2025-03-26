import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Form_AC from "../Form_AC/index";
import axios from "axios";
import SuccessfulDone from "../Popup_successful"; // Import the success message component
import Failed from "../Popup_Failed/index.jsx";
const ACMapping = ({ loId, acList, loData }) => {
  const [priorityMapping, setPriorityMapping] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); // :white_tick: New state for success message
    const [showFailed, setShowFailed] = useState(false)
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
    // Initialize priorityMapping from loData if priority is not null
    if (loData) {
      const initialMapping = {};
      loData.flatMap((lo) => lo.assessment_criterias).forEach((ac) => {
        if (ac.priority !== null) {
          initialMapping[ac.ac_id] = ac.priority.toLowerCase();
        }
      });
      setPriorityMapping(initialMapping);
    }
  }, [loData]);
  useEffect(() => {
      if (showSuccess) {
        const timer = setTimeout(() => {
          setShowSuccess(false);
        }, 1000); // Hide after 2 seconds
        return () => clearTimeout(timer); // Cleanup timer
      }
    }, [showSuccess]);
    useEffect(() => {
      if (showFailed) {
        const timer = setTimeout(() => {
          setShowFailed(false)
        }, 1000)
        return () => clearTimeout(timer)
      }
    }, [showFailed])
  const handleClick = (acid, priority) => {
    setPriorityMapping((prev) => ({
      ...prev,
      [acid]: prev[acid] === priority.toLowerCase() ? "" : priority.toLowerCase(),
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    const formattedData = {
      data: Object.entries(priorityMapping)
        .filter(([_, priority]) => priority)
        .map(([ac_id, priority]) => ({
          ac_id: Number(ac_id),
          priority: priority.toLowerCase(),
        })),
    };
    if (formattedData.data.length === 0) {
      alert("No priorities selected.");
      setLoading(false);
      return;
    }
    console.log("Formatted Data being sent:", JSON.stringify(formattedData, null, 2));
    const headers = {
      Authorization: `Bearer ${userData?.token}`,
      "Content-Type": "application/json",
      year: userData?.year,
      classname: userData?.class,
      section: userData?.section,
      subject: userData?.subject,
      quarter: userData?.quarter,
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/learning-outcome-mapping?lo_id=${loId}`,
        formattedData,
        { headers }
      );
      console.log("Priorities updated:", response.data);
     setShowSuccess(true)
    } catch (error) {
      console.error("Error updating priorities:", error.response?.data || error.message);
      setShowFailed(true)
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <div className="ac-list-container">
        <div className="ac-list">
          {loData.flatMap((lo) => lo.assessment_criterias).map((ac) => {
            const selectedPriority = priorityMapping[ac.ac_id] || "";
            return (
              <div key={ac.ac_id} className="ac-item">
                <div>
                  <span className="name">{ac.ac_name}</span>
                </div>
                <div className="priority-buttons">
                  <button
                    className={`priority-button ${selectedPriority === "h" ? "h" : ""}`}
                    onClick={() => handleClick(ac.ac_id, "H")}
                  >
                    H
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "m" ? "m" : ""}`}
                    onClick={() => handleClick(ac.ac_id, "M")}
                  >
                    M
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "l" ? "l" : ""}`}
                    onClick={() => handleClick(ac.ac_id, "L")}
                  >
                    L
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btns">
          <input
            type="button"
            value={loading ? "Updating..." : "Done"}
            className="btn"
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_AC closeForm={() => setShowForm(false)} />
          </div>
        </div>
      )}
      {showSuccess &&
          <div className="success-overlay">
          <SuccessfulDone />
        </div>
        } {/* :white_tick: Show success message after closing the form */}
        {showFailed &&
          <div className="success-overlay">
          <Failed />
        </div>
        }
    </Wrapper>
  );
};
export default ACMapping;