import React, { Component } from 'react'
import { weatherService } from '../services/WeatherService';

export class Forecast extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lat: this.props.latitude,
            long: this.props.longitude,
            loading: true,
            weatherData: {}
        };
    }

    async componentDidMount() {
        const weatherData = await weatherService.getHourlyForecast(this.state.lat, this.state.long)
        this.setState({
            weatherData: weatherData,
            loading: false
        })
        console.log(this.state.weatherData);
    }

    render() {
        return (
            <div>
                <h1>Forecast</h1>
            </div>
        )
    }
}

export default Forecast
