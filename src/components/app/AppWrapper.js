import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '../../contexts/AuthContext';
import RegisterPage from '../../pages/RegisterPage';
import LoginPage from '../../pages/LoginPage';
import ProtectedRoute from '../../routes/ProtectedRoute';

import HomePage from '../../pages/HomePage';
import MainHomePage from '../../pages/MainHomePage';
import DataProvider from '../../contexts/DataContext';

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
        <DataProvider >
            <Routes>
                <Route path="/" element={<MainHomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            </Routes>
        </DataProvider>
    );
};

export default AppWrapper;