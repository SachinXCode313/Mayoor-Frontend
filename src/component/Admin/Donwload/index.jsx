import React, { useState, useEffect, useRef } from 'react';
import Wrapper from './style';
import { LuDownload } from "react-icons/lu";
import axios from 'axios';

const DownloadChecklist = ({ index }) => {
  const [showChecklist, setShowChecklist] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const checklistRef = useRef(null); // Ref to detect outside click

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (checklistRef.current && !checklistRef.current.contains(event.target)) {
        setShowChecklist(false);
      }
    };

    if (showChecklist) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showChecklist]);

  const reportTypes = [
    { label: "Assessment Criteria", value: "ac" },
    { label: "Learning Outcomes", value: "lo" },
    { label: "Report Outcomes", value: "ro" },
    { label: "Term 1", value: "t1" },
    { label: "Term 2", value: "t2" },
  ];

  const toggleChecklist = () => setShowChecklist(!showChecklist);

  const handleCheckboxChange = (value) => {
    setSelectedItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleDownload = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one file to download.');
      return;
    }

    const headersToSend = {
      "report-type": selectedItems.join(","),
      classname: userData?.class || "",
      section: userData?.section || "",
      year: userData?.year || "",
      subject: userData?.subject || "",
      quarter: userData?.quarter || "",
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/download-report`,
        {
          headers: headersToSend,
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], {
        type:
          response.headers["content-type"] === "application/zip"
            ? "application/zip"
            : "text/csv",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      let filename = "report";
      const quarter = String(userData?.quarter);

      if (selectedItems.length > 1 || response.headers["content-type"] === "application/zip") {
        filename = "report.zip";
      } else {
        const contentDisposition = response.headers["content-disposition"];
        if (contentDisposition && contentDisposition.includes("filename=")) {
          filename = contentDisposition.split("filename=")[1].replace(/"/g, "");
        } else {
          const selected = selectedItems[0];
          const reportTypeToFilename = {
            ac: "assessment_criteria.csv",
            lo: "learning_outcomes.csv",
            ro: "report_outcomes.csv",
            t1: "term1.csv",
            t2: "term2.csv"
          };
          filename = reportTypeToFilename[selected] || "report.csv";
        }
      }

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download report");
    }
  };

  return (
    <Wrapper>
      <div className="download-container">
        <LuDownload onClick={toggleChecklist} size={30} color='#00000096'/>

        {showChecklist && (
          <div className="checklist-popup" ref={checklistRef}>
            {reportTypes.map((item) => {
              const isTerm1 = item.value === "t1";
              const isTerm2 = item.value === "t2";
              let isDisabled = false;
              const quarter = String(userData?.quarter);

              if (isTerm1 || isTerm2) {
                if (quarter === "3") {
                  isDisabled = !isTerm1;
                } else if (quarter === "6") {
                  isDisabled = !isTerm2;
                } else {
                  isDisabled = true;
                }
              }

              return (
                <label key={item.value}>
                  <input
                    className='input-checkbox'
                    type="checkbox"
                    checked={selectedItems.includes(item.value)}
                    onChange={() => handleCheckboxChange(item.value)}
                    disabled={isDisabled}
                  />
                  {' '}{item.label}
                </label>
              );
            })}
            <button className="download-submit-btn" onClick={handleDownload}>
              Download
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default DownloadChecklist;