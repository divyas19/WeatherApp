import React from 'react'
import { useData } from './DataContent';

export default function Modal({ value, handleCloseModal }) {

    const { data } = useData();
    const valueInF = data.main.temp

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 z-30 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md flex justify-center flex-col">
                <h2 className="text-2xl font-bold mb-4">Fahrenheit (°F) : {valueInF}</h2>
                <button className="btn " onClick={handleCloseModal}>Close</button>
            </div>
        </div>
    );
};