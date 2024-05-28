import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import WeatherContainer from '../components/container/WeatherContainer';
import Modal from '../components/modal/Modal';

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        setIsModalOpen(true);
    };

    const handleLogout = () => {
        logOut();
        alert('Logout Successful');
        navigate('/', { replace: true });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="h-screen overflow-hidden flex flex-col ">
            <header className="">
                <div className="px-3 bg-slate-200 flex justify-between items-center">
                    <div className="text-grey-400  md:text-4xl t text-nowrap font-bold text-4xl px-3
                     p-2 flex justify-center items-center">Weather App</div>
                    <div className="flex md:gap-5 gap-3">
                        <button className="btn" onClick={handleLoginClick}>Fahrenheit (°F)</button>
                        <button className="btn" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </header>
            <main className="flex-1 bg-white flex justify-center items-center">
                <WeatherContainer />
            </main>
            {isModalOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 z-30 flex items-center justify-center">
                    <Modal handleCloseModal={handleCloseModal} />
                </div>
            )}
        </div>
    );
}
