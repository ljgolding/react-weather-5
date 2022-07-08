import React, {useState} from "react";
import axios from "axios";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props){
  const[weatherData, setWeatherData] = useState({ready: false});
  const[city, setCity] = useState(props.defaultCity);
  
  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      city: response.data.name,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
    });

  }

function handleSubmit(event) {
  event.preventDefault();
  search();
  //search for a city
}

function handleCityChange(event) {
setCity(event.target.value);

}

function search() {
      const apiKey = "f3dfa8d7baf16dece455736a2124255f";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(handleResponse);
}

  if (weatherData.ready) {  
    return (
      <div className="Weather">
       <form onSubmit={handleSubmit}> 
        <div className="row">
            <div className="col-9">
        
                <input
                    type="search"
                    placeholder="Enter a city.."
                    className="form-control"
                    auto-focus="on"
                    onChange={handleCityChange}
                />
             </div>
          <div className="col-3">
          <input type="submit" value="search" className="btn btn-primary"/>
          </div>
          </div>
        </form>
        < WeatherInfo data={weatherData}  />
        < WeatherForecast coordinates={weatherData.coordinates}/>

        
      </div>
    );
} else {
  search();
  return "Loading...";
}
}