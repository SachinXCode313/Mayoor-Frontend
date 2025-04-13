import styled from "styled-components"

const Wrapper = styled.section`
.menu {
    position: relative;
}
.heading {
    display: flex;
    justify-content: left;
    padding: 20px 15px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    gap: 15px;
    h1 {
        font-size: 20px;
    }
}

.profile-card {
      display: flex;
      gap: 15px;
    }

    .avatar {
      flex-shrink: 0;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #a2c4c9;
      object-fit: cover;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .profile-info h2 {
      margin: 0;
      font-size: 18px;
    }

    .profile-info span {
      text-decoration: none;
      color: #333;
      font-size: 14px;
      cursor: pointer;
    }

    .profile-info a:hover {
      text-decoration: underline;
    }

    .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  .menu-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    background-color: #fff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 20;
  }

  .menu-bar.show {
    transform: translateX(0);
  }


.paths {
    display: flex;
    flex-direction: column;
    gap: 20px ;
    padding: 20px 10px;
    overflow-y: auto;
    flex-grow: 1;
    margin-bottom: 60px; /* Leave space for logout button */
}

.paths div {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: background 0.2s ease-in-out;
}

.paths div:hover {
    background: #f1f1f1;
}

.paths div img {
    margin-right: 20px;
    width: 30px;
    height: 30px;
}

.icon {
    margin:  0px 15px 0px 0px
}

.logout {
    position: fixed;
    bottom: 60px;
    left: 0;
    width: 60vw;
    display: flex;
    align-items: center;
    padding: 30px;
    cursor: pointer;
    z-index: 25;
    height : 50px;
    border-top : 1px solid #666;
    img {
        margin-right: 20px;
        width: 30px;
        height: 30px;
    }
}
`

export default Wrapper;