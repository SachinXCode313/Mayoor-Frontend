import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Wrapper from "./style";
const Form_AC = ({closeForm, loadAC, closeFormOnly, setShowSuccess, setShowFailed, editItem }) => {
  const [acName, setAcName] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [userData, setUserData] = useState(null);
  const [filteredLoList, setFilteredLoList] = useState([]);
  const [selectedLoIds, setSelectedLoIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addAssess, setAddAssess] = useState(true);
  const successTimeout = useRef(null);
  useEffect(() => {
    return () => {
      if (successTimeout.current) {
        clearTimeout(successTimeout.current);
      }
    };
  }, []);
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        if (parsedUserData?.year && parsedUserData?.class) {
          loadLO(parsedUserData);
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);
  useEffect(() => {
    if (editItem) {
      console.log("Editing AC, selected LO IDs:", editItem)
      console.log("Editing AC, selected LO IDs:", editItem.learning_outcomes)
        setAcName(editItem.ac_name || "");
        setMaxMarks(editItem.max_marks ? String(editItem.max_marks) : "");
        if (Array.isArray(editItem.learning_outcomes)) {
          const loIds = editItem.learning_outcomes.map((lo) => lo.lo_id);
          console.log("Extracted LO IDs:", loIds); // Debugging output
          setSelectedLoIds(loIds);
        } else {
          console.warn("editItem.learning_outcomes is not an array:", editItem.learning_outcomes);
          setSelectedLoIds([]);  // Reset if invalid
        }
    } else {
        // Reset fields when adding a new AC
        setAcName("");
        setMaxMarks("");
        setSelectedLoIds([]);
    }
}, [editItem]);
  const loadLO = async (userData) => {
    setLoading(true);
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/learning-outcome`, { headers });
      setFilteredLoList(response.data);
    } catch (error) {
      console.error("Error fetching report outcomes:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCheckboxChange = (lo_id) => {
    setSelectedLoIds((prevSelected) =>
      prevSelected.includes(lo_id)
        ? prevSelected.filter((id) => id !== lo_id)
        : [...prevSelected, lo_id]
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    console.log("Submitting form..."); // Debugging output
    setIsSubmitting(true);


    if (!acName.trim() || !maxMarks) {
        alert("Please fill in all fields.");
        setIsSubmitting(false);
        return;
    }

    if (!userData?.year || !userData?.class || !userData?.section || !userData?.subject || !userData?.quarter) {
        alert("Missing user details. Ensure all fields are filled in.");
        setIsSubmitting(false);
        return;
    }

    if (selectedLoIds.length === 0) {
      
       alert ("Please select at least one Learning Outcome.");
        setIsSubmitting(false);
        return;
    }

    const headers = {
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
        "Content-Type": "application/json",
        year: userData.year,
        classname: userData.class,
        section: userData.section,
        subject: userData.subject,
        quarter: userData.quarter,
    };

    const body = {
        name: acName.trim(),
        max_marks: parseInt(maxMarks, 10),
        lo_id: selectedLoIds,
    };

    try {
        let response;
        if (editItem) {
            console.log("Updating existing AC...");
            response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/assessment-criteria?id=${editItem.ac_id}`,
                body,
                { headers }
            );
        } else {
            console.log("Creating new AC...");
            response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/assessment-criteria`,
                body,
                { headers }
            );
        }

        console.log("Response status:", response.status);

        if (response.status === 200 || response.status === 201) {
            setAcName("");
            setMaxMarks("");
            setSelectedLoIds([]);
            loadAC();
            closeForm();

            successTimeout.current = setTimeout(() => {
                setShowSuccess(true);
                successTimeout.current = setTimeout(() => setShowSuccess(false), 2000);
            }, 500);
        }
    } catch (error) {
        console.error("Error saving AC:", error.response?.data || error.message);
        setShowFailed(true);
        setTimeout(() => setShowFailed(false), 2000);
    } finally {
        // setIsSubmitting(false);
    }
};

  return (
    <Wrapper>
      <div className="form-box">
        {/* <h2>{editItem ? "Edit Assessment" : "Add Assessment"}</h2> */}
        <div className="toggle-buttons">
          <input
            type="button"
            value="Add Assessment"
            className={addAssess ? "active" : ""}
            onClick={() => setAddAssess(true)}
          />
          <input
            type="button"
            value="Final Assessment"
            className={!addAssess ? "active" : ""}
            onClick={() => setAddAssess(false)}
          />
        </div>
        <form>
          <input
            type="text"
            placeholder="Enter Assessment Criteria"
            value={acName}
            onChange={(e) => setAcName(e.target.value)}
          />
          <input
            type="text" // Change to "text" to prevent scientific notation issues
            placeholder="Enter Maximum Marks"
            value={maxMarks}
            onChange={(e) => {
              let value = e.target.value;
              value = value.replace(/\D/g, "");

              if (value.startsWith("0")) {
                value = value.replace(/^0+/, "");
              }

              setMaxMarks(value);
            }}
            onBlur={() => {
              if (!maxMarks) setMaxMarks("");
            }}
          />


          <ul className="lo-list">
            {loading ? (
              <li>
                <p className="loading-message">Loading...</p>
              </li>
            ) : filteredLoList.length > 0 ? (
              filteredLoList.map((item) => (
                <li key={item.lo_id} className="lo-list-item">
                  <div className="lo-header">
                  <div className="lo-info" onClick={() => handleCheckboxChange(item.lo_id)}>
                  <input
                    type="checkbox"
                    checked={selectedLoIds.includes(item.lo_id)}
                    onChange={() => handleCheckboxChange(item.lo_id)}
                    onClick={(e) => e.stopPropagation()} // Prevent double toggle when clicking checkbox
                  />
                  <p>{item.lo_name}</p>
                  </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-results">
                <p className="no_results">No Learning Outcomes Found</p>
              </li>
            )}
          </ul>
          <div className="buttons">
            <input
              type="button"
              value="Close"
              onClick={() => {
                clearTimeout(successTimeout.current);
                setShowSuccess(false);
                closeFormOnly();
              }}
              className="closebtn"
            />
            <button
              type="button"
              className="savebtn"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : editItem ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};
export default Form_AC;