import styled from "styled-components";
const Wrapper = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    
    .screen {
        flex: 1;
        flex-direction: row;
        overflow: auto;
    }

    .b {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px;
    }

    .bottom {
        display: flex;
        height: 80px;
        z-index: 200;
    }

    /* FIX: Corrected selector */
    .tab-icon {
        flex: 1;
        border: none;
        background: #135d5d;
        color: #fff;
        display: flex;
        flex-direction: column;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s ease-in-out; /* Add smooth transition */
        text-decoration: none;
        
        &.active {
            background-color: #21c2ba;
            transform: scaleY(1.1); /* Fix: Keep transform inside active */
            transform-origin: bottom;
            height: auto;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
    }
        img{
        height: 30px;
        width: 30px;

        }

       
`;

export default Wrapper;
