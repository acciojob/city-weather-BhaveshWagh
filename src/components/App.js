import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2d19741fec5e1ebbce4e4b02007b3734`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError("City not found");
          throw new Error("City not found");
        }
        setError("");
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setWeather({ error: error.message });
      }
    };

    if (city) {
      fetchApi();
    }
  }, [city]);

  function display() {
    if (search) {
      setCity(search);
      setSearch(""); // Clear the search input after a valid city is entered
    }
  }

  return (
    <div className="main" id="main">
      <div className="search">
        <input
          type="text"
          placeholder="Enter a city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={display}>Search</button>
      </div>
      <div className="weather">
        {error && <h2>{error}</h2>}
        {weather.main && (
          <>
            <h1>{city}</h1>
            <h2>{weather.main.temp}°C</h2>
            <h3>{weather.weather[0].description}</h3>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="weather icon"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
