import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import Login from "../User/Login";
import Home from "../User/Home";
import HomeList from "../User/Homelist";
import ClassView from "../User/Classview/Classview";
import StudentList from "../User/Students/StudentSelect";
import ROlist from "../User/RO_List";
import LOlist from "../User/LO_List";
import AClist from "../User/AC_List";
import Dashboard from "../User/Dashboard";
import MappingTree from "./MappingTree";
import Profile from "./Profile";
const UserPanel = () => {
    const [user, setUser] = useState();
    const [loItems, setLoItems] = useState([]);
    const [acItems, setAcItems] = useState([]);
    const [studentsData, setStudentsData] = useState([]);

    return (
        <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route index element={<Navigate to="homelist" replace />} />
            <Route path="homelist" element={<HomeList />} />

            {/* Parent route for Home */}
            <Route path="/home/" element={<Home />}>
                {/* Default redirect to /home/classview */}
                <Route index element={<Navigate to="classview" replace />} />
                <Route path="classview" element={<ClassView user={user} />} />
                <Route path="students" element={<StudentList onStudentsData={setStudentsData} />} />
                <Route path="ro" element={<ROlist loItems={loItems} setLoItems={setLoItems} acItems={acItems} />} />
                <Route path="lo" element={<LOlist loItems={loItems} setLoItems={setLoItems} acItems={acItems} setAcItems={setAcItems} />} />
                <Route path="ac" element={<AClist acItems={acItems} setAcItems={setAcItems} studentsData={studentsData} user={user} />} />
            </Route>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="mapping-tree" element={<MappingTree />} />
            <Route path="profile" element={<Profile />} />
        </Routes>
    );
};

export default UserPanel;
