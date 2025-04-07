import React, { useState , useRef, useEffect} from 'react';
import Wrapper from './rostyle';

const StudentList = ({student , scores}) => {
 const [userData, setUserData] = useState(null);
 const [heldRO, setHeldRO] = useState(null);
 const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
 const holdTimeoutRef = useRef(null);
    useEffect(() => {
      const userData = sessionStorage.getItem("userData");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }, []);
    console.log("Student Data:", student);
    console.log("User Data:", userData);
    console.log(scores);

    const handleTouchStart = (event, ro_Name) => {
      if (!event || !event.currentTarget) return;  // Add safeguard against undefined event
      const targetElement = event.currentTarget.getBoundingClientRect();
    
      holdTimeoutRef.current = setTimeout(() => {
        setHeldRO(ro_Name);
    
        const offsetX = 20;
        const offsetY = 20;
    
        const newPosition = {
          left: Math.min(targetElement.left + offsetX, window.innerWidth - 200),
          top: Math.min(targetElement.bottom + offsetY, window.innerHeight - 200)
        };
    
        setPopupPosition(newPosition);
      }, 800);
    };
  
    const handleTouchEnd = () => {
      clearTimeout(holdTimeoutRef.current);
      setHeldRO(null);
    };
  return (
    <Wrapper>
   
        <div className="container">
        <div className="ContentContainer">
          <div className="ProfileCard">
          <span className="initials">
            {student.name.split(' ')[0][0] + (student.name.split(' ')[1] ? student.name.split(' ')[1][0].toUpperCase() : "")}</span>
          <div className="student-details">
                <p><strong>Name:</strong> {student.name|| userData?.name || "N/A"}</p>
                <p><strong>Roll No:</strong> {student.id|| userData?.id || "N/A"} </p>
                <p><strong>Grade:</strong> {student.section| userData?.section|| "N/A"}</p>
                <p><strong>Section:</strong> {student.class|| userData?.class || "N/A"}</p>
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
                    <td
                      className="TableDataCell"
                      onTouchStart={(e) => handleTouchStart(e, item.ro_name)}
                      onTouchEnd={handleTouchEnd}
                      onMouseDown={(e) => handleTouchStart(e, item.ro_name)}
                      onMouseUp={handleTouchEnd}
                    >
                      {item.ro_name}
                    </td>
                    <td className="TableDataCell">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {heldRO && (
        <div className="held-popup" style={{ top: popupPosition.top, left: popupPosition.left  }}>
          <p> {heldRO}</p>
        </div>
      )}
    </Wrapper>
  );
};

export default StudentList;