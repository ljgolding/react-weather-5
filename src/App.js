import React from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Weather App </h1> 
        <Weather defaultCity="Calgary" />
      <footer>
        This project was coded by Lindsay Golding and is{" "}
      <a
        href="https://github.com/ljgolding/react-weather-5"
        target="_blank"
        rel="noopener noreferrer"
      >
        open-sourced on Github
      </a>
      </footer>
    </div>
    </div>
  );

}


