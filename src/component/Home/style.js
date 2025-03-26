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
                background-color: #21c3bc;
                transform: scale(1.1); 
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
                background-color: #21c3bc;
            }
        }
    }
`

export default Wrapper