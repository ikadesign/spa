import React from 'react';
import axios from 'axios';

import './weather.scss';
import WeatherData from './WeatherData'

export default class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherApi: []
    }
  }

  componentDidMount() {
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=4f7477d6430607fced1911ec2077fee8';

    axios.get(URL)
      .then(res => {
        const gotItems = res.data;
        console.log(res.data.main.temp);
        this.setState({ 
          weatherApi: gotItems 
        }, function() {
          // console.log(this.state.weatherApi)
        });
      });  
  }
  render() {
    return(
      <div className="weather-page">
        <h2 className="weather-title">Weather api</h2>
        <div className="weather-container">
          <WeatherData weatherApi={this.state.weatherApi} />
        </div>
      </div>
    )
  }
}