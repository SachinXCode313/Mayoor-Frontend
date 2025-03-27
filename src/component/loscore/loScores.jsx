import React, { useState, useEffect } from 'react';
import Wrapper from './lostyle';
const StudentList = ({ student, scores }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);
  console.log("Student Data:", student);
  console.log("User Data:", userData);
  console.log(scores);
  return (
    <Wrapper>
      <div className="container">
        <div className="ContentContainer">
          <div className="ProfileCard">
            <span className="initials">{student.name.split(' ')[0][0] + (student.name.split(' ')[1] ? student.name.split(' ')[1][0].toUpperCase() : "")}</span>
            <div className="student-details">
              <p><strong>Name :</strong> {student.name || userData?.name || "N/A"}</p>
              <p><strong>Roll No : </strong>{student.id || userData?.id || "N/A"} </p>
              <p><strong>Grade : </strong> {userData?.getclassName || userData?.class || "N/A"}</p>
              <p><strong>Subject : </strong>{userData?.subjectName || userData?.subject || "N/A"} </p>
            </div>
          </div>

          <div className="TableContainer">
            <table className="ScoresTable">
              <thead>
                <tr>
                  <th className="TableHeaderCell">LO</th>
                  <th className="TableHeaderCell">Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((item, index) => (
                  <tr key={index}>
                    <td className="TableDataCell">{item.lo_name}</td>
                    <td className="TableDataCell">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </Wrapper>
  );
};

export default StudentList;