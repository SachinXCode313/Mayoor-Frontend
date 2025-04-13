import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import axios from "axios";
import SuccessfulDone from "../SuccessfulDone";
import Failed from "../Failed";

const LOMapping = ({ loItems, roData, filters }) => {
  const REACT_APP_API_URL = "https://mayoor-server.vercel.app";

  const [priorityMapping, setPriorityMapping] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  console.log("roData:", roData);

  const filteredRoData = roData;

  useEffect(() => {
    if (filteredRoData) {
      const initialMapping = {};
      filteredRoData.flatMap(ro => ro.learning_outcomes).forEach(lo => {
        if (lo.priority !== null) {
          initialMapping[lo.lo_id] = lo.priority.toLowerCase();
        }
      });
      setPriorityMapping(initialMapping);
    }
  }, [roData]);

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

  const handleClick = (loid, priority) => {
    setPriorityMapping(prev => ({
      ...prev,
      [loid]: prev[loid] === priority.toLowerCase() ? "" : priority.toLowerCase(),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formattedData = {
      data: Object.entries(priorityMapping)
        .filter(([_, priority]) => priority)
        .map(([lo_id, priority]) => ({
          lo_id: Number(lo_id),
          priority: priority.toLowerCase(),
        })),
    };

    if (formattedData.data.length === 0) {
      alert("No priorities selected.");
      setLoading(false);
      return;
    }

    const roId = roData[0]?.ro_id;
    const headers = {
      "Content-Type": "application/json",
      year: filters?.year,
      classname: filters?.classname,
      section: filters?.section,
      subject: filters?.subject,
      quarter: filters?.quarter,
    };

    try {
      const response = await axios.put(
        `${REACT_APP_API_URL}/api/report-outcome-mapping?ro_id=${roId}`,
        formattedData,
        {
          headers,
          timeout: 60000,
        }
      );
      setShowSuccess(true);
      console.log("Priorities updated:", response.data);
    } catch (error) {
      setShowFailed(true);
      console.error("Error updating priorities:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log("FilteredRoData: ", filteredRoData);
console.log("Priority Mapping: ", priorityMapping);


  return (
    <Wrapper>
      <div className="lo-list-container">
        <div className="lo-list">
          {filteredRoData?.flatMap(ro => ro.learning_outcomes)?.map(lo => {
            if (!lo?.lo_id) return null;
            const selectedPriority = priorityMapping[lo.lo_id] || "";
            return (
              <div key={lo.lo_id} className="lo-item">
                <div>
                  <span className="name">{lo.lo_name}</span>
                </div>
                <div className="priority-buttons">
                  <button
                    className={`priority-button ${selectedPriority === "h" ? "h" : ""}`}
                    onClick={() => handleClick(lo.lo_id, "H")}
                  >
                    H
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "m" ? "m" : ""}`}
                    onClick={() => handleClick(lo.lo_id, "M")}
                  >
                    M
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "l" ? "l" : ""}`}
                    onClick={() => handleClick(lo.lo_id, "L")}
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

export default LOMapping;
