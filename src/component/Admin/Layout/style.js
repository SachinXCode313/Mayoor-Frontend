import styled from "styled-components";

const Wrapper = styled.section`
height : 100vh;
width : 100vw;
display : flex;
flex-direction : column;

.layout {
    display: flex;
    flex-direction: column;
    height: 100vh; 
  }

.outlet {
    flex-grow: 1; 
    overflow-y: auto;
}
.bottom-tab{
    position : fixed;
    width: 100%;
    height: 60px;
    background: #12736F;
    bottom: 0;
    z-index: 100;
}
`

export default Wrapper