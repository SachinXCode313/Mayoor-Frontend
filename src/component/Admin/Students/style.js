import styled from "styled-components";

const Wrapper = styled.section`
.app {

  background: #12a4a4;
  height: 100vh;
  width : 100%;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

/* Header */
.header {
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

.download-icon {
  position: absolute;
  right: 20px;
}

.icon {
  width: 25px; /* Set width for the icon */
  cursor: pointer;
  margin-left: 0px;
}

.student-list-heading {
  color: #00000096;
  margin-top: -8px;
  margin-bottom: 0px;
  border-color: #12a4a4;
  border: none;
  background-color: #12a4a4;
  text-align: center; /* Center the text */
  width: 100%;
  top: 85px; /* Below the header */
  padding-bottom: 15px;
}
.layout {
  height: 80vh;
}
/* Filters */
.filters {
  display: flex;
  flex-wrap: wrap; /* Allow filters to wrap on smaller screens */
  gap: 8px;
  padding: 13px 13px 16px 20px;
  background: #12a4a4;
}

.filters select {
  padding: 2px 2px; /* Adjusted padding for consistent spacing around the arrow */
  border-radius: 5px;
  border: none;
  cursor: pointer;
  min-width: 90px; /* Set a uniform minimum width for all select elements */
  max-width: 90px;
  background-color: #C6E8F1;
  text-align: center;
}

/* Student List Container */
.st-container {
  min-height: 80vh; /* Ensure the container occupies at least full screen height */
  max-height: 100vh; /* Set a maximum height based on viewport height, accounting for header */
  @media (max-width: 768px) {
    max-height: 80vh; /* Set a maximum height for smaller screens */
  }
  overflow-y: auto; /* Allow scrolling when content exceeds max height */
  margin-right: 10px;
  background: white;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  position: relative;
  width: 100%; /* Ensure full width */
  overflow-x: hidden; /* Hide horizontal scrollbar */
    clip-path: inset(0px 0px -10px 0px); 
}

.student-list {
  margin-top: 20px;
  margin-bottom: 120px;
}

.student-card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
  color: black;
}

.student-card:active {
  transform: scale(0.98);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #f0f0f0;
  transition: 0.2s ease-in-out;
  @media (max-width: 768px) {
    transform: scale(1);}
}
.select-all {
  border: 1px solid #575864;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: black;
  margin-left: auto;
  margin-right: 40px;
}
.namebox {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  margin-left: 10px;
}

.name h5 {
  font-size: 25px;
  margin-bottom: 5px;
}

/* Bottom Navbar */
.bottom-nav {
  display: flex;
  justify-content: space-around;
  background: #127c7c;
  padding: 15px 0;
  color: white;
  font-size: 14px;
  flex-wrap: wrap; /* Allow bottom nav to wrap */
}

/* Responsive Styles */
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

  /* Filters */
 
  /* Teacher List Container */
  
 
  
  /* Responsive Styles */
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
  
@media (max-width: 480px) {
  .namebox {
    width: 40px;
    height: 40px;
  }

  .name h5 {
    font-size: 20px;
  }
}

.stname h5{
  font-weight: 100;
}
  
`

export default Wrapper