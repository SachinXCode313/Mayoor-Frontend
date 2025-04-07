import React from 'react'
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

const AdminPanel = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="students" element={<Students />} />
                <Route path="aclist" element={<ACList />} />
                <Route path="lolist" element={<LOList />} />
                <Route path="rolist" element={<ROList />} />
                <Route path="pushNotification" element={<PushNotification />} />
                <Route path="/teacherList" element={<Teachers />} /> {/* Updated Route */}
                <Route path="/students" element={<StudentList />} /> {/* New Route */}
                <Route path="/addteacher" element={<AddTeacher />} />
                <Route path="/classview" element={<ClassView />} />
            </Route>
        </Routes>
    )
}

export default AdminPanel