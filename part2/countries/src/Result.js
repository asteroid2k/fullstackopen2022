import { useEffect, useState } from "react";
import axios from "axios";

const CountryDetails = ({ details }) => {
  const languages = details.languages ? Object.values(details.languages) : [];
  return (
    <div>
      <h2>{details.name.common}</h2>
      <p>Capital {details.capital}</p>
      <p>Area {details.area}</p>
      <p>Languages</p>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={details.flags.svg} alt="flag" width={150} />
      <br />
      <WeatherDetails capital={details.capital || details.name.common} />
    </div>
  );
};

const WeatherDetails = ({ capital }) => {
  const [weather, setWeather] = useState({});

  const fetchWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
      .then((res) => {
        setWeather(res.data);
      });
  };
  useEffect(fetchWeather, []);

  const isFetched = "coord" in weather;

  return (
    <div>
      <h2>Weather in {capital}</h2>
      {isFetched ? (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed}m/s</p>
        </div>
      ) : (
        "Fetching weather..."
      )}
    </div>
  );
};

const Result = ({ results }) => {
  const [countries, setCountries] = useState(results);
  const showCountry = (name) => {
    const cty = countries.filter((country) => country.name.official === name);
    setCountries(cty);
  };
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div
            key={country.name.official}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <p>{country.name.common}</p>
            <button
              style={{ fontSize: "10px", height: "fit-content" }}
              onClick={() => {
                showCountry(country.name.official);
              }}
            >
              Show
            </button>
          </div>
        ))}
      </div>
    );
  } else return <CountryDetails details={countries[0]} />;
};
export default Result;
