import { useState } from "react";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import UserPanel from "../User";
import Login from "../Login";
import AdminPanel from "../Admin";
const App = () => {
    const [user, setUser] = useState();
    const [loItems, setLoItems] = useState([]);
    const [acItems, setAcItems] = useState([]);
    const [studentsData, setStudentsData] = useState([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                {/* <Route element={<PrivateRoute />}> */}
                <Route >
                    <Route path="/user/*" element={<UserPanel />} />
                        
                    <Route path="/admin/*" element={<AdminPanel />} />
                </Route>

                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
