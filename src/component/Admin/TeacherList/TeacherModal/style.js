import styled from "styled-components";

const Wrapper = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    font-size: 16px;
    height: 350px;
    color: black;
    width: 280px;
    background: white;
    padding: 18px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: left;
  }

  .modal-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .modal-content h2 {
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 15px;
  }

  .modal-content p {
    margin-bottom: 18px;
  }
`;

export default Wrapper