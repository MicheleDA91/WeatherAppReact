import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const api = {
  key: "50c8df06c924d2847e6fd2b9597388ca",
  base: "https://api.openweathermap.org/data/2.5/"
}

const dateBuilder = (d) => {
  let months = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
  let days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return day + date + month + year;
}

function App() {

  const [query, setQuery] = useState('');
  const[weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <div className ={
          (typeof weather.main != "undefined")
          ? ((weather.main.temp > 16)
          ? 'app warm'
          : 'app')
          : 'app'}>
        
       <main>
         <div className='search-box'>
          <input 
              type='text'
              className='search-bar'
              placeholder = 'Cerca...'
              onChange={ e => setQuery(e.target.value)}
              value= {query}
              onKeyPress={search}>
              </input>
         </div>
         {(typeof weather.main != "undefined") ? (
           <div>
         <div className='location-box'>
           <div className='location'>{weather.name},{weather.sys.country} </div>
           <div className='date'>{dateBuilder(new Date())}</div>
         </div>
         <div className='weather-box'>
           <div className='temp'>
             {weather.main.temp}°C
           </div>
           </div>
          </div>
            ) :('')}
        </main>
        </div>
      </div>
    </div>
  );
}

export default App;
