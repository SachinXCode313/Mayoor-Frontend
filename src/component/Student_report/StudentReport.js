import styled from "styled-components";

const Wrapper = styled.div`
  /* Global Styles */
  margin: 0;
  background-color: #21c2ba;
  height:90;
overflow:hidden;


  /* Header */
  .st-header {
    height:30px;
    background-color: #21c2ba;
    color: white;
    text-align: center;
    padding: 30px;
    padding-left :0;
    font-size: 16px;
    font-weight: bold;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:100;
    position: relative;

  }

    .back-icon { 
    position: absolute;
    left: 10px; 
    cursor: pointer; 
    z-index:1000;
    margin-left: 15px;
   
}

// .back-icon {
 
//   left-aligned:85px;
//   left: 55px;
//   cursor: pointer;
//   font-size: 18px;
//   color: white;
// }

   .initials {
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 65px;
    width: 65px;
    font-size: 18px; 
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    background-color: #135d5d;
    border-radius: 50%;
    margin-right: 40px;
    margin-left:15px;
}

  /* Main Container */
  .main-container {
  padding: 15px;
  background-color: white; 
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: calc(100vh - 50px);
  max-height: 100vh;
 
  max-width: 100%;
  overflow:hidden; 
  z-index: 1; 
   
  }
    


  /* Student Info Section */
  .student-info {
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

  

  /* Student Details */
  .student-details p,
  .student-section p {
    font-size: 17px;
    margin: 3px 0;
  }

  /* Percentage Circles */
  .percentage-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 75px; 
}

  .percentage {
    text-align: center;
    width: 35%;
    max-width: 150px;
  }

  .percentage p {
    font-size: 19px;
    margin-top: 5px;
  }

  // /* Chart Container */
  // .chart-container {
  //   width: 100%;
  //   height: 300px;
  //   background-color: #fff;
  //   border-radius: 10px;
  //   padding: 0px;
  //   box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  //   margin-down: 80px ;
  // }

  // /* Remark Section */
  // .remark-section {
  //   position: relative;
  //   margin : 20px;
  //   margin-top:50px;
  //   margin-left:0px;
  // }

  // .remark-section textarea {
  //   width: 100%;
  //   height: 50px;
  //   border-radius: 5px;
  //   padding: 8px;
  //   font-size: 13px;
  //   margin-bottom: 0; /* Remove extra bottom margin */
  // padding-bottom: 20px;
  // }

  .average-title{
  margin: 35px;
  display: flex;
  justify-content: center; 
  align-items: center;
  color : #444;
  
  }

  // .subject-performance{
  // margin: 20px;
  // height:30px;
  // display: flex;
  // justify-content: center; 
  // align-items: center;
  // color:rgb(0,0,0,0.8)
  // }

  // .edit-icon {
  //   position: absolute;
  //   right: 8px;
  //   top: 8px;
  //   cursor: pointer;
  //   color: gray;
  // }


  // /* Score Components */
  // .score-component {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background: white;
  //   z-index: 1;
  // }
    

  
`;

export default Wrapper;
