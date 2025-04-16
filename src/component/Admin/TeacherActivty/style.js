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
.teacher-list {
  margin-top: 20px;
}

.teacher-list h2 {
  color: #333;
  margin-bottom: 10px;
}

.teacher-list table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.teacher-list th,
.teacher-list td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.teacher-list th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: red;
  font-weight: bold;
}

.teacher-list tr:hover {
  background-color: #f5f5f5;
}

.teacher-list p {
  color: #666;
  font-style: italic;
}
`

export default Wrapper