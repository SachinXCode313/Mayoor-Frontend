import React from 'react';
import { useState, useEffect } from 'react';
import Wrapper from './style';
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from 'react-router';
import axios from 'axios';
import ReactLoading from 'react-loading'
import Skeleton from 'react-loading-skeleton';

const Dashboard = () => {
    const[teacherData, setTeacherData] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1)
    }
    const [userData, setUserData] = useState(null);
    const user = JSON.parse(localStorage.getItem("User"))
      useEffect(() => {
        const userData = sessionStorage.getItem("userData");
        if (userData) {
          setUserData(JSON.parse(userData));
        }
      }, []);

    const loadDashboard = async () => {
        setLoading(true)
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
          year: userData?.year,
          quarter: userData?.quarter,
          teacher_id: user?.teacherId
        };
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/teacher-dashboard`,
            { headers }
          );
          console.log("Response Data:", response.data);
          const data = response.data;
          setTeacherData(data.teacher_dashboard)
        } catch (error) {
          console.error(
            "Error fetching teacher dashboard data:",
            error.response?.data || error.message
          );
          setTeacherData([])
        }finally {
            setLoading(false)
        }
      };
      useEffect(() => {
        if (userData) {
          loadDashboard();
        }
      }, [userData]);

    return (
        <Wrapper>
        <div className="class-header">
        <div className="icon">
        <button className="back-button" onClick={handleBackButton}>
            <FaArrowLeft />
          </button>
        </div>
        <div className="class-title">
          <h2>Teacher's Dashboard</h2>
        </div>
        </div>

            <main>
                {loading ? (
                    <div className="loading-message">
                        <div>
                            <ReactLoading type="spin" color="#135D5D" height={100} width={100}  />
                            <Skeleton count={3} />
                        </div>
                    </div>
                ) :teacherData.length > 0 ? (
                teacherData.map((card, index) => (
                    <div className="card" key={index}>
                        <div className="info">
                            <p><strong>Class :</strong> {card.class}</p>
                            <p><strong>Section :</strong> {card.section}</p>
                            <p><strong>Subject :</strong> {card.subject}</p>
                            <p><strong>Quarter :</strong> {card.quarter}</p>
                        </div>
                        <div className="stats">
                            <div className="box ac">
                                <p>{card.ac_class_average ?? "N/A"}</p>
                                <span>AC (%)</span>
                            </div>
                            <div className="box lo">
                                <p>{card.lo_class_average ?? "N/A"}</p>
                                <span>LO (%)</span>
                            </div>
                            <div className="box ro">
                                <p>{card.ro_class_average ?? "N/A"}</p>
                                <span>RO (%)</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-results">
                    No Results Found
                </div>
            )}
            </main>
        </Wrapper>
    );
};

export default Dashboard;
