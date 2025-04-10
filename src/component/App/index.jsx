import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UserPanel from "../User";
import Login from "../Login";
import AdminPanel from "../Admin";
const App = () => {
    const RoleBasedRoute = ({ role, children }) => {
        const userRole = localStorage.getItem("role");
        return userRole === role ? children : <Navigate to="/" />;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                {/* <Route element={<PrivateRoute />}> */}
                <Route >
                    <Route
                        path="/user/*"
                        element={
                            <RoleBasedRoute role="teacher">
                                <UserPanel />
                            </RoleBasedRoute>
                        } />

                    <Route
                        path="/admin/*"
                        element={
                            <RoleBasedRoute role="admin">
                                <AdminPanel />
                            </RoleBasedRoute>
                        }
                    />
                </Route>

                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
