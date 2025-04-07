import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .search-container {
    display: flex;
    gap: 50px;
    align-items: center;
    position: relative;
    background-color: #21c2ba;
    width: 90%;
    margin: 22px 0;
  }
    .info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  text-align: center;
  overflow: hidden;
}
  .search-bar {
    width: 90%;
    padding: 10px 40px 10px 15px;
    font-size: 16px;
    border-radius: 25px;
    border: 1px solid #ddd;
    background-color: #A6E0DD;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    margin-left: -60px;
  }
  .search-bar:focus {
    border-color: #00796B;
    box-shadow: 0 2px 4px rgba(0, 121, 107, 0.2);
    background-color: white;
  }
  .search-bar::placeholder {
    color: #aaa;
  }
  .back-button {
    background-color: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
    color: #000000;
    margin-right: 15px;
    margin-left: 3px;
    margin-right: 30px;
  }
  .profile-section {
    text-align: center;
    width: 100%;
    height: 180px;
    background-color: #21c2ba;
    box-shadow: 0px 4px 6px rgba(244, 240, 240, 0.1);
    align-items: center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid #FFFFFF;
  }
  .name {
  font-family: sans-serif;
  color: white;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: ltr;
}
  .max-marks {
    font-size: 14px;
    color: white;
  }
  .ac-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: calc(100vh - 200px);
    max-width: 100%;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    background-color: white;
    margin-top: -44px;
  }
  .ac-container::-webkit-scrollbar {
    display: none;
  }
  .student-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
    .student-avatar {
    width: 50px;
    height: 50px;
    background-color: #20B2AA;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
  .ac-box {
    width: 85%;
    height: 60px;
    color: #6C6C6C;
    background-color: #FFFFFF;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 3px 4px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    margin: 10px 0px 10px 0px;
    padding: 15px
  }
  .detail{
     display: flex;
     flex-direction: column;
     gap: 2px;
  }
  .marks-input {
    width: 100px;
    padding: 5px;
    font-size: 13px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-left: 10px;
    text-align: center;
    margin-top: 5px;
  }
  .done-button {
  background-color:  #21C2BA;
  font-size: 1px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  position: fixed;
  bottom: 90px;
  left: 75%;
  }
  .success-overlay {
    position: fixed; /* Ensures full-page coverage */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Keeps it on top */
  }
`
export default Wrapper