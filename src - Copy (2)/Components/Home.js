import React, { useState } from 'react';
import { useAuth } from '../Authentication/AuthProvider';
import { useNavigate } from 'react-router-dom';
import WeatherContainer from './WeatherContainer';
import Modal from './Modal';
export default function Home({ condition }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        logOut();
        alert('Logout Successful');
        navigate('/', { replace: true });
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <header className="">
                <div className="px-3 bg-slate-200 flex justify-between items-center">
                    <div className="text-grey-400 text-4xl md:text-6xl t text-nowrap font-light font-fontt p-2 flex justify-center items-center">Weather App</div>
                    <div className="flex gap-5">
                        <button className="btn" onClick={handleLoginClick}>Fahrenheit (°F)</button>
                        <button className="btn" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </header>
            <main className="flex-1 bg-white flex justify-center items-center">
                <WeatherContainer condition={condition} />
            </main>
            {isModalOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 z-30 flex items-center justify-center">
                    {/* <div className="bg-white p-8 rounded shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Cats are small, carnivorous mammals known for their agility and playful behavior. They have retractable claws, sharp teeth, and excellent night vision, making them skilled hunters. Domesticated for thousands of years, cats are popular pets, valued for their companionship and independent nature. They communicate using a variety of vocalizations, body language, and purring. Cats also have a strong grooming instinct, often spending a significant portion of their day cleaning themselves.</h2>
                        <button className="btn" onClick={handleCloseModal}>Close</button>
                    </div> */}
                    <Modal value={23} handleCloseModal={handleCloseModal} />
                </div>
            )}
        </div>
    );
}
