import styled from "styled-components";

const Wrapper = styled.header`
    background: teal;
    color : #fff;
    padding : 0 ${100}px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    nav ul{
        list-style: none;
    }

    a.nav-item{
        text-decoration: none;
        color : #fff;
    }

`

export default Wrapper