import styled from "styled-components";
const Wrapper = styled.section`
   .form-box {
    width: min-content;
    padding: 30px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  .toggle-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .toggle-buttons input[type="button"] {
    flex: 1;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background: #ddd;
    color: black;
    transition: background 0.3s;
    font-weight: bold;
  }
  .toggle-buttons input[type="button"].active {
    background: #21C2BA;
    color: black;
  }
  form input[type="text"],
  form input[type="number"] {
    width: 95%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #eee;
    color: black;
  }
  .lo-info{
  color: black;
  }
  .lo-info {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden; /* Ensures text is clipped */
}
.lo-info p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    margin-right: 10px;
    display: block;
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal; /* allows wrapping */
    max-width: 100%;      /* or fixed width if needed like 250px */
    overflow-wrap: break-word;
    padding-right: 5px;
}

  /* :white_check_mark: Fix LO List Display */
  .lo-list {
    list-style: none;
    padding: 0;
    margin: 10px 0;
    max-height: 200px; /* Prevent overflow */
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #eee;
     &::-webkit-scrollbar {
    display: none;
  }
  }
  .lo-list-item {
    background: white;
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    text-align: left;
  }
  form input[type="checkbox"]{
  height: 20px;
  width: 25px;
  }
  .lo-info{
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
    background: #DEDEDE;
    color: black;
  }
  .savebtn {
    background: #21C2BA;
  }
  .held-popup {
    position: absolute;
    background: rgba(151, 150, 150, 0.8);
    color: white;
    padding: 5px;
    border-radius: 5px;
    z-index: 100;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
}
.mapLoItem{
  margin: 10px 10px 0 0;
  padding: 5px;
  text-align: center;
  width: 300px; 
  white-space: normal; /* Allow text to wrap */
  word-wrap: break-word; /* Ensure long words wrap */
  overflow-wrap: break-word;
}
`;
export default Wrapper;