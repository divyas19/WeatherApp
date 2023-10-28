import React from "react";
import "../Components/WeatherContainer.css";
import { useState, useEffect } from "react";

export default function PlaceBox() {
  const [placeSearch, setPlaceSearch] = useState("");
  const [place, setPlace] = useState("Mumbai");
  const [error, setError] = useState(false);
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState("");
  const [speed, setSpeed] = useState("");
  const [country, setCountry] = useState("");

  const fetchWeatherForMumbai = async () => {
    try {
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&county=IN&appid=apiKey`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=apiKey`;
      const data = await fetch(url);
      const parsedData = await data.json();

      const F = parsedData.main.temp;
      const C = (F - 273.15).toFixed(2);

      const iconval = parsedData.weather[0].icon;
      const imgurl = `http://openweathermap.org/img/w/${iconval}.png`;

      setPlace("Mumbai");
      setTemp(C);
      setHumidity(parsedData.main.humidity);
      setDesc(parsedData.weather[0].description);
      setHumidity(parsedData.main.humidity);
      setSpeed(parsedData.wind.speed);
      setIcon(imgurl);
      setCountry(parsedData.sys.country);
    } catch (error) {
      console.log("Some Error Occurred!!!", error);
      setError(true);
    }
  };

  const setCapsPlaceSearch = (event) => {
    const place = event.target.value;
    const start = place.charAt(0).toUpperCase();
    const capsPlace = start + place.substring(1);
    setPlace(capsPlace);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      giveWeather(event);
    }
  };

  const giveWeather = async (e) => {
    e.preventDefault();
    try {
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=${placeSearch},IN&appid=apiKey`;
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=${placeSearch}&county=IN&appid=apiKey`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${placeSearch}&appid=apiKey`;

      console.log("Place " + place);
      console.log("url " + url);

      const data = await fetch(url);
      const parsedData = await data.json();

      setPlaceSearch("");

      if (parsedData.cod >= 400 || placeSearch.length <= 0) {
        setError(true);
        setTimeout(() => {
          setError(false);
          setPlaceSearch("");
        }, 2000);
        return;
      }
      const F = parsedData.main.temp;
      const C = (F - 273.15).toFixed(2);

      const iconval = parsedData.weather[0].icon;
      const imgurl = `http://openweathermap.org/img/w/${iconval}.png`;

      setCapsPlaceSearch(e);
      setTemp(C);
      setHumidity(parsedData.main.humidity);
      setDesc(parsedData.weather[0].description);
      setHumidity(parsedData.main.humidity);
      setSpeed(parsedData.wind.speed);
      setIcon(imgurl);
      setCountry(parsedData.sys.country);

      console.log("Response " + parsedData);
      console.log("Place " + place);
      console.log("Weather " + parsedData.weather);
      console.log("Temp " + parsedData.main.temp);
      console.log("Description " + parsedData.weather[0].description);
      console.log("Icon " + parsedData.weather[0].icon);
      console.log("imgurl " + imgurl);
      console.log("Humidity " + parsedData.main.humidity);
      console.log("Speed " + parsedData.wind.speed);
      console.log("Country " + parsedData.sys.country);
    } catch {
      console.log("Some Error Occurred!!!");
      alert("Network Error!!!");
    }
  };

  useEffect(() => {
    fetchWeatherForMumbai();
  }, []);

  return (
    <>
      <div className="parent">
        <div className="sub-parent">
          <div className="search-main">
            <form className="input">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Please enter location"
                  value={placeSearch}
                  className="input-value"
                  onChangeCapture={(event) => {
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
          </div>
          {error && <h4 className="error">Please Enter valid location!!!</h4>}

          <div className="info-main">
            <div className="place-det">
              <h3>Place : {place}</h3>
            </div>
            <div className="temp-det">
              <h4>Temp : {temp} &deg;C</h4>
            </div>
            <div className="desc-det">
              <div className="type-det">
                <div className="type-det-desc">
                  <h5> Description : {desc} </h5>
                </div>
                <div className="type-det-img">
                  {icon && <img src={icon} alt="Icon"></img>}
                </div>
              </div>
            </div>
            <div className="humidity-det">
              <h5>Humidity : {humidity}%</h5>
            </div>
            <div className="wind-det">
              <h5>Wind Speed : {speed} m/s</h5>
              <h5>&nbsp;&nbsp;{country}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
