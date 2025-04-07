import styled from "styled-components";
const Wrapper = styled.section`
/* Container for the entire menu */
.menu-container {
  position: relative;
  display: inline-block;
}
/* Hamburger Icon */
.menu-icon {
  width: 35px;
  cursor: pointer;
  z-index: 2000; /* Ensure it stays above */
}
// /* Fullscreen Overlay for Background Blur */
// .overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.3); /* Dark overlay */
//   backdrop-filter: blur(5px); /* Blur effect */
//   z-index: 999;
//   display: none;
// }
/* Show overlay when menu is open */
.overlay.open {
  display: block;
}
/* Sidebar Menu */
.sidebar {
  position: fixed;
  top: 0;
  left: -250px; /* Initially hidden */
  width: 150px;
  height: auto;
  background: #2A9D8F /* Teal color */
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: right 0.4s ease-in-out;
  box-shadow: -3px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9)
  
}
/* When menu is open */
.sidebar.open {
  left: 0; /* Slide into view */
  border-bottom-right-radius: 25px;
}
/* Menu Items */
.sidebar button {
  background: none;
  border: none;
  color: black;
  text-align: left;
  padding: 12px 15px;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease-in-out;
  display: flex;
  align-items: center;
  height: auto;
  font-weight: 500;
}
/* Add icons next to the text */
.sidebar button::before {
  margin-right: 10px;
}
/* Logout Button */
.logout-btn {
  margin-top: auto; /* Push to bottom */
  // background: beige;
  color: white;
  padding: 12px;
  border-radius: 5px;
  // font-weight: bold;
}
`
export default Wrapper