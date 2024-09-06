import React, { useState } from "react";

export const WheatherApp = () => {
  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "e13fefbdc04153fc6442032e5564fbb7";

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setdataClima] = useState(null);
  const difkelvin = 273.15;

  const handleSubmit = (e) => {
    //console.log("buscando ciudad");
    e.preventDefault();
    if (ciudad.length > 0) fetchClima(ciudad);
  };
  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
    //console.log("buscando ciudad", e.target.value);
  };

  const fetchClima = async (ciudad) => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setdataClima(data);

      console.log("ciudad recibida:", data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Aplicación de Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>

      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {parseInt(dataClima.main.temp - difkelvin)}ºC</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
};
