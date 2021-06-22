import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import countries from 'i18n-iso-countries';
// import './reset.css';
// const moment = require('moment-timezone');



countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('New York');
  const [state, setState] = useState('New York');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);


  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return ((k - 273.15) * 9/5 + 32).toFixed(0);
  };

  // debugger
  const sunriseSunset = (data) => {
    if (data){
      let date = new Date(data * 1000)
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();

      var formattedTime = hours + ':' + minutes.substr(-2)
      return formattedTime
    }
  }

  const showMore = () => {
    let element = document.querySelector('.more-info');
    let currentDisplay = document.querySelector('.more-info').style.display
    if (currentDisplay === 'block'){
      element.style.display = 'none'
    }else{
      element.style.display = 'block'
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>React Weather App</h2>
      </header>
      <div className='main-part'>
        <div className='location-input'>
          <div className='text'>
            Enter location:
          </div>
          <div>
            <input 
            type='text' id='location-name' onChange={inputHandler}
            value={getState}
            />
          </div>
          <button className='btn-location' onClick={submitHandler}>
            Search
          </button>
        </div>

        <div className='show-results'>
          {apiData.main ? (
            <div className='card-body'>
              <img src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}/>

              <p className='h2'>
                {kelvinToFarenheit(apiData.main.temp)}&deg; F
              </p>

              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{' '}
                <strong>{apiData.name}</strong>
                <br/>
                <strong>
                    {' '}
                    {countries.getName(apiData.sys.country, 'en', {
                      select: 'official',
                    })}
                </strong>
              </p>

              <div>
                <div>
                  <p>
                    <i class="fa fa-thermometer-empty" aria-hidden="true"></i>
                    Low: &nbsp;
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_min)}&deg; F
                    </strong>
                  </p>
                  <p>
                    <i className="fas fa-temperature-high"></i>
                    High: &nbsp;
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_max)}&deg; F
                    </strong>
                  </p>
                </div>
                <p>
                  {' '}
                  <strong>{apiData.weather[0].main}</strong>
                </p>
              </div>
              <button onClick={showMore}>Load/Hide More</button>
              <div className='more-info'>
                <hr/>
                <p>
                  Wind: &nbsp; 
                  {(apiData.wind.speed * 2.236936).toFixed(1)} mph
                  {/* {apiData.wind.deg} */}
                </p>
                <hr/>
                <p>
                  Humidity: &nbsp;
                  {apiData.main.humidity} &#37;
                </p>
                <hr/> 
                <p>
                  Pressure: &nbsp;
                  {(apiData.main.pressure * 0.02953).toFixed(2)} in
                </p>
                <hr/>
                <p>
                  Sunrise: &nbsp;
                  {sunriseSunset(apiData.sys.sunrise)}
                  <br/>
                  Sunset: &nbsp;
                  {sunriseSunset(apiData.sys.sunset)}
                </p>

              </div>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
