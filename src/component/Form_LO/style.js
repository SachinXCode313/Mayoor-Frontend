import styled from "styled-components";

const Wrapper = styled.section`
  .form-box {
    width: 300px;
    padding: 30px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  .header{
  font-weight: bold;

  }
  p {
    margin-bottom: 15px;
    font-size: 16px;
    color: #333;
  }

  .input {
    width: 95%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #eee;
    color: black;
  }

  .ro-list {
    list-style: none;
    padding: 0;
    margin: 10px 0;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #eee;
     &::-webkit-scrollbar {
    display: none;
  }
    
  }
    input[type="checkbox"]{
    height: 20px;
    width: 25px;
    }
    .para{
    color: #262626;

    }

  .ro-list-item {
    background: white;
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    text-align: left;
  }

  .ro-info {
    display: flex;
    flex-direction: row;
    gap: 15px;
    color: #262626;
  }


  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .closebtn,
  .savebtn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: background 0.3s;
    color: white;
  }

  .closebtn {
    background: #dedede;
    color: black;
  }

  .savebtn {
    background: #21c2ba;
  }
`;

export default Wrapper;
