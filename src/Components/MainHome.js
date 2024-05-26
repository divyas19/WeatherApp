import React from 'react';
import { Link } from 'react-router-dom';
import mainPageImage from "../Images/mainPageImage.jpg";

export default function MainHome() {
    return (
        <div className=' h-screen overflow-hidden flex flex-col'>
            <div className='h-20 w-full fixed top-0 p-0 md:p-5  bg-white  flex justify-between items-center '>
                <div className='font-bold text-4xl md:text-4xl px-3'>Weather App</ div>
                <div className='flex justify-center  gap-3 md:gap-5 px-3'>
                    <button className='btn'> <Link to="/register">Register</Link></button>
                    <button className='btn'> <Link to="/login">Login</Link></button>
                </div>
            </div>
            <hr />
            <div className='flex-1 bg-slate-100 flex justify-center md:items-center '>
                <div className=' w-[90%] md:w-[80%] h-[60%] md:h-[60%] bg-white p-4 mt-[27%] md:mt-20  hover:shadow-lg transition-shadow duration-500 '>
                    <div className='h-full flex flex-col md:flex-row '>
                        <img
                            className='h-[40%] md:h-[100%]  md:w-1/3 '
                            src={mainPageImage}
                            alt='main-page'
                        />
                        <div className='md:w-2/3 p-7 md:text-xl md:leading-relaxed flex justify-center items-center '>
                            Enter the realm of real-time weather wonders with the Weather App. Simply input your location, and instantly access vital meteorological details like temperature, wind speed, humidity, and atmospheric descriptions. From planning outdoor excursions to staying informed, this app puts weather insights at your fingertips, making every journey a breeze.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
