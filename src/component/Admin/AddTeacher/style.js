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

.teachers-add-heading {
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

/* Teacher add Container */
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
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
}
  select {
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

select option {
  white-space: normal;
  word-wrap: break-word;
  overflow-x: hidden;
  display: block;
  max-width: 100%;
    box-sizing: border-box;
}

@media (max-width: 480px) {
  select {
    font-size: 14px;
    padding: 10px;
    max-width: 100%;
    width: 100%;
  }

select option {
    white-space: normal;
    word-wrap: break-word;
    overflow-x: hidden;
    max-width: 300px;
    box-sizing: border-box;
  }
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: -7px;
  display: block;
}

input, select {
  width: 100%;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
}

input:focus, select:focus {
  border-color: #12a4a4;
  box-shadow: 0 0 5px rgba(18, 164, 164, 0.5);
}

button {
  background-color: #12a4a4;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #0f8c8c;
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
`
export default Wrapper;
