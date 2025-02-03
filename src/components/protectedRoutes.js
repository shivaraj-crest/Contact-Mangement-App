import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ResponsiveAppBar from './Header';
const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    if(!token){
        console.log("token not found");
        return <Navigate to="/login" />;
    }
    
    return (
        <div>
            <ResponsiveAppBar />
            <Outlet />
        </div>
    )

};

export default ProtectedRoute;
