import React, {useState} from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props){
  const[city, setCity] = useState(props.defaultCity);
  const[weatherData, setWeatherData] = useState({ready: false});

  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      humidity:response.data.main.humidity,
      wind: response.data.wind.speed,
      city: response.data.name, 
      iconUrl: "https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png",
      description:response.data.weather[0].description,
      date: "Wednesday 07:00"
  });

  }

  if (weatherData.ready) {  
    return (
      <div className="Weather">
       <form> 
        <div className="row">
            <div className="col-9">
        
                <input
                    type="search"
                    placeholder="Enter a city.."
                    className="form-control"
                    auto-focus="on"
                />
             </div>
          <div className="col-3">
          <input type="submit" value="search" className="btn btn-primary"/>
          </div>
          </div>
        </form>
        

        <h1>{weatherData.city}</h1>
        <ul>
          <li> {weatherData.date}</li>
          <li className="text-capitalize">{weatherData.description}</li>
        </ul>
        <div className="row mt-3">
          <div className="col-6">
            <div className="clearfix">
            <img
              src={weatherData.iconUrl}
              alt={weatherData.description}
              className="float-left"
            />  
            
   
           <span className="temperature"> {Math.round(weatherData.temperature)}</span>
           <span className="unit">°C</span>
        </div>
          </div>
          <div className="col-6">
            <ul>
              <li> Humitidty: {weatherData.humidity}%</li>
              <li> Wind: {Math.round(weatherData.wind)} km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
} else {
    const apiKey = "f3dfa8d7baf16dece455736a2124255f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
       axios.get(apiUrl).then(handleResponse);
  return "Loading...";
}
}