import styled from "styled-components";

const Wrapper = styled.div`
    /* .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .popup-content {
        background-color: white;
        padding: 20px;
        width: 300px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        color : green;


        .icon{
            height: 30px;
            margin: 0%;
            align-content: center;
        }
    } */
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    width : 100%;


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