import React, {useState} from 'react'
import { Route, Routes } from "react-router-dom";
import Layout from './Layout'
import Home from './Home'
import Students from './Students'
import ACList from './ACList'
import LOList from './LOList'
import ROList from './ROList'
import PushNotification from './PushNotification'
import Teachers from './TeacherList/index.jsx'
import StudentList from './Students/index.jsx'
import AddTeacher from './AddTeacher/index.jsx'
import ClassView from './Classview/index.jsx';
import MappingTree from './MappingTree/index.jsx';
import Profile from './Profile/index.jsx';


const AdminPanel = () => {
    const [loItems, setLoItems] = useState([])
    const [acItems, setAcItems] = useState([])
    const [studentsData, setStudentsData] = useState([])
    const [user, setUser] = useState(null)

    // Default filters
    const [filters, setFilters] = useState({
        year: "2024",
        classname: "1",
        section: "1",
        subject: "1",
        quarter: "1"
    });

    const handleLoItems = (data) => setLoItems(data)
    const handleAcItems = (data) => setAcItems(data)
    const handleStudentsData = (data) => setStudentsData(data)


    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ClassView user={user} filters={filters} setFilters={setFilters} />} />
                <Route path="students" element={<Students onStudentsData={handleStudentsData} />} />
                <Route path="aclist" element={<ACList acItems={acItems} setAcItems={setAcItems} handleAcItems={handleAcItems} studentsData={studentsData} user={user} filters={filters} setFilters={setFilters} />} />
                <Route path="lolist" element={<LOList loItems={loItems} setLoItems={setLoItems} handleLoItems={handleLoItems} acItems={acItems} setAcItems={setAcItems} filters={filters} setFilters={setFilters} />} />
                <Route path="rolist" element={<ROList loItems={loItems} setLoItems={setLoItems} handleLoItems={handleLoItems} acItems={acItems} filters={filters} setFilters={setFilters} />} />
                <Route path="/pushNotification" element={<PushNotification />} />
                <Route path="/teachers" element={<Teachers />} /> 
                <Route path="/Mapping" element={<MappingTree />} /> 
                <Route path="/students" element={<StudentList />} /> 
                <Route path="/addteacher" element={<AddTeacher />} />
                <Route path="/classview" element={<ClassView />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default AdminPanel