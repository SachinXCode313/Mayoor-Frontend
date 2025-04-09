import styled from "styled-components";
const Wrapper = styled.section`
width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent overflowing of the container */
    background-color: #21C2BA;
    .search-container {
      display: flex;
      gap: 5px;
      align-items: center;
      position: relative;
      margin-top: 17px;
      padding: 10px;
            margin-left: -10px;
    }
    .icon{
      display: flex;
      gap: 12px;
      align-items: center;
      margin-left: 20px;
      // padding-right: 15px;
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
      border-color: #00796B; /* Matching the color scheme */
      box-shadow: 0 2px 4px rgba(0, 121, 107, 0.2);
      background-color: white;/* Focus shadow effect */
    }
    .search-bar::placeholder {
      color: #aaa
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
    justify-content: center;
    display: flex;
    color : gray;
  }
  .no_results{
    color: gray;
    text-align: center;
  }
    /* .list-icon-container {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    .list-icon {
      width: 20px;
      height: 30px;
      opacity: 0.7;
    } */
    .ro-list-title {
    text-align: center;
    color: white;
    margin-bottom: 10px;
    padding: 15px;
    height: 50px;
  }
  .ro-list {
    list-style: none;
    flex: 1;
    overflow-y: auto; /* Enable vertical scrolling */
    scrollbar-width: thin; /* For Firefox: thinner scrollbar */
    scrollbar-color: #ccc transparent;
    border-top-left-radius:30px;
    border-top-right-radius: 30px;
    background-color: #fff;
    padding: 10px;
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
  .ro-list::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar for WebKit browsers */
  }
  .ro-list::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Color of the scrollbar thumb */
    border-radius: 4px;
  }
  .ro-list-item {
   width: 90%;
    background: white;
    margin: 10px auto;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    border-radius: 10px;
    color: #6C6C6C;
    overflow: hidden;
    z-index: -1;
  }
  .ro-header {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .ro-info {
    flex: 1;
    flex-direction: row;
    overflow: hidden; /* Ensures text is clipped */
}
.ro-info p {
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
  .item-info{
    font-size: small;
  }
  .ro-dropdown-icon {
    font-size: 18px;
    color: #00796B;
  }
  .ro-dropdown-content {
    // padding: 10px;
    background: #eee;
    color:#1a302d;
  }
.list-icon-containers{
  margin-right: 10px;
  border-radius: 5px;
  padding: 2px;
}
/* .item-title{
  font-weight: bold;
} */
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
.ro-list-item,
.ro-header,
.held-popup {
  user-select: none; /* Standard property (Chrome, Edge, Opera, etc.) */
  -webkit-user-select: none; /* Safari & older versions of Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}
`
export default Wrapper;