import styled from "styled-components";
const Wrapper = styled.section`
.dots-menu-container {
  position: relative;
  display: inline-block;
}

.dots-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.popup-menu {
  position: absolute;
  top: 30px; /* Position below dots */
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: row;
  // min-width: 100px;
  z-index: 10;
  border-radius: 30px;
  gap: 20px;
}
  .pen{
  height: 30px;
  }
  .deletebtn{
  height:30px;
  }

.popup-menu button {
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  font-size: 14px;
}

.popup-menu button:hover {
  background-color: #f2f2f2;
}

.delete-btn {
  color: #e74c3c;
}   
  `
  export default Wrapper