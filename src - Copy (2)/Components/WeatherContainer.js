import React from 'react';
import { useState, useEffect } from "react";

export default function WeatherContainer() {

    const [placeSearch, setPlaceSearch] = useState(""); //Value inside search box
    const [place, setPlace] = useState("Delhi"); //Value displayed as data with initial value as Delhi
    const [isError, setIsError] = useState(false);
    //Set values once fetched from API
    const [temp, setTemp] = useState("");
    const [desc, setDesc] = useState("");
    const [icon, setIcon] = useState("");
    const [humidity, setHumidity] = useState("");
    const [speed, setSpeed] = useState("");
    const [country, setCountry] = useState("");

    const fetchInitialWeatherData = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=5d59114180d91ab77ece2f9b8f901a1d`;
            // const url = `https://api.openweathermap.org/data/2.5/weather?q=Delhi&county=IN&appid=apiKey`;

            const data = await fetch(url);
            const parsedData = await data.json();

            const F = parsedData.main.temp;
            const C = (F - 273.15).toFixed(2);

            const iconval = parsedData.weather[0].icon;
            const imgurl = `http://openweathermap.org/img/w/${iconval}.png`;

            setTemp(C);
            setHumidity(parsedData.main.humidity);
            setDesc(parsedData.weather[0].description);
            setSpeed(parsedData.wind.speed);
            setIcon(imgurl);
            setCountry(parsedData.sys.country);
        } catch (error) {
            console.log("Some error Occurred!!!", error);
            setIsError(true);
        }
    };

    const setCapsPlaceSearch = (event) => {
        const place = event.target.value;
        const start = place.charAt(0).toUpperCase();
        const capsPlace = start + place.substring(1);
        setPlace(capsPlace);
    };

    //To fetch data on Pressing Key
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            giveWeather(event);
        }
    };

    const giveWeather = async (e) => {
        e.preventDefault();
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${placeSearch}&appid=5d59114180d91ab77ece2f9b8f901a1d`;
            // const url = `https://api.openweathermap.org/data/2.5/weather?q=${placeSearch},IN&appid=apiKey`;
            // const url = `https://api.openweathermap.org/data/2.5/weather?q=${placeSearch}&county=IN&appid=apiKey`;

            const data = await fetch(url);
            const parsedData = await data.json();

            if (parsedData.cod >= 400 || placeSearch.length <= 0) {
                setIsError(true);
                setTimeout(() => {
                    setIsError(false);
                    setPlaceSearch("");
                }, 1000);
                return;
            }

            setPlaceSearch(""); //Setting search value as empty
            setCapsPlaceSearch(e); //To set the first letter of the place as Capital

            const F = parsedData.main.temp;
            const C = (F - 273.15).toFixed(2);

            const iconval = parsedData.weather[0].icon;
            const imgurl = `https://openweathermap.org/img/w/${iconval}.png`;

            setTemp(C);
            setHumidity(parsedData.main.humidity);
            setDesc(parsedData.weather[0].description);
            setSpeed(parsedData.wind.speed);
            setIcon(imgurl);
            setCountry(parsedData.sys.country);
        } catch {
            console.log("Some error Occurred!!!");
            alert("Network Error!!!");
        }
    };

    useEffect(() => {
        fetchInitialWeatherData();
    }, []);

    return (
        <div className='bg-slate-100 w-[400px] md:w-[500px] h-[600px] rounded-lg flex flex-col relative'>
            <div className='w-full flex justify-center items-center h-[20%] '>
                {/* <input className='w-[80%]' type="text" placeholder='Enter Place' /> */}
                <div class="  relative flex items-center w-[80%] h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div class="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search something.."
                        value={placeSearch}

                        onChange={(event) => {
                            setPlaceSearch(event.target.value);
                        }}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </div>
            {isError && <h4 className=" top-28  text-center text-red-500 absolute left-0 right-0 ">Please Enter valid location!!!</h4>}
            <div className='  flex-1 flex justify-center items-center'>
                <div className='bg-gray-200 flex flex-col justify-around items-start w-[80%] gap-16 p-3 rounded-lg'>
                    <div >
                        <h3>Place : {place}</h3>
                    </div>
                    <div >
                        <h4>Temp :  {temp} &deg;C</h4>
                    </div>
                    <div >
                        <div className='flex items-center gap-2'>
                            <div >
                                <h5> Description :  {desc}</h5>
                            </div>
                            <div >
                                {icon && (
                                    <img className="h-5 w-6" src={icon} alt="Icon"></img>)}
                            </div>
                        </div>
                    </div>
                    <div >
                        <h5>Humidity : {humidity}%</h5>
                    </div>
                    <div className='flex ' >
                        <h5>Wind Speed : {speed} m/s &nbsp;&nbsp;{country}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
