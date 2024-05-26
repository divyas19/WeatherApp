import React, { useState, useEffect, createContext, useContext } from "react";
import axios from 'axios';
import { useQuery } from "react-query";


const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}



export default function DataProvider({ children, condition }) {

    const [placeSearch, setPlaceSearch] = useState('Delhi');

    const fetchWeatherData = async (placeSearch) => {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${placeSearch}&appid=5d59114180d91ab77ece2f9b8f901a1d`);
        return result.data;
    };

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
        ['data', placeSearch],
        () => fetchWeatherData(placeSearch),
        {
            enabled: false, // Initially disabled
            retry: false
        }
    );

    // Effect to trigger refetch when placeSearch changes
    useEffect(() => {
        refetch();
    }, [placeSearch]);

    return (
        <DataContext.Provider value={{ data, placeSearch, setPlaceSearch, isLoading, isError, error, isFetching }}>
            {children}
        </DataContext.Provider>
    );
}
