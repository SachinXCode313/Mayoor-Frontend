import React, { useState , useEffect} from 'react';
import Wrapper from './rostyle';

const StudentList = ({student , scores}) => {
 
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
            <div className="ProfileInfo">
              <div className="ProfileRow">
                <span className="Label">Name:</span>
                <span className="Value">{student.name|| userData?.name|| "N/A"}</span>
              </div>
              <div className="ProfileRow">
                <span className="Label">Roll No.:</span>
                <span className="Value">{student.id||userData?.id|| "N/A"}</span>
              </div>
              <div className="ProfileRow">
                <span className="Label">Grade:</span>
                <span className="Value">{userData?.getclassName ||userData?.class|| "N/A"}</span>
              </div>
              <div className="ProfileRow">
                <span className="Label">Subject:</span>
                <span className="Value">{userData?.subjectName || userData?.subject|| "N/A"}</span>
              </div>
            </div>
          </div>
        
          <div className="TableContainer">
            <table className="ScoresTable">
              <thead>
                <tr>
                  <th className="TableHeaderCell">RO</th>
                  <th className="TableHeaderCell">Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((item, index) => (
                  <tr key={index}>
                    <td className="TableDataCell">{item.ro_name}</td>
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