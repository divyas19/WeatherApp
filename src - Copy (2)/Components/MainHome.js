import React from 'react';
import { Link } from 'react-router-dom';
import MainPageImage from "../Images/MainPageImage.jpg";

export default function MainHome() {
    return (
        <div className=' h-screen overflow-hidden flex flex-col'>
            <div className='h-20 w-full fixed top-0 p-5  md:p-0  bg-white  flex justify-between items-center '>
                <div className='font-bold text-4xl px-3'>Cats Gallery</ div>
                <div className='flex justify-center  gap-5 px-3'>
                    <button className='btn'> <Link to="/register">Register</Link></button>
                    <button className='btn'> <Link to="/login">Login</Link></button>
                </div>
            </div>
            <hr />
            <div className='flex-1 bg-slate-100 flex justify-center md:items-center '>
                <div className='w-[80%] h-[60%] md:h-[70%] bg-white p-4 mt-[20%] md:mt-20  hover:shadow-lg transition-shadow duration-500 '>
                    <div className='h-full flex flex-col md:flex-row '>
                        <img
                            className='h-[40%] md:h-[100%]  md:w-1/3 '
                            src={MainPageImage}
                            alt='cat'
                        />
                        <div className='md:w-2/3 p-5 md:text-xl md:leading-relaxed flex justify-center items-center '>
                            Cat Gallery is a delightful website that generates 10 random cat images for your enjoyment. Each visit to the site offers a new collection of adorable feline photos, ensuring endless fun for cat lovers. To access these charming images, simply register and log in to the website. Once you're in, you can easily view and share the URLs of these cute cat pictures with friends and family. Dive into the world of Cat Gallery and let the cuteness brighten your day!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
