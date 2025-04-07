import styled from "styled-components";

const Wrapper = styled.section`
  /* Full-screen centered layout with a blurred background */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.3); /* Semi-transparent dark overlay */

  .mainContainer {
    background:rgb(236, 242, 242); /* Clean white box */
    padding: 30px;
    border-radius: 12px; /* Rounded corners */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Soft shadow */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    text-align: center;
  }

  .container1 {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333; /* Darker text */
    padding: 10px;
    line-height: 1.5
  }

  .container2 {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  .container2 div {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  /* Yes button */
  .container2 div:first-child {
    background: #dedede; 
    color: #6c6c6c;
    border: none;
  }

  /* No button */
  .container2 div:last-child {
    background:rgb(114, 197, 192); 
    color: white;
  
`;

export default Wrapper;
