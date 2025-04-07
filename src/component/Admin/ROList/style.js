import styled from "styled-components";

const Wrapper = styled.section`
.app {
  background: #12a4a4;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

/* Header */
.header {
  background: #12a4a4;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 22px; /* Adjusted padding for consistency */
  font-size: 20px;
  width: auto; /* Ensure header does not take full width */
  margin: 0 auto; /* Center the header */
}

.icon {
  width: 25px; /* Set width for the icon */
  cursor: pointer;
}

.student-list-heading {
  margin: 0; /* Remove margins for better alignment */
  color: black;
  text-align: center; /* Center the text */
}

/* Filters */
.header-filters {
  display: flex;
  flex-wrap: wrap; /* Allow filters to wrap on smaller screens */
  gap: 8px;
  padding: 13px 20px; /* Adjusted padding for filters */
  background: #12a4a4;
}

.header-filters select {
  padding: 2px; /* Adjusted padding for consistent spacing */
  border-radius: 5px;
  border: none;
  cursor: pointer;
  min-width: 90px; /* Set a uniform minimum width for all select elements */
  max-width: 90px;
  background-color: #C6E8F1;
  text-align: center;
}

/* RO List Container */
.ro-list-container {
  min-height: 80vh; /* Ensure the container occupies at least full screen height */
  max-height: 100vh; /* Set a maximum height based on viewport height, accounting for header */
  overflow-y: auto; /* Allow scrolling when content exceeds max height */
  margin-right: 10px;
  background: white;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  position: relative;
  width: 100%; /* Ensure full width */
  overflow-x: hidden; /* Hide horizontal scrollbar */
}

/* RO List */
.ro-list {
  margin-top: 20px;
  margin-bottom: 120px;
}

.ro-list-item {
  border-bottom: 1px solid #575864;
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
  color: black;
}

.ro-list-item:active {
  transform: scale(0.98);
  background-color: #f0f0f0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: 0.2s ease-in-out;
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
`;

export default Wrapper;
