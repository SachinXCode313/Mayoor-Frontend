import styled from "styled-components";

const Wrapper = styled.section`
.cover {
    position: relative;
    width: 100%;
    height: 100vh;
    margin : 10px;
}
.menu{
    margin : 20px 10px;
    width : 25px;
}    
.blur-overlay{
    position : fixed;
    top : 0;
    left : 0;
    width : 100vw;
    height : 100vh;
    backdrop-filter : blur(8px);
    background : rgba(2, 2, 2, 0.77);
    z-index : 0;
}
.humburger{
    background-color : white;    
    width: 340px;
    height: 150px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    border-radius: 50%;
    display: flex;
    flex-direction: column; 
    align-items: center;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-45deg) translate(-17%, -45%);
    position: relative;
    z-index : 1;
    img { 
        transform : rotate(45deg)

    }
}
.paths{
    max-width : 500px;
    margin : 135px;
    display : flex;
    position: absolute;
    justify-content: center;
}
.paths img {
    position: absolute;
    transform: rotate(45deg);
    width : 35px;
    height : 35px;
}
.subjectAdd{
    top : -28px;
    left : 90px;
}
.toturial{
    top: -13px;
    left: 40px;

}
.notification{
    top: -10px;
    left: -15px;
}
.adminAdd{
    top: -13px;
    right: 40px;
}
.teacherList{
    top : -28px;
    right : 90px;
}

`

export default Wrapper