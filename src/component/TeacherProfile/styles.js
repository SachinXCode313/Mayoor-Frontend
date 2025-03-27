import styled from "styled-components";

const Wrapper = styled.section`
    margin: 0;
    padding: 0;
    background-color: #21c2ba;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
    overflow: hidden;

  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btn{
    background-color: #21c2ba;
    border: 0;
    font-size: 30px;
  }

  #notificationBtn{
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: white;
    margin-right: 5px;
  }

  #logoutBtn{
    border-radius: 50%;
    width: 40px;
    height: 38px;
    background-color: white;
  }

  #pencilIcon{
    margin-left: 5px;
    margin-top: 3px;
  }

  .header {
    width: 90%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    font-size: 40px;
    height: 10%;
  }

  h1 {
    font-size: 40px;
    text-align: center;
    flex: 1;
    margin-top: 180px;
    margin-right: -50px;
  }

  .profile-section {
    background-color: white;
    position: absolute;
    top: 200px;
    width: 100%;
    height: 60%; 
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar-container {
    display: flex;
    align-items: center;
    margin: 50px; 
    margin-bottom: 20px;
    gap: 30px;
  }

  .username{
    margin-bottom: 3px;
  }

  .userId{
    margin-top: 0px;
  }

  #teacher-img {
    border-radius: 50%;
    height: 80px;
    width: 80px;
  }

  .user-details {
    font-size: 4vw;
  }

  .form-container {
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 3vw;
  }

  .form-criteria {
    font-size: 20px;
    margin-bottom: 0px;
  }

  .form-input {
    height: 40px;
    border-radius: 30px;
    background-color: #89D1DC4F;
    font-size: 20px;
    padding-left: 20px;
    border: 2px solid #BEBCBC63;
  }

  #save-button {
    height: 40px;
    width: 50%;
    font-size: 19px;
    margin-top: 20px;
    background-color: #409FFF;
    border-radius: 10px;
    margin-left: 50%;
    color: white;
    border: 2px solid #BEBCBC63;
  }

  .avatar-container {
    display: flex;
    align-items: left;
    margin-left: -60px;
  }

  .avatar {
    width: 100px;
    height: 100px;
    background-color: #21c2ba;
    color: black;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 95px;
    border-radius: 50%;
  }

  .avatar-text {
    display: inline-block;
    vertical-align: middle;
  }
`;

// const styleElement = document.createElement('style');
// styleElement.innerHTML = styleSheet;
// document.head.appendChild(styleElement);
export default Wrapper