import React, { useState } from 'react';
import Wrapper from './style';
import HomeList from './Homelist';
import ROlist from '../RO_List';
import LOlist from '../LO_List';
import AClist from '../AC_List';
import stuIcon from '../assets/student.png';
import roList from '../assets/roList.png';
import loList from '../assets/loList.png'
import acList from '../assets/acList.png'
import StudentList from '../Students/StudentSelect';
// import { useSwipeable } from 'react-swipeable';
import ClassView from "../Classview/Classview";
import homeIcon from "../assets/home.png";

const Home = ({ user,onLogout }) => {
  const [index, setIndex] = useState(1);
  const [tabs, setTabs] = useState([
    { id: 2, title: 'Home', icon: homeIcon },
    { id: 3, title: 'Students', icon: stuIcon },
    { id: 4, title: 'RO', icon: roList },
    { id: 5, title: 'LO', icon: loList },
    { id: 6 , title: 'AC', icon: acList },
  ]);
  const [loItems, setLoItems] = useState([]);
  const [acItems, setAcItems] = useState([]);
  const [studentsData, setStudentsData] = useState([]); // New state to store students data
  // Function passed to LOlist to update loItems in the parent component
  const handleLoItems = (data) => {
    setLoItems(data);
  };
  const handleAcItems = (data) => {
    setAcItems(data);
  };
  const handleStudentsData = (data) => {
    setStudentsData(data); // Update students data in the parent state
  };
// console.log(user)
// const handlers = useSwipeable({
//   onSwipedLeft: () => {
//     if (index !== 1 && index !== 6) setIndex((prevIndex) => (prevIndex < 6 ? prevIndex + 1 : prevIndex));
//   },
//   onSwipedRight: () => {
//     if (index !== 1 && index !== 6) setIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : prevIndex));
//   },
//   trackMouse: true,
// });
  return (
    <Wrapper>
      <div className="screen">
        {index === 1 ? (
          <HomeList user={user} setIndex={setIndex}  />
        ) : index === 2 ? (
          <ClassView setIndex={setIndex} user={user} onLogout={onLogout}/>
        ) : index === 3 ? (
          <StudentList onStudentsData={handleStudentsData} setIndex={setIndex} onLogout={onLogout}/>
        ) : index === 4 ? (
          <ROlist loItems={loItems} setLoItems={setLoItems} setIndex={setIndex} handleLoItems={handleLoItems} acItems={acItems} onLogout={onLogout}/>
        ) : index === 5 ? (
          <LOlist loItems={loItems} setLoItems={setLoItems} handleLoItems={handleLoItems} acItems={acItems} setAcItems={setAcItems} setIndex={setIndex} onLogout={onLogout}/>
        ) : (
          <AClist acItems={acItems} setAcItems={setAcItems} handleAcItems={handleAcItems} studentsData={studentsData} setIndex={setIndex} user={user} onLogout={onLogout}/>
        )}
      </div>
      {index !== 1 && (
         <div className="bottom">
         {tabs.map(({ id,title, icon }) => (
           <button 
             key={id}
             className={index === id ? 'active' : ''}
             onClick={() => setIndex(id)}
           >
            <div className='b'>
             <img
               src={icon}
               alt={title}
               style={{ width: '35px', height: '35px'}}
             />
             {title}
            </div>
           </button>
         ))}
       </div>
      )}
    </Wrapper>
  );
};
export default Home;