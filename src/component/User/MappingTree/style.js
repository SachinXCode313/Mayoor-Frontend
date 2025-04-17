import styled from "styled-components";

const Wrapper = styled.div`
  .header {
    height: 65px;
    align-items: center;
    background-color: #21c2ba;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0px;
  }

  .title{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #00000096;
        font-size: medium;
      }

  .icon {
align-self: self-start;
    width: 30px;
    margin-left: 20px;
  }
`;

export default Wrapper;