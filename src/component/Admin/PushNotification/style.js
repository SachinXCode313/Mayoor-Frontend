import styled from "styled-components";

const Wrapper = styled.section`
width : 100vw;
height : 100vh;
.header{
    img{
        width :20px;
        height : auto;
        margin : 20px 0 0 20px;
    }
    h2{
        text-align : center;
        padding : 30px 0 40px 0;
    }
}
.section{
    width : 100vw;
    background : white;
    min-height : 75vh;
    border-radius : 30px;
    h2{
        padding : 30px 0 0 25px;
    }
    input {
        margin-left : 25px;
        display : block;
        padding : 10px;
        width : 80%;
        border-radius : 10px;
        border : 1px solid black;
    }
    textarea {
        margin-left : 25px;
        display : block;
        padding : 10px 0 30px 10px;
        width : 80%;
        border-radius : 10px;
        font-family: "Arial", sans-serif; 
    }

}    
.submit{
    width : 40%;
    margin : 40px auto;
    input { 
        background : #CEEBFD;
        font-weight : bold;
        font-size : 20px; 
    }

}

`

export default Wrapper