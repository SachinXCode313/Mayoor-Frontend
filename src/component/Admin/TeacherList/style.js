import styled from "styled-components";

const Wrapper = styled.section`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.app {
  background: #12a4a4;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}

/* Header */
.header {
  background: #12a4a4;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 25px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 25px;
  font-size: 20px;
  position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.icon {
  width: 25px; /* Set width for the icon */
  cursor: pointer;
}

.teachers-list-heading {
  margin: -1px;
  padding-bottom: 15px;
  border-color: #12a4a4;
  border: none;
  background-color: #12a4a4;
  color: #00000096;
  text-align: center; /* Center the text */
  width: 100%;
  position : fixed;
  z-index : 900;
  top: 85px; /* Below the header */
    left: 0;

}

/* Filters */
.filters {
  display: flex;
  width: 100%; /* Updated width to allow proper display */
  flex-wrap: wrap; /* Allow filters to wrap on smaller screens */
  gap: 10px;
  padding: 13px 13px 13px 20px;
  background: #12a4a4;
  position : fixed;
  z-index: 800;
  top: 130px; /* Below the heading */
    left: 0;

}

.filters select {
  padding: 2px 2px; /* Adjusted padding for consistent spacing around the arrow */
  border-radius: 5px;
  border: none;
  cursor: pointer;
  min-width: 70px; /* Set a uniform minimum width for all select elements */
  max-width: 70px;
  background-color: #C6E8F1;
}

/* Teacher List Container */
.container {
   min-height: 80vh; /* Ensure the container occupies at least full screen height */
   max-height: 100vh; /* Set a maximum height for smaller screens */
  @media (max-width: 768px) {
    max-height: 80vh; /* Set a maximum height for smaller screens */
  }
  overflow-y: auto; /* Allow scrolling when content exceeds max height */
  overflow-x : hidden;
  margin-right: 10px;
  background: white;
  padding: 20px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  position: fixed;
  width: 100%;
  top : 180px;
    clip-path: inset(0px 0px -10px 0px); 
}

.not-assigned {
  background: #F3706C;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  text-align: right;
  position: fixed;
  right: 35px;
  @media (max-width: 768px) {
    right: 20px; /* Set a maximum height for smaller screens */
  }
  top: 195px;
  z-index: 10;
}

.teacher-list {
  margin-top: 20px;
  height: 100%;
  margin-bottom: 120px;
}

.teacher-card {
  border: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between; /* Ensure space between avatar and details */
  align-items: center;
  background: #ffffff;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.164);
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
  color: black;
  width: 100%;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}
.name-class {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.name-class h4{
  font-weight: 100;
}
.details {
  flex: 1; /* Allows details to take available space */
  display: flex;
  flex-direction: column; /* Stacks name and classes vertically */
  align-items: flex-start; /* Aligns items to the start */
  text-align: right; /* Aligns the subject elements to the right */
}

.details h4 {
  font-size: 15px;
  margin-bottom: 5px;
}
.details p{
  font-size: 13px;
}

.subjects span {
  background: #f1f1f1;
  color: black;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 11px;
  margin-right: 5px;
}

/* Non-assigned subjects strip */

/* Add Button */
.add-button {
  position: fixed;
  bottom: 80px;
  right: 40px;
  background: #CEEBFD;
  color: black;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

  .teacher-card {
    align-items: flex-start;
  }

  .add-button {
    position: fixed;
    right: 35px;
    width: 50px;
    height: 50px;
    font-size: 18px;
  }

  .bottom-nav {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .header {
    font-size: 18px;
  }

  .bottom-nav {
    font-size: 12px;
  }
}

/* Active User Indicator Styles */
.active-users {
  margin-left: auto; /* Aligns the active users to the right */
  margin-right: 10px;
  margin-top: -5px; /* Move it slightly up */
  display: flex;
  align-items: center;
}

.active-user {
  width: 30px; /* Set width for the active user icon */
  height: 30px; /* Set height for the active user icon */
  border-radius: 50%; /* Make the icons circular */
  margin-left: -5px; /* Overlap the user icons */
  border: 2px solid white; /* Optional: border for better visibility */
}

/* Active User Button Styles */
.active-user-button {
  background: transparent; /* No background */
  border: none; /* Remove border */
  cursor: pointer; /* Change cursor to pointer */
  padding: 0; /* Remove padding */
}
`
export default Wrapper;
