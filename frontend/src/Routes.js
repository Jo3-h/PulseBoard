// Standard Import Statements
import React from "react";
import { Routes } from "react-router-dom";
import { Route, Navigate } from "react-router-dom";

// Import all App Routes
import Dashboard from "/components/Dashboard";
import Activity from "/components/Activity";

// Define all Application Routes
const AppRoutes = () => (
    <Routes>
        {/* Dashboard routes */}
        <Route path='/' element={<Dashboard />} />
<Route path='/activity' element={<Activity />} />


    </Routes>
)

export default AppRoutes;