import styled from "styled-components";
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent overflowing of the container */
    background-color: #21C2BA;
    .class-header {
   height: 100px;
    align-items: center;
    color: white;
    background-color: #21C2BA;
    display: flex;
    flex-direction: row;
    gap: 60px;
  }
  .icon {
    width: 30px;
    margin-left: 20px;
  }
    .menu-icon {
        font-size: 24px;
        margin-right: 10px;
        cursor: pointer;
    }
    /* Main Content */
    main {
        background-color: white;
        padding: 30px 20px;
        border-top-right-radius: 30px;
        border-top-left-radius: 30px;
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
    }
        .back-button {
    background-color: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
    color: #000000;
    margin-right: 15px;
    margin-left: 3px;
    margin-right: 30px;
  }
    /* Card Styling */
    .card {
        background-color: white;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 2px solid lightgrey;
    }
    .info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        font-size: 16px;
        margin-bottom: 15px;
    }
    .info p {
        margin: 5px 0;
        width: 48%; /* Ensures each pair aligns side by side */
    }
    /* Stats Boxes */
    .stats {
        display: flex;
        justify-content: space-between;
        margin: 5px 0;
    }
    .box {
        padding: 15px 10px;
        text-align: center;
        border-radius: 5px;
        font-size: 18px;
        /* margin: 0 5px; */
        border: 2px solid;
        span{
            font-size: 14px;
        }
    }
    /* Color for each box */
    .ac {
        border-color: green;
        width: 50px;
    }
    .lo {
        border-color: orange;
        width: 50px;
    }
    .ro {
        border-color: red;
        width: 50px;
    }
    .loading-message{
    display: block;
    width: 100px;
    margin: 200px auto;
}
.no-results{
    text-align: center;
}
`
export default Wrapper