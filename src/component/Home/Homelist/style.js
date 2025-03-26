import styled from "styled-components";
import peacock from "./peacock.png"
const Wrapper = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #21C2BA;
    font-family: Poppins;

    .options{
        display : flex;
        gap : 10px;
        width : 100%;
        flex-wrap: wrap;
        .option{
            flex : 1;
            background :rgb(0, 134, 128);
            color : #FFFFFF;
            padding : 21px 30px;
            border-radius: 5px;
            font-size: 1.1rem;
            text-align: center;
            opacity : 0.7;
            &.active{
                opacity: 1;
                box-shadow: 2px 2px 2px #ccc;
            }
        }
    }

    .subjects{
        flex-wrap : nowrap;
        overflow-x: auto;
        .option{
            padding : 21px 20px;
            width : 80px;
            flex : auto;
            white-space: nowrap;
        }
    }

    .subjects .react-ripples{
        min-width: 170px;
    }

    .class {
        flex-wrap : nowrap;
        overflow-x : auto;
    }

    .class .react-ripples{
        min-width : 80px;
    }

    .quarter {
        flex-wrap : nowrap;
        overflow-x : auto;
    }

    .quarter .react-ripples {
        min-width : 100px;
    }

    #user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 40px 20px 50px 20px;
        font-size: 17px;
        color: black;
        background: no-repeat 150% center;
        background-image: linear-gradient( rgba(33,194, 186, 0.7),rgba(33,194, 186, 0.7) ), url(${peacock});
        background-size: auto 130%;
    }

    #user-content {
        display: flex;
        flex-direction: column;
    }

    #hi{
    font-size: 22px;
    font-weight: bold;
    }
    
    #image {
        display: flex;
        gap: 15px;
        align-items: center;
        margin-left: auto;
    }
    #profile{
        height: 30px;
        width: 30px;
        margin-top: -70px;
    }
    #notification{
        height: 30px;
        width: 30px;
        margin-top: -70px;
    }
    #menu{
    height: 47px;
    width: 40px;
    margin-top: -70px;
    }

    #name {
        font-size: 33px;
        font-weight: bold;
        margin-top: 6px;
    }
    p {
        font-size: 15px;
        margin-top: 5px;
    }
    form {
        background-color: #FFFFF0;
        border-radius: 30px 30px 0 0;
        padding: 42px 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        flex : 1;
        max-width: 500px;
        margin: auto;
        width: 100%;
        box-sizing: border-box;
        label{
            display: block;
            padding : 20px 0 10px 0;
        }
    }
    select {
        appearance: none; /* Removes default browser styles */
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 90%;
        padding: 10px;
        font-weight: 600;
        border-radius: 50px;
        background-color: #9CD8E7;
        border: none;
        outline: none;
        transition: 0.3s;
        cursor: pointer;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 14px;
    }
    select:hover {
        background-color: rgba(179, 228, 244, 0.9);
    }
    select:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
    label {
        font-weight: bold;
        font-size: 18px;
    }
    
    .started {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 10px;
    }

    .get-started{
        background : #21C2BA;
        color : #000;
        font-size: 20px;
        padding : 15px 30px;
        border-radius: 5px;
        border : none;
        margin-top : 30px;
        width: auto;
        font-weight : bold;
        border-bottom : solid 3px #00a098;
    }
`

export default Wrapper;