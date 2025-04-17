import styled from "styled-components";

const Wrapper = styled.div`
  .download-container {
    position: relative;
    display: inline-block;
  }

  .download-button {
    padding: 5px 10px;
    background: #135d5d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 2px 3px lightgray;
    transition: transform 0.1s ease, box-shadow 0.1s ease;

    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px #0a2f2f;
    }
  }

  .checklist-popup {
    position: absolute;
    top: 45px;
    left: -160px;
    background: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.15); /* subtle 3D shadow */
    z-index: 100;
    width: 180px;
  }

  .checklist-popup h4 {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .checklist-popup label {
    padding: 5px;
    display: block;
    margin: 8px 0;
    font-size: 14px;
    cursor: pointer;
  }
  .input-checkbox {
    accent-color: #135d5d;
  }

  .download-submit-btn {
    margin: 10px 0 0 50px;
    background: #135d5d;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 2px 4px lightgray;
    transition: transform 0.1s ease, box-shadow 0.1s ease;

    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px #0a2f2f;
    }
  }
`;

export default Wrapper;