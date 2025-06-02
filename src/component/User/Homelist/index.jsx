import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import Ripples from 'react-ripples';
import { Link } from 'react-router';
import { CiUser } from "react-icons/ci";

const HomeList = () => {
  const user = JSON.parse(localStorage.getItem("User"));

  const [selectedYear, setSelectedYear] = useState(sessionStorage.getItem("year") || 2024);
  const [selectedClass, setSelectedClass] = useState(sessionStorage.getItem("class") || 1);
  const [selectedSection, setSelectedSection] = useState(sessionStorage.getItem("section") || '1');
  const [selectedQuarter, setSelectedQuarter] = useState(sessionStorage.getItem("quarter") || '1');
  const [selectedSubject, setSelectedSubject] = useState(sessionStorage.getItem("subject") || '1');
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData")) || {}
  );

  useEffect(() => {
    console.log(user);
    const clearSessionStorageOnRefresh = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", clearSessionStorageOnRefresh);
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorageOnRefresh);
    };
  }, []);

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning,";
    else if (hour < 18) return "Good Afternoon,";
    else return "Good Evening,";
  };
  const getSectionNumber = (name) => {
  const sectionNames = {
    1: "Orchid",
    2: "Tulip",
    3: "Daffodil",
  };

  // Find the key (number) for the given name
  return parseInt(
    Object.keys(sectionNames).find((key) => sectionNames[key] === name),
    10
  );
};

const subjectNames = {
  1: "English",
  2: "Hindi",
  3: "Mathematics",
  4: "Science",
  5: "Computer Sc.",
  6: "Social Studies",
  7: "III Language",
  8: "GP Values",
  9: "Music",
  10: "Dance/Dramatics",
  11: "Art",
  12: "Sports",
  13: "Discipline",
  14: "Attendance"
};
const getSubjectNumber = (name) => {
  return parseInt(
    Object.keys(subjectNames).find((key) => subjectNames[key] === name),
    10
  );
};


  const handleClick = () => {
  const sectionNum = getSectionNumber(selectedSection); // 'Orchid' -> 1
  const subjectNum = getSubjectNumber(selectedSubject); // 'English' -> 1

  const updatedUserdata = {
    year: parseInt(selectedYear, 10),
    class: parseInt(selectedClass, 10),
    section: sectionNum,
    quarter: parseInt(selectedQuarter, 10),
    subject: subjectNum,                    // Number
    className: getClassName(selectedClass),
    quarterName: getQuarterName(selectedQuarter),
    sectionName: selectedSection,
    subjectName: selectedSubject            // Store subject name too
  };

  sessionStorage.setItem("userData", JSON.stringify(updatedUserdata));
  setUserData(updatedUserdata);
};



  const toggle = e => {
    e.target.nextSibling.style.display = e.target.nextSibling.style.display === 'flex' ? 'none' : 'flex';
  };

  const allocation = user?.allocation || [];

  const availableClasses = [...new Set(allocation.map(item => item.class))];
  const availableSections = [...new Set(
    allocation.filter(item => item.class === selectedClass)
      .map(item => item.section)
  )];
  const availableSubjects = [...new Set(
    allocation.filter(item => item.class === selectedClass && item.section === selectedSection)
      .map(item => item.subject)
  )];

  // Sync userData when any selection changes
 useEffect(() => {
  const sectionNum = getSectionNumber(selectedSection); // 'Orchid' -> 1
  const subjectNum = getSubjectNumber(selectedSubject); // 'English' -> 1

  const updatedUserdata = {
    year: parseInt(selectedYear, 10),
    class: parseInt(selectedClass, 10),
    section: sectionNum,
    quarter: parseInt(selectedQuarter, 10),
    subject: subjectNum,                    // Number
    className: getClassName(selectedClass),
    quarterName: getQuarterName(selectedQuarter),
    sectionName: selectedSection,
    subjectName: selectedSubject            // Store subject name too
  };
  sessionStorage.setItem("userData", JSON.stringify(updatedUserdata));
  setUserData(updatedUserdata);
}, [selectedYear, selectedClass, selectedSection, selectedQuarter, selectedSubject]);

const isAllSelected =
  selectedYear &&
  availableClasses.includes(selectedClass) &&
  availableSections.includes(selectedSection) &&
  availableSubjects.includes(selectedSubject) &&
  selectedQuarter;


  return (
    <Wrapper>
      <div id="user">
        <div className="profile-card">
          <div className="avatar">
            {user.image ? <img src={user.image} alt="User Icon" referrerPolicy="no-referrer" /> : <CiUser size={60} color='#008680' />}
          </div>
          <div className="profile-info">
            <h2>{getGreeting()}</h2>
            <h1>{user.name}</h1>
          </div>
        </div>
      </div>

      <form className="choice">
        <label htmlFor="year" onClick={toggle}>Session</label>
        <div className="options">
          <Ripples><div tabIndex={0} className={selectedYear === 2025 ? "option active" : "option"} onClick={() => setSelectedYear(2025)}>2025 - 2026</div></Ripples>
          <Ripples><div tabIndex={0} className={selectedYear === 2024 ? "option active" : "option"} onClick={() => setSelectedYear(2024)}>2024 - 2025</div></Ripples>
        </div>

        <label htmlFor="quarter" onClick={toggle}>Quarter</label>
        <div className="quarter options">
          {[1, 2, 3, 4, 5, 6].map(q => (
            <Ripples key={q}>
              <div tabIndex={0} className={`option ${selectedQuarter === q.toString() ? "active" : ""}`} onClick={() => setSelectedQuarter(q.toString())}>
                {getQuarterName(q.toString())}
              </div>
            </Ripples>
          ))}
        </div>

        <label htmlFor="class" onClick={toggle}>Class</label>
        <div className="class options">
          {availableClasses.map(cls => (
            <Ripples key={cls}>
              <div tabIndex={0} className={`option ${selectedClass === cls ? 'active' : ''}`} onClick={() => setSelectedClass(cls)}>
                {cls}
              </div>
            </Ripples>
          ))}
        </div>

        <label htmlFor="section" onClick={toggle}>Section</label>
        <div className="section options">
          {availableSections.map(sec => (
            <Ripples key={sec}>
              <div tabIndex={0} className={`option ${selectedSection === sec ? 'active' : ''}`} onClick={() => setSelectedSection(sec)}>
                {getSectionName(sec)}
              </div>
            </Ripples>
          ))}
        </div>

        <label htmlFor="subject" onClick={toggle}>Subject</label>
        <div className="options subjects">
          {availableSubjects.map(sub => (
            <Ripples key={sub}>
              <div tabIndex={0} className={`option ${selectedSubject === sub ? 'active' : ''}`} onClick={() => setSelectedSubject(sub)}>
                {getSubjectName(sub)}
              </div>
            </Ripples>
          ))}
        </div>

        <Link to="/user/home">
          <div className='started'>
            <input type="button" value="Get started" className='get-started' onClick={handleClick} disabled={!isAllSelected} />
          </div>
        </Link>
      </form>
    </Wrapper>
  );
};

export default HomeList;