import "./App.scss";
import SearchForm from "./SearchForm/SearchForm";
import CurrentData from "./CurrentData/CurrentData";
import AuthorInfo from "./AuthorInfo/AuthorInfo";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function App(props) {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({ ready: false });

  function callApi(city) {
    setCity(city);
  }

  useEffect(() => {
    if (city) {
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a00a4fb22b18bae5dbea39280ad220a&units=metric`;
      axios
        .get(apiUrl)
        .then(handleResponse)
        .catch((error) => {
          alert("Enter a valid city!");
        });
    }
  }, [city]);

  function handleResponse(response) {
    setWeatherData({
      ...weatherData,
      ready: true,
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: response.data.weather[0].icon,
      city: response.data.name,
      country: response.data.sys.country,
    });
  }

  return (
    <div className="container">
      <SearchForm callApi={callApi} />
      <CurrentData weatherData={weatherData} />
      <AuthorInfo />
    </div>
  );
}

export default App;