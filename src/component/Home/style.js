import styled from "styled-components";

const Wrapper = styled.section`
    height : 100vh;    
    display: flex;
    flex-direction: column;
    
    .screen{
        flex : 1;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .b{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .bottom{
        display: flex;
        height: 80px;
        button{
            flex : 1;
            border : none;
            background : #135d5d;
            color : #fff;
            padding : 20px 0;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
            &.active{
                background-color: #21c2ba;
                transform: scaleY(1.1); 
                transform-origin: bottom;
                height: auto;
                 border-top-left-radius: 10px;
                 border-top-right-radius: 10px;
            }
        }
        .tab-icon{
            flex : 1;
            border : none;
            background : #135d5d;
            color : #fff;
            font-weight: bold;
            cursor: pointer;
            &.active{
                background-color: #21c2ba;
               
            }
        }
    }
`

export default Wrapper