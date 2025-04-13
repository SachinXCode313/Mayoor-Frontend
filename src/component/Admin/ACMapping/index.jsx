import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Form_AC from '../Form_Ac';
import axios from "axios";
import SuccessfulDone from "../SuccessfulDone";
import Failed from "../Failed";

const ACMapping = ({ loId, acList, loData, filters }) => {
  const REACT_APP_API_URL = "https://mayoor-server.vercel.app";

  console.log(`LOId ${loId}`)

  const [priorityMapping, setPriorityMapping] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  useEffect(() => {
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

    const headers = {
      "Content-Type": "application/json",
      year: filters?.year,
      classname: filters?.classname,
      section: filters?.section,
      subject: filters?.subject,
      quarter: filters?.quarter,
    };

    console.log("Sending headers:", headers);

    try {
      const response = await axios.put(
        `${REACT_APP_API_URL}/api/learning-outcome-mapping?lo_id=${loId}`,
        formattedData,
        { headers }
      );
      console.log("Priorities updated:", response.data);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating priorities:", error.response?.data || error.message);
      setShowFailed(true);
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
    </Wrapper>
  );
};

export default ACMapping;
