import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '../Authentication/AuthProvider';
import Register from '../Authentication/Register';
import Login from '../Authentication/Login';
import ProtectedRoute from '../Authentication/ProtectedRoute';

import Home from '../Components/Home';
import MainHome from '../Components/MainHome';
import DataProvider from './DataContent';

const queryClient = new QueryClient();

const AppWrapper = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router>
                    <MainApp />
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    );
};

const MainApp = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/home';

    return (
        <DataProvider condition={isHomePage}>
            <Routes>
                <Route path="/" element={<MainHome />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            </Routes>
        </DataProvider>
    );
};

export default AppWrapper;