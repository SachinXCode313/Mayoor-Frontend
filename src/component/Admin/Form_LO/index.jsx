import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Wrapper from "./style";

const Form_LO = ({ closeForm, loadLO, closeFormOnly, setShowSuccess, setShowFailed, editItem, filters }) => {

  const { year, subject, quarter, classname } = filters || {};
  console.log("Received Filters:", filters);

  const REACT_APP_API_URL = "https://mayoor-server.vercel.app"; // Use a single defined API URL

  const [loInput, setLoInput] = useState("");
  const [filteredRoList, setFilteredRoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedRoIds, setSelectedRoIds] = useState([]);
  const [loName, setLoName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successTimeout = useRef(null);
  const isSubmittingRef = useRef(false);
  const [roItems, setRoItems] = useState([]);

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
        console.log("Parsed UserData:", parsedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    } else {
      console.warn("No userData found in sessionStorage"); 
    }
  }, []);

  useEffect(() => {
    if (editItem) {
      setLoName(editItem.lo_name || "");
      setLoInput(editItem.lo_name || "");
      if (Array.isArray(editItem.report_outcomes)) {
        const roIds = editItem.report_outcomes.map((ro) => ro.ro_id);
        console.log("Extracted RO IDs:", roIds);
        setSelectedRoIds(roIds);
      } else {
        console.warn("editItem.report_outcomes is not an array or is missing:", editItem.report_outcomes);
        setSelectedRoIds([]);
      }
    } else {
      setLoName("");
      setLoInput("");
      setSelectedRoIds([]);
    }
  }, [editItem]);

  useEffect(() => {
      if (!year || !subject || !quarter || !classname) {
        setRoItems([]);
        setFilteredRoList([]);
        return;
      }
  
      const loadRO = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${REACT_APP_API_URL}/api/report-outcome`, {
            headers: {
              // Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with actual token
              'Content-Type': 'application/json',
              year,
              classname,
              subject,
              quarter,
            }          });
  
          if (response.data.length === 0) {
            setRoItems([]);
            setFilteredRoList([]);
          } else {
            setRoItems(response.data);
            setFilteredRoList(response.data);
          }
        } catch (error) {
          setRoItems([]);
          setFilteredRoList([]);
        } finally {
          setLoading(false);
        }
      };
  
      loadRO();
    }, [year, subject, quarter, classname]);

  useEffect(() => {
    setFilteredRoList(roItems);
  }, [roItems]);

  const handleCheckboxChange = (ro_id) => {
    setSelectedRoIds((prevSelected) =>
      prevSelected.includes(ro_id) ? prevSelected.filter((id) => id !== ro_id) : [...prevSelected, ro_id]
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
  
    if (!loInput.trim()) {
      alert("Please enter a valid Learning Outcome!");
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }
  
    if (selectedRoIds.length === 0) {
      alert("Please select at least one Report Outcome!");
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }
  

    const headers = {
      // Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with actual token
      "Content-Type": "application/json",
      year,
      quarter,
      classname: classname, // Note: your backend expects it as "class", not "classname"
      subject,
    };
  
    const body = {
      name: loInput,
      ro_id: selectedRoIds,
      // year,
      // classname,
      // subject,
      // quarter,
    };
  
    try {
      let response;
      if (editItem) {
        response = await axios.put(
          `${REACT_APP_API_URL}/api/learning-outcome?id=${editItem.lo_id}`,
          body,
          { headers }
        );
      } else {
        response = await axios.post(
          `${REACT_APP_API_URL}/api/learning-outcome`,
          body,
          { headers }
        );
      }
  
      if ([200, 201].includes(response.status)) {
        setLoName("");
        setSelectedRoIds([]);
        loadLO();
        closeForm();
  
        successTimeout.current = setTimeout(() => {
          setShowSuccess(true);
          successTimeout.current = setTimeout(() => setShowSuccess(false), 2000);
        }, 500);
      }
    } catch (error) {
      console.error("Error saving LO:", error.response?.data || error.message);
      setShowFailed(true);
      setTimeout(() => setShowFailed(false), 2000);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="form-box">
        <p className="header">{editItem ? "Edit Learning Outcome" : "Add Learning Outcome"}</p>
        <input
          type="text"
          placeholder="Enter Learning Outcome"
          className="input"
          value={loInput}
          onChange={(e) => setLoInput(e.target.value)}
        />
        <ul className="ro-list">
          {loading ? (
            <li><p className="loading-message">Loading...</p></li>
          ) : filteredRoList.length ? (
            filteredRoList.map((item) => (
              <li key={item.ro_id} className="ro-list-item">
                <div className="ro-info">
                  <input type="checkbox" checked={selectedRoIds.includes(item.ro_id)} onChange={() => handleCheckboxChange(item.ro_id)} />
                  <p className="para">{item.ro_name}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="no-results"><p className="no_results">No Report Outcomes Found</p></li>
          )}
        </ul>
        <div className="buttons">
          <input type="button" value="Close" onClick={closeFormOnly} className="closebtn" />
          <button onClick={handleSubmit} disabled={isSubmitting} className="savebtn">{isSubmitting ? "Submitting..." : "Submit"}</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Form_LO;