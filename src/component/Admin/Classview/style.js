import styled from "styled-components";

const Wrapper = styled.div`
.app {

  background: #12a4a4;
  height: 100vh;
  width : 100%;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
  .classview-header {
  align-items: flex-start;
  background: #12a4a4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 25px;
  padding-bottom: 30px;
  padding-left: 22px;
  padding-right: 25px;
  font-size: 20px;
  }
.class-view-heading {
  margin-top: -8px;
  margin-bottom: 0px;
  border-color: #12a4a4;
  border: none;
  background-color: #12a4a4;
  text-align: center; /* Center the text */
    color: #00000096;
  width: 100%;
  top: 85px; /* Below the header */
  padding-bottom: 15px;
}
 .cv-icon {
  width: 25px; /* Set width for the icon */
  cursor: pointer;
  margin-left: 0px;
}


.classview-filters {
  display: flex;
  flex-wrap: wrap; /* Allow filters to wrap on smaller screens */
  gap: 8px;
  padding: 13px 13px 16px 20px;
  background: #12a4a4;
}

.classview-filters select {
  padding: 2px 2px; /* Adjusted padding for consistent spacing around the arrow */
  border-radius: 5px;
  border: none;
  cursor: pointer;
  min-width: 90px; /* Set a uniform minimum width for all select elements */
  max-width: 90px;
  background-color: #C6E8F1;
  text-align: center;
}
  .classview-container{
  display: flex;
  flex-direction: column;
  // justify-content: center;
  height: 100%;
  align-items: center;
  flex: 1;  
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  overflow: hidden;  /* Ensure content respects border radius */
  background-color: white;

  }


  .info-box {
    width: 85%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-radius: 22px; /* Keep a slight curve */
    margin-top: 18px;
    border: 1px solid #E0D8CC; /* Soft cream border */
    background: linear-gradient(white, white) padding-box,
                linear-gradient(120deg, #F7F3E9, #FFFDF5) border-box; /* Softer gradient */
    color: #444;
    font-size: 14px;
    line-height: 1.5;
    text-align: right;
    /* Add shadow for better visibility */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

  .info-text {
    width: 100%;
    text-align: left;
  }


.chart-dropdown {

  width: 100%;
  padding: 6px 0px;
  border: 2px solid rgb(33, 194, 186,0.7);
  border-radius: 8px;
  background-color: rgba(117, 210, 234, 0.2);
  color: #444;
  font-size: 14px;
  transition: background-color 1.0s ease-in-out, border-color 0.5s ease-in-out;
  box-sizing: border-box;
  text-align:center;
  appearance: none;
  cursor: pointer !important;
   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
}

/* Prevents white background & black border when selected */
.chart-dropdown:focus,
.chart-dropdown:active,
.chart-dropdown:focus-visible {
  background-color: rgba(117, 210, 234, 0.2) !important; 
  color: #444 !important; /* Ensures text color stays */
  outline: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.19); /* Optional shadow */
}

.chart-selection {
  margin: 20px 0;
}

.custom-dropdown {
  position: relative;
  width: 150px;
}

.chart-dropdown option {
  background-color: white; /* Keeps dropdown options readable */
  color: black;
}

.percentage p {
  font-size: 11px;
  margin-top: 5px;
}

.chart-wrapper {
  width: 100%; 
overflow-x: auto; /* Enable horizontal scrolling */
overflow-y: hidden; /* Prevent vertical overflow */
padding-bottom: 10px;
}


.chart-container {
  width: 100%; 
  height: 250px;
  // margin: 10px;

}

.metric-cards-container {
    width:90%;
    display: flex;
    justify-content: space-between;
    gap: 30px;
    margin-top: 30px;
  }

  .metric-card {
    width: 100px;
    height: 150px;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }
      


  .metric-value {
    font-size: 24px;
    font-weight: bold;
  }

  .metric-label {
    font-size: 14px;
    margin-top: px;
  }

  .metric-range {
    font-size: 12px;
    margin-top: 10px;
    color: #666;
  }

  .view-button {
    margin-top: 30px;
    padding: 5px 10px;
    background-color:rgba(255, 255, 255);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    color: #444;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .view-button:hover {
    background-color:rgba(33, 194, 186, 0.1);
  }

 .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  position: relative;
}

.close-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  position: relative;
}

.close-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background-color:rgb(111, 110, 110);
  color: white;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-icon:hover {
  background-color: #c0392b;
}

.student-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.student-list li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

  color: white;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-icon:hover {
  background-color:rgb(83, 80, 80);
}

.student-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.student-list li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}


  .header-image {
    width: 24px;
    height: 24px;
  }
  .header-image-menu {
    width: 34px;
    height: 34px;
  }
@media (max-width: 768px) {
  .header {
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .header {
    font-size: 18px;
  }
}

  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .classview-header {
      align-items: flex-start;
    }
  }
  
  @media (max-width: 480px) {
    .classview-header {
      font-size: 18px;
    }
  
  }
  
@media (max-width: 480px) {
  .namebox {
    width: 40px;
    height: 40px;
  }

  .name h5 {
    font-size: 20px;
  }
}
  
`

export default Wrapper


