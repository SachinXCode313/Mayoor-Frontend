import styled from "styled-components";

const Wrapper = styled.div`
  .class-header {
    height: 110px;
    align-items: center;
    color: white;
    background-color: #21c2ba;
    display: flex;
    flex-direction: row;
    gap: 60px;
  }

  .icon {
    width: 30px;
    margin-left: 20px;
  }

  .class-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-top: -20px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    overflow: hidden;
    background-color: white;
  }

  .info-box {
    width: 85%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-radius: 22px;
    margin-top: 18px;
    border: 1px solid #e0d8cc;
    background: linear-gradient(white, white) padding-box,
      linear-gradient(120deg, #f7f3e9, #fffdf5) border-box;
    color: #444;
    font-size: 14px;
    line-height: 1.5;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .info-text {
    width: 100%;
    text-align: left;
  }

  .chart-dropdown {
    width: 90%;
    margin: 20px 20px 20px 15px ;
    padding: 6px 10px 6px 10px;
    border: 2px solid rgba(33, 194, 186, 0.7);
    border-radius: 8px;
    background-color: rgba(117, 210, 234, 0.2);
    color: #444;
    font-size: 14px;
    transition: background-color 4s ease-in-out, border-color 0.8s ease-in-out;
    box-sizing: border-box;
    text-align: center;
     text-align-last: center; 
    appearance: none;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
   

  .chart-dropdown option {
    background-color: white; /* Ensure options start with white */
    color: #444;
    padding: 6px 10px;
     text-align-last: center; 
  }


  .chart-dropdown:focus,
  .chart-dropdown:active,
  .chart-dropdown:focus-visible {
    background-color: rgba(117, 210, 234, 0.2) !important;
    color: #444 !important;
    outline: none;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.19);
  }



.chart-wrapper {
  
  width: 94%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 10px;
  white-space: nowrap; /* Prevent chart wrapping */
  -webkit-overflow-scrolling: touch; /* Enable smooth scrolling on mobile */
}

.chart-wrapper::-webkit-scrollbar {
  display: none;
}

.chart-container {
  width: 1200px; /* Ensure width is more than the parent to enable scroll */
}

.y-axis-labels {
    min-width: 50px;
    text-align: right;
    padding-right: 10px;
    padding-top:22px;
    background-color: white;
    height: 240px;
    z-index: 10;
    position: fixed;
    
}

.y-axis-label {
    font-size: 12px;
    height: 36px;
    font-weight: normal;
    color: #434343;

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



`;

export default Wrapper;