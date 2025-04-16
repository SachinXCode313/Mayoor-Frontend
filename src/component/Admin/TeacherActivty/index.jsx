import React, {useState,useEffect} from 'react'
import Wrapper from './style'
import backarrow from '../assets/backArrow.png'
import { useNavigate } from 'react-router'

const TeacherActivity = () => {
  const user = JSON.parse(localStorage.getItem("User"))
  const [teachers, setTeachers] = useState([]);

  // Function to load teachers from localStorage
  const loadTeachers = () => {
    const storedTeachers = localStorage.getItem('teachers');
    if (storedTeachers) {
      try {
        setTeachers(JSON.parse(storedTeachers));
      } catch (err) {
        console.error('❌ Error parsing teachers from localStorage:', err);
        setTeachers([]);
      }
    } else {
      setTeachers([]);
    }
  };

  // Load initial teachers and set up event listeners
  useEffect(() => {
    // Load teachers on mount
    loadTeachers();

    // Listener for same-tab updates (custom event)
    const handleTeachersUpdated = () => {
      loadTeachers();
    };

    // Listener for cross-tab updates (storage event)
    const handleStorageChange = (event) => {
      if (event.key === 'teachers') {
        loadTeachers();
      }
    };

    window.addEventListener('teachersUpdated', handleTeachersUpdated);
    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('teachersUpdated', handleTeachersUpdated);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const navigate = useNavigate()

  const handleChange = () => {
    navigate(-1)
  }

  return (
    <Wrapper>
      <div className='profile'>
        <div className='header'>
          <img src={backarrow} alt="BackArrow" onClick={handleChange} />
          <h2>Teacher Activity</h2>
        </div>
        <div className='container'>
          <div className="teacher-list">
            <h2>Teachers</h2>
            {teachers.length === 0 ? (
              <p>No teachers connected</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Last Seen</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={teacher.email || index}>
                      <td>{teacher.name || 'Unknown'}</td>
                      <td>{teacher.email}</td>
                      <td className={teacher.status === 'active' ? 'status-active' : 'status-inactive'}>
                        {teacher.status}
                      </td>
                      <td>{teacher.last_seen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default TeacherActivity
