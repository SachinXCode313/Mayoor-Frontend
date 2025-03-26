import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import Ripples from 'react-ripples'
const HomeList = ({ user, setIndex, msg }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const clearSessionStorageOnRefresh = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", clearSessionStorageOnRefresh);
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorageOnRefresh);
    };
  }, []);
  const [selectedYear, setSelectedYear] = useState(sessionStorage.getItem("year") || 2024);
  const [selectedClass, setSelectedClass] = useState(sessionStorage.getItem("class") || 1);
  const [selectedSection, setSelectedSection] = useState(sessionStorage.getItem("section") || '1');
  const [selectedQuarter, setSelectedQuarter] = useState(sessionStorage.getItem("quarter") || '1');
  const [selectedSubject, setSelectedSubject] = useState(sessionStorage.getItem("subject") || '1');
  const updateSessionStorage = (key, value, setter) => {
    sessionStorage.setItem(key, value);
    setter(value);
  };

  const getClassName = (classNum) => {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    return romanNumerals[classNum - 1] || classNum;
  };
  
  const getSectionName = (sectionNum) => {
    const sectionNames = { '1': 'Orchid', '2': 'Tulip', '3': 'Daffodil' };
    return sectionNames[sectionNum] || sectionNum;
  };

  const getQuarterName = (quarterNum) => {
    const quarterNames = {
      '1': 'Q I', '2': 'Q II', '3': 'T I', 
      '4': 'Q III', '5': 'Q IV', '6': 'T II'
    };
    return quarterNames[quarterNum] || quarterNum;
  };

  const getSubjectName = (subjectNum) => {
    const subjectNames = {
      '1': 'English', '2': 'Hindi', '3': 'Mathematics', '4': 'Science',
      '5': 'Computer Sc.', '6': 'Social Studies', '7': 'III Language',
      '8': 'GP Values', '9': 'Music', '10': 'Dance/Dramatics',
      '11': 'Art', '12': 'Sports', '13': 'Discipline', '14': 'Attendance'
    };
    return subjectNames[subjectNum] || subjectNum;
  };

  const handleClick = () => {
  setIndex(2);
  const updatedUserdata = {
    year: parseInt(selectedYear, 10),
    class: parseInt(selectedClass, 10),
    section: parseInt(selectedSection, 10),
    quarter: parseInt(selectedQuarter, 10),
    subject: parseInt(selectedSubject, 10),
    getclassName: getClassName(selectedClass),  
    sectionName: getSectionName(selectedSection),
    quarterName: getQuarterName(selectedQuarter), 
    subjectName: getSubjectName(selectedSubject)
  };  

  sessionStorage.setItem("userData", JSON.stringify(updatedUserdata));
  setUserData(updatedUserdata);
};
  const toggle = e => {
    e.target.nextSibling.style.display = e.target.nextSibling.style.display === 'flex' ? 'none' : 'flex'
  }
  return (
    <Wrapper>
      <div id="user">
        <div id="detail">
          <p id="hi">Hi,</p>
          <h1 id="name">{user}</h1>
        </div>
        <div id="image">
          {/* <img id="notification" src={notification} alt="Notification" /> */}
          {/* <img id="profile" src={student} alt="User" /> */}
          {/* <img id="menu" src={menu} alt="Menu" /> */}
        </div>
      </div>
      <form className="choice">
        <label htmlFor="year" onClick={toggle}>Session</label>
        <div className="options">
          <Ripples><div tabIndex={0} className={selectedYear === 2025 ? "option active" : "option"} onClick={e => setSelectedYear(2025)}>2025 - 2026</div></Ripples>
          <Ripples><div tabIndex={0} className={selectedYear === 2024 ? "option active" : "option"} onClick={e => setSelectedYear(2024)}>2024 - 2025</div></Ripples>
        </div>
        <label htmlFor="quarter" onClick={toggle}>Quarter</label>
        <div className="quarter options">
          <Ripples><div tabIndex={0} className={selectedQuarter === "1" ? "option active" : "option"} onClick={e => setSelectedQuarter("1")}>Q I</div></Ripples>
          <Ripples><div tabIndex={0} className={selectedQuarter === "2" ? "option active" : "option"} onClick={e => setSelectedQuarter("2")}>Q II</div></Ripples>
          <Ripples><div tabIndex={0} className={selectedQuarter === "3" ? "option active" : "option"} onClick={e => setSelectedQuarter("3")}>T I</div></Ripples>
          <Ripples><div tabIndex={0} className={selectedQuarter === "4" ? "option active" : "option"} onClick={e => setSelectedQuarter("4")}>Q III</div></Ripples>
          <Ripples><div tabIndex={0} className={selectedQuarter === "5" ? "option active" : "option"} onClick={e => setSelectedQuarter("5")}>Q IV</div></Ripples>
          <Ripples><div tabIndex={0} className={selectedQuarter === "6" ? "option active" : "option"} onClick={e => setSelectedQuarter("6")}>T II</div></Ripples>
        </div>
        <label htmlFor="class" onClick={toggle}>Class</label>
        <div className="class options">
          <Ripples><div tabIndex={0} className={`option ${selectedClass === 1 ? 'active' : ''}`} onClick={e => setSelectedClass(1)}>1</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedClass === 2 ? 'active' : ''}`} onClick={e => setSelectedClass(2)}>2</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedClass === 3 ? 'active' : ''}`} onClick={e => setSelectedClass(3)}>3</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedClass === 4 ? 'active' : ''}`} onClick={e => setSelectedClass(4)}>4</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedClass === 5 ? 'active' : ''}`} onClick={e => setSelectedClass(5)}>5</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedClass === 6 ? 'active' : ''}`} onClick={e => setSelectedClass(6)}>6</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedClass === 7 ? 'active' : ''}`} onClick={e => setSelectedClass(7)}>7</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedClass === 8 ? 'active' : ''}`} onClick={e => setSelectedClass(8)}>8</div></Ripples>
        </div>
        <label htmlFor="section" onClick={toggle}>Section</label>
        <div className="options">
          <Ripples><div tabIndex={0} className={selectedSection === "1" ? "option active" : "option"} onClick={e => setSelectedSection("1")}>Orchid</div></Ripples>
          <Ripples><div tabIndex={0} className={selectedSection === "2" ? "option active" : "option"} onClick={e => setSelectedSection("2")}>Tulip</div></Ripples>
          <Ripples><div tabIndex={0} className={selectedSection === "3" ? "option active" : "option"} onClick={e => setSelectedSection("3")}>Daffodil</div></Ripples>
        </div>
        <label htmlFor="subject" onClick={toggle}>Subject</label>
        <div className="options subjects">
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === "1" ? 'active' : ''}`} onClick={e => setSelectedSubject('1')}>English</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === "2" ? 'active' : ''}`} onClick={e => setSelectedSubject('2')}>Hindi</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '3' ? 'active' : ''}`} onClick={e => setSelectedSubject('3')}>Mathematics</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '4' ? 'active' : ''}`} onClick={e => setSelectedSubject('4')}>Science</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '5' ? 'active' : ''}`} onClick={e => setSelectedSubject('5')}>Computer Sc.</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '6' ? 'active' : ''}`} onClick={e => setSelectedSubject('6')}>Social Studies</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '7' ? 'active' : ''}`} onClick={e => setSelectedSubject('7')}>III Language</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '8' ? 'active' : ''}`} onClick={e => setSelectedSubject('8')}>GP Values</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '9' ? 'active' : ''}`} onClick={e => setSelectedSubject('9')}>Music</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '10' ? 'active' : ''}`} onClick={e => setSelectedSubject('10')}>Dance/Dramatics</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '11' ? 'active' : ''}`} onClick={e => setSelectedSubject('11')}>Art</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '12' ? 'active' : ''}`} onClick={e => setSelectedSubject('12')}>Sports</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '13' ? 'active' : ''}`} onClick={e => setSelectedSubject('13')}>Discipline</div></Ripples>
          <Ripples><div tabIndex={0} className={`option ${selectedSubject === '14' ? 'active' : ''}`} onClick={e => setSelectedSubject('14')}>Attendance</div></Ripples>
        </div>
        <Ripples className="started"><button
          className="get-started"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
          disabled={!selectedSubject}
        >
          Get Started
        </button></Ripples>
      </form>
    </Wrapper>
  );
};
export default HomeList;