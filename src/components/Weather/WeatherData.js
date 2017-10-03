import React from 'react';

export default class WeatherData extends React.Component {
  render() {
    console.log(this.props.weatherApi);
    const weather = this.props.weatherApi.main;
    console.log(weather);
    return(
      <div className='weather-page'>

      </div>
    )
  }
}