import styled from "styled-components";

const Wrapper = styled.section`
   width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent overflowing of the container */
    background-color: #12a4a4;
    .search-container {
      display: flex;
      gap: 5px;
      align-items: center;
      position: relative;
      // width: 100%;
      // margin: 15px 0;
      // padding-left: 12px;
      margin-top: 17px;
      padding: 10px;
      margin-left: -10px;
    }
    .menu{
    padding-right:17px;
    }
    .icon{
      display: flex;
      gap: 12px;
      align-items: center;
      // padding-right: 15px;
      margin-left: 20px;
    }
    .search-bar {
      width: 100%;
      padding: 10px 40px 10px 15px; /* Padding for space for the search icon */
      font-size: 16px;
      border-radius: 25px;
      border: 1px solid #ddd; /* Same border color as other elements */
      background-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow for subtle depth */
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s; /* Smooth transition */
      margin: 10px;
    }
    .search-bar:focus {
      border-color: #00796B;
      box-shadow: 0 2px 4px rgba(0, 121, 107, 0.2);
      background-color: white;
    }
    .search-bar::placeholder {
      color: #aaa;
    }
    /* .list-icon-container {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    } */
    /* .list-icon {
      opacity: 0.7;
    } */
    .ac-list-title {
    text-align: center;
    color: white;
    margin-bottom: 10px;
    padding: 15px;
    height: 50px;
 }
  .ac-list {
    list-style: none;
    flex: 1; /* Allow the list to grow and take up available space */
    overflow-y: auto; /* Enable vertical scrolling */
    scrollbar-width: thin; /* For Firefox: thinner scrollbar */
    scrollbar-color: #ccc transparent;
    border-top-left-radius:30px;
    border-top-right-radius: 30px;
    background-color: #fff;
     padding: 10px 10px 50px 10px;
  }
  .no-results{
    list-style: none;
    flex: 1; /* Allow the list to grow and take up available space */
    overflow-y: auto; /* Enable vertical scrolling */
    scrollbar-width: thin; /* For Firefox: thinner scrollbar */
    scrollbar-color: #ccc transparent;
    border-top-left-radius:30px;
    border-top-right-radius: 30px;
    background-color: #fff;
    padding: 10px;
    display : flex;
    justify-content: center;
    color : gray;
  }
  .no_results{
    color: gray;
    text-align: center;
  }
  .ac-list::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar for WebKit browsers */
  }
  .ac-list::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Color of the scrollbar thumb */
    border-radius: 4px;
  }
  .ac-list-item {
   width: 90%;
    background: white;
    margin: 10px auto;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    border-radius: 10px;
    color: #6C6C6C;
    // overflow: hidden;
    // z-index: -1;
  }
  .ac-header {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .ac-info {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden; /* Ensures text is clipped */
}
.ac-info p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    margin-right: 30px;
}
.item-title{
  font-size: 16px;
  padding-bottom: 5px;
  color:rgb(47, 46, 46);
}
  .ac-dropdown-icon {
    font-size: 18px;
    color: #00796B;
  }
  .ac-dropdown-content {
    padding: 10px;
    background: #E0F2F1;
    color: #004D40;
  }
  .plus{
    font-size: 40px;
    color: rgb(26, 24, 24)
  }
  .add{
    background-color: #12a4a4;
    opacity: 0.9;
    font-weight: bold;
    margin-bottom: 10px;
    width: 60px;
    height: 60px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    display: flex; /* Use flexbox for alignment */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    text-align: center;
    position: fixed; /* Fixed positioning */
    bottom: 90px; /* Distance from the bottom */
    right: 40px; /* Distance from the right */
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), /* Slight shadow below */
              0 -4px 6px rgba(0, 0, 0, 0.1), /* Slight shadow above */
              4px 0 6px rgba(0, 0, 0, 0.1), /* Slight shadow on the right */
              -4px 0 6px rgba(0, 0, 0, 0.1);
  }
.delete{
  height: 25px;
  margin-right: 5px;
}
.edit{
  height: 25px;
  margin-right: 5px;
  color: green;
}

  .loading-message{
    height: 100px;
    width: 100px;
    display: block;
    margin: auto;
    color: grey;
    }
      .loading-message div{
        height: 100px;
        width: 150px;
      font-size: x-large;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
.list-icon-containers{
  margin-right: 10px;
  border-radius: 5px;
  padding: 2px;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Dim background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
@keyframes popup {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.form-container button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.mapCounter{
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    margin-right: 5px;
    padding: 2px;
}
.circular{
    height: 50px;
    width: 50px;
    border: 5px solid lightgray;
    border-bottom: 5px solid rgb(127, 124, 124);
    position: absolute;
    top: 150px;
    left: 180px;
    border-radius: 50%;
    animation: loader 2s linear infinite;
}
@keyframes loader {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
.success-overlay {
  position: fixed; /* Ensures full-page coverage */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Keeps it on top */
}
.held-popup {
    position: absolute;
    background: rgba(151, 150, 150, 0.8);
    color: white;
    padding: 5px;
    border-radius: 5px;
    z-index: 100;
    display: flex;
    flex-wrap: wrap;
    max-width: 400px;
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
.ac-list-item,
.ac-header,
.held-popup {
  user-select: none; /* Standard property (Chrome, Edge, Opera, etc.) */
  -webkit-user-select: none; /* Safari & older versions of Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}
.loading-message{
    display: block;
    width: 100px;
    margin: 200px auto;
}

.no-lo {
  background-color: #ffcccc;  
}

.filters{
  align-items: center;
  display: flex;
  flex-direction: row;
  height : 50px;
  gap : 15px;
  padding : 10px;
  box-sizing : border-box;

  select{
    flex : 1;
    background-color: #d0eaf5;
    border-radius: 20px;
    border : 1
}
}

.ac-list-heading {
  font-size : 20px;
  text-align : center;
}
.top-heading {
  color: #00000096;
  font-size: larger;
}


`

export default Wrapper;