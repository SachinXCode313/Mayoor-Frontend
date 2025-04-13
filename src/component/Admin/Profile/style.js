import styled from "styled-components";

const Wrapper = styled.section`
width : 100vw;
height : 100vh;
.header{
    width : 100vw;
    img{
        width : 20px;
        height : auto;
        margin : 20px 0 0 25px;
    }
    h2{
        text-align : center;
        padding : 30px 0 40px 0;
    }
}
.container{
    width : 100vw;
    min-height: calc(100vh - 100px);
    background : white;
    border-radius : 30px;
    h3{
        padding : 15px 0 15px 25px;
    }
    input {
        margin-left : 25px;
        margin-top : 0;
        display : block;
        padding : 10px;
        width : 80%;
        border-radius : 10px;
        border : 1px solid #BEBCBC;
        background :rgb(221, 241, 241);
    }
}
.admin{
    display : flex;
    width : 100vw;
    img{
        heigth : 100px;
        width : 100px;
        border : 2px solid #0D5A56;
        border-radius : 50%;
        margin  : 20px;
    }
    h1{
        margin-top : 60px;
    }
}
`

export default Wrapper