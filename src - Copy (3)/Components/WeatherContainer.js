import React, { useEffect, useState } from "react";
import { useData } from "../Components/DataContent";
import loading from "../Images/loading.gif";

export default function WeatherContainer() {
    const { data, placeSearch, setPlaceSearch, isLoading, isError, isFetching } =
        useData();

    const [temp, setTemp] = useState("");
    const [desc, setDesc] = useState("");
    const [icon, setIcon] = useState("");
    const [humidity, setHumidity] = useState("");
    const [speed, setSpeed] = useState("");
    const [country, setCountry] = useState("");
    const [place, setPlace] = useState(placeSearch);

    useEffect(() => {
        if (data) {
            const F = data.main.temp;
            const C = (F - 273.15).toFixed(2);

            const iconval = data.weather[0].icon;
            const imgurl = `https://openweathermap.org/img/w/${iconval}.png`;

            setTemp(C);
            setHumidity(data.main.humidity);
            setDesc(data.weather[0].description);
            setSpeed(data.wind.speed);
            setIcon(imgurl);
            setCountry(data.sys.country);
        }
    }, [data]);

    const handleInputChange = (e) => {
        const input = e.target.value;
        const formattedInput =
            input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        setPlace(formattedInput);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setPlaceSearch(place);
            setPlace("");
        }
    };

    useEffect(() => {
        if (isError) {
            setTemp("");
            setHumidity("");
            setDesc("");
            setSpeed("");
            setIcon("");
            setCountry("");
            setPlaceSearch("");
        }
    }, [isError]);

    return (
        <div className=" relative w-[400px] md:w-[500px] h-[600px] bg-slate-100  rounded-lg flex flex-col">
            <div className="w-full h-[20%] flex justify-center items-center ">
                <div className="relative w-[80%] h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden flex items-center">
                    <div className="h-full w-12 text-gray-300 grid place-items-center ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search something.."
                        value={place}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
                {isLoading || isFetching ? (
                    <div className="h-[100%] w-[80%] flex flex-col justify-center items-center ">
                        <img src={loading} className="w-[100%] h-[80%]" alt="Loading..." />
                    </div>
                ) : isError ? (
                    <h4 className="absolute left-0 right-0 top-28 text-center text-red-500 ">
                        Please Enter valid location!!!
                    </h4>
                ) : (
                    <div className=" w-[80%] bg-gray-200 p-3 rounded-lg flex flex-col justify-around items-start gap-16 ">
                        <div>
                            <h3>Place: {placeSearch}</h3>
                        </div>
                        <div>
                            <h4>Temp: {temp} &deg;C</h4>
                        </div>
                        <div className="flex items-center gap-2">
                            <div>
                                <h5>Description: {desc}</h5>
                            </div>
                            <div>
                                {icon && <img className="h-5 w-6" src={icon} alt="Icon" />}
                            </div>
                        </div>
                        <div>
                            <h5>Humidity: {humidity}%</h5>
                        </div>
                        <div className="flex">
                            <h5>
                                Wind Speed: {speed} m/s &nbsp;&nbsp;{country}
                            </h5>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
