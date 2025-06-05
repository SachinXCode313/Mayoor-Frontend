
import styled from "styled-components";  

const Wrapper = styled.div`   
  margin:0;  
  padding: 0;  
  background-color:#fff;  
  display: flex;  
  justify-content: space-between;  
   min-height: 70vh;  
  
  .NavButton {  
    background: none;  
    border: none;  
    font-size: 1.5rem;  
    color: white;  
    cursor: pointer;  
  }  
  @media (min-width: 768px) {  
    .NavButton {  
      font-size: 1.8rem;  
    }  
  }  
    .initials {
    display: flex;
    justify-content: center; /* Horizontally center */
    align-items: center; /* Vertically center */
    height: 65px;
    width: 65px;
    font-size: 18px; /* Adjust size if needed */
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    background-color: #135d5d;
    border-radius: 50%;
    margin-right: 40px;
    margin-left: 15px;
}
    .container{
    position:relative;
    margin-top: 5px;
    background-color:white;
    border-top-left-radius: 30px;  
    border-top-right-radius: 30px;
    height:100vh;
    width:100vw;
}

  .ContentContainer {  
    display: flex;  
    flex-direction: column;  
    gap: 10px;  
    overflow-y: auto;  
    flex: 1;  
    width: 100%;  
    box-sizing: border-box;  
  }  
  @media (min-width: 768px) {  
    .ContentContainer {  
      padding: 20px;  
    }  
  }  
  .ProfileCard {  
    display: flex;
    height: 12%;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 20px;
     margin-top: 5px;
    border: 1px solid #e0d8cc; 
    background: linear-gradient(white, white) padding-box, 
                linear-gradient(120deg, #f7f3e9, #fffdf5) border-box; /* Softer gradient */
    color: #444;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }  
  @media (min-width: 768px) {  
    .ProfileCard {  
      padding: 20px;  
      border-radius: 12px;   
    }  
  }  
 
   /* Student Details */
  .student-details p,
  .student-section p {
    font-size: 14px;
    margin: 3px 0;
  }
  
  .TableContainer {  
    overflow-x: auto; 
    width:100%; 
    
  }  
  .ScoresTable {  
    width: 100%;  
    border-collapse: collapse;  
    margin-top: 10px;  
    border: 1px solid #ddd;  
    border-radius: 8px;  
  }  
  @media (min-width: 768px) {  
    .ScoresTable {  
      border-radius: 12px;  
    }  
  }  
  .TableHeaderCell {  
    border: 1px solid #ddd;  
    padding: 8px;  
    text-align: center;  
    font-size: 0.9rem;  
    background-color: #f0f0f0;  
    font-weight: bold;  
  }  
  @media (min-width: 768px) {  
    .TableHeaderCell {  
      padding: 10px;  
      font-size: 1rem;  
    }  
  }  
 .held-popup {
  position: absolute;
  background: rgba(94, 93, 93, 0.8);
  color: white;
  padding: 5px;
  border-radius: 5px;
  z-index: 100;
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
 display: block;
    word-wrap: break-word;
    word-break: break-word;
    /* white-space: normal;  */
    max-width: 100%;      /* or fixed width if needed like 250px */
    overflow-wrap: break-word;
}

.TableDataCell {  
    border: 1px solid #ddd;  
    padding: 8px;  
    text-align: center;  
    font-size: 0.9rem; 
    max-width: 150px;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    user-select: none;  
    -webkit-user-select: none;  
    -moz-user-select: none;  
    -ms-user-select: none; 
    }
  @media (min-width: 768px) {  
    .TableDataCell {  
      padding: 10px;  
      font-size: 1rem;  
    }  
  }  
`;  

export default Wrapper;