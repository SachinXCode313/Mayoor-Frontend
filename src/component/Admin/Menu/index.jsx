import React, { useState, useRef, useEffect } from 'react';
import Wrapper from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsSendArrowUp } from "react-icons/bs";
import { PiUserList, PiMonitorPlay, PiTreeStructure } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("User"))
    const [isVisible, setIsVisible] = useState(null);
    const menuRef = useRef(null);

    const handleVisibility = (section) => {
        setIsVisible(isVisible === section ? null : section);
    };

    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsVisible(null);
            }
        };
        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible]);

    return (
        <Wrapper>
            <div className='menu'>
                <div className='hamburger'>
                    <FiMenu size={30} onClick={() => handleVisibility("menu")} />
                </div>

                <div className={`menu-bar ${isVisible === "menu" ? "show" : ""}`} ref={menuRef}>
                    <div className='heading'>
                        <div className="avatar">
                            {user.image
                                ? <img src={user.image} alt="User Icon" referrerPolicy="no-referrer" />
                                : <CiUser size={60} color='#008680' />}
                        </div>
                        <div className="profile-info">
                            <h2>{user.name}</h2>
                            <span onClick={() => navigate('/admin/profile')}>View Profile</span>
                        </div>
                    </div>

                    <div className='paths'>
                        <div onClick={() => navigate(`/admin/pushNotification`)}>
                            <BsSendArrowUp size={30} className='icon' />
                            <span>Send Notification</span>
                        </div>
                        <div onClick={() => navigate(`/admin/mapping`)}>
                            <PiTreeStructure size={30} className='icon' />
                            <span>Mapping Tree</span>
                        </div>
                        <div onClick={() => navigate(`/admin/teachers`)}>
                            <PiUserList size={30} className='icon' />
                            <span>Teachers</span>
                        </div>
                        <div onClick={() => navigate(`/admin/tutorial`)}>
                            <PiMonitorPlay size={30} className='icon' />
                            <span>Tutorial</span>
                        </div>
                        <div className='logout' onClick={handleLogout}>
                            <TbLogout2 size={30} className='icon' />
                            <span>Logout</span>
                        </div>
                    </div>
                </div>

                {isVisible === "menu" && (
                    <div className="overlay" onClick={() => handleVisibility(null)} />
                )}
            </div>
        </Wrapper>
    );
};

export default Menu;
