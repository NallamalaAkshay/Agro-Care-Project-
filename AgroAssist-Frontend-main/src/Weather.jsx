import Search from "./components/search/search";
import "./Weather.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { useState, useEffect } from "react";

function Weather() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Fetch weather data when location changes
  useEffect(() => {
    if (location.lat && location.lon) {
      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const weatherAlerts = fetch(`https://api.weatherbit.io/v2.0/alerts?lat=${location.lat}&lon=${location.lon}&key=f535c04226c948d0a30ac9ef61cbf3fa`)
      Promise.all([currentWeatherFetch, forecastFetch, weatherAlerts])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();
          const alertsResponse = await response[2].json();
          console.log(alertsResponse)
          setCurrentWeather({ city: alertsResponse.city_name, ...weatherResponse });
          setForecast({ city: alertsResponse.city_name, ...forecastResponse });
          setAlerts({ city: alertsResponse.city_name, ...alertsResponse });
        })
        .catch((err) => console.log(err));
    }
  }, [location]);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setErrorMessage(error.message);
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const weatherAlerts = fetch(`https://api.weatherbit.io/v2.0/alerts?lat=${lat}&lon=${lon}&key=17184c7e27a841b5bc0e71f7cd55bc52`)
    Promise.all([currentWeatherFetch, forecastFetch, weatherAlerts])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const weatherAlertsData = await response[2].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setAlerts({ city: weatherAlertsData.city_name, ...weatherAlertsData })
      })
      .catch((err) => console.log(err));
  };
  console.log(alerts.alerts)

  return (
    <div className="container">
      {errorMessage && <p>{errorMessage}</p>}
      <Search onSearchChange={handleOnSearchChange} />
      <div className="top-cop">
        {currentWeather && <CurrentWeather data={currentWeather} />}
        <div class="card">
          <div class="header">
            <p>Weather Alerts</p>
          </div>
          <div class="container">
          {alerts.alerts && alerts.alerts.length > 0 ? (
             alerts.alerts.map((e, index) => (
              <p key={index}>{e.description}</p>
            ))
            ) : (
              <>No Warning Alerts Right Now</>
            )}
          </div>
        </div>
      </div>
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default Weather;
