import styled from "styled-components";
const Wrapper = styled.section`
/* Container for the RO list */
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .ac-list-container {
    width: 100%;
    /* max-width: 400px; */
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow-y: scroll;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    // height: auto;
    overflow-y: auto; /* Add vertical scroll bar when content exceeds height */
    overflow-x: hidden; /* Prevent horizontal scrolling */
    scrollbar-width: thin; /* For Firefox - thin scrollbar */
    scrollbar-color: #ccc transparent;
  }
  /* Header section of the RO list */
  .ac-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 16px;
    cursor: pointer;
  }
  .name{
  font-weight: 35px;
  font-size: 16px;
  }
  /* LO list container */
  .ac-list {
    background-color: white;
    padding: 16px;
  }
  /* Individual LO item */
  .ac-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding: 10px;
    color:rgb(26, 49, 46);
    box-shadow: 0px 4px 8px rgba(138, 135, 135, 0.2);
  }
  /* Priority buttons container */
  .priority-buttons {
    display: flex;
    gap: 4px;
  }
  /* Priority button styles */
  .priority-button {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .priority-button.h {
    background-color: rgb(103, 150, 99);
    color: white;
  }
  .priority-button.m {
    background-color: rgb(240, 240, 78);
    color: black;
  }
  .priority-button.l {
    background-color: rgb(209, 89, 89);
    color: white;
  }
  /* Unselected state for priority buttons */
  .priority-button:not(.h):not(.m):not(.l) {
    background-color: white;
    color: black;
  }
  .btns{
    margin : auto;
  }
  .btn{
    width: 100px;
    padding: 10px;
    background-color: #21c2ba;
    color: white;
    border-color: white;
    border-radius: 10px;
    border: none;
    font-weight: bold;
  }
  .addBtn{
    margin-right: 20px;
    width: 100px;
    padding: 10px;
    background-color: grey;
    color: white;
    border-color: white;
    border-radius: 10px;
    border: none;
    font-weight: bold;
  }
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Dim background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
// .popup-content {
//   background: white;
//   padding: 20px;
//   border-radius: 10px;
//   width: 400px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   animation: popup 0.3s ease-in-out;
// }
@keyframes popup {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.form-container button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
`
export default Wrapper  