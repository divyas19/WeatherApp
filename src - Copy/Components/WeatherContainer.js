// Required imports
import React from "react";
import "../Components/WeatherContainer.css";
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
    <div className="parent">
      <div className="sub-parent">
        <aside className="search-main">
          <form className="input">
            <div className="search-box">
              <input
                type="text"
                placeholder="Please enter location"
                value={placeSearch}
                className="input-value"
                onChange={(event) => {
                  setPlaceSearch(event.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
              <span
                className="searchicon-box"
                onClick={(event) => {
                  giveWeather(event);
                }}
              >
                <i className="fa search-icon">&#xf002;</i>
              </span>
            </div>
          </form>
        </aside>

        {isError && <h4 className="error">Please Enter valid location!!!</h4>}

        <main className="info-main">
          <h3 className="place-detail">Place : {place}</h3>

          <h4 className="temp-detail">Temp : {temp} &deg;C</h4>

          <div className="description-detail">
            <h5 className="description-type"> Description : {desc} </h5>

            {icon && (
              <img className="description-img" src={icon} alt="Icon"></img>
            )}
          </div>

          <h5 className="humidity-detail">Humidity : {humidity}%</h5>

          <h5 className="wind-detail">
            Wind Speed : {speed} m/s &nbsp;&nbsp;{country}
          </h5>
        </main>
      </div>
    </div>
  );
}
