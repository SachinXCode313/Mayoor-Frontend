import styled from "styled-components";

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;

  .tab-bar {
    width: 100vw;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #12736F;
    padding: 0 10px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .tab {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 5px;
    transition: all 0.3s ease-in-out;
    border-radius: 10px;
  }

  .tab img {
    width: 30px;
    height: 30px;
  }

  .tab span {
    color: white;
    font-size: 10px;
    padding-top: 5px;
    transition: color 0.3s ease-in-out;
  }

  .tab-bar a {
    text-decoration: none;
  }

  .tab.active {
    background-color: #0D5A56;
    border-radius: 8px;
    padding: 8px;
    transform: scale(1.1);
  }

  .tab.active span {
    color: #21C3BC; 
    font-weight: bold;
    text-shadow: 0px 0px 5px rgba(33, 195, 188, 0.6));
  }
`;

export default Wrapper;
