import { NavLink, Outlet } from "react-router-dom";
import Wrapper from "./style";
import stuIcon from "../assets/student.png";
import roList from "../assets/roList.png";
import loList from "../assets/loList.png";
import acList from "../assets/acList.png";
import homeIcon from "../assets/home.png";

const Home = () => {
  return (
    <Wrapper>
      <div className="screen">
        <Outlet />
      </div>

      <div className="bottom">
        <NavLink to="/user/home/classview" className={({ isActive }) => isActive ? "tab-icon active" : "tab-icon"}>
          <div className="b">
            <img src={homeIcon} alt="Home" /> Home
          </div>
        </NavLink>
        <NavLink to="/user/home/students" className={({ isActive }) => isActive ? "tab-icon active" : "tab-icon"}>
          <div className="b">
            <img src={stuIcon} alt="Students" /> Students
          </div>
        </NavLink>
        <NavLink to="/user/home/ro" className={({ isActive }) => isActive ? "tab-icon active" : "tab-icon"}>
          <div className="b">
            <img src={roList} alt="RO" /> RO
          </div>
        </NavLink>
        <NavLink to="/user/home/lo" className={({ isActive }) => isActive ? "tab-icon active" : "tab-icon"}>
          <div className="b">
            <img src={loList} alt="LO" /> LO
          </div>
        </NavLink>
        <NavLink to="/user/home/ac" className={({ isActive }) => isActive ? "tab-icon active" : "tab-icon"}>
          <div className="b">
            <img src={acList} alt="AC" /> AC
          </div>
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default Home;
