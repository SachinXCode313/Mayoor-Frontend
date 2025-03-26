import styled from "styled-components";

const Wrapper = styled.div`
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;


.popup {
    position: fixed;
    background: rgba(255, 255, 255, 1);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 300px;
}


.popup-icon {
    font-size: 50px;
    color: #4CAF50;
}

h2 {
    margin: 10px 0;
    font-size: 24px;
    color: #333;
}

p {
    color: #777;
    font-size: 16px;
}

.popup-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 5px;
    font-size: 16px;
}

.popup-btn:hover {
    background-color: #45a049;
}

`

export default Wrapper