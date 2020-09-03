import React, { Component } from 'react'
import { weatherService } from '../services/WeatherService';
import { ForecastItem } from './ForecastItem';
import { Link } from 'react-router-dom';

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
    }

    render() {
        if (!this.state.loading) {
            const data = this.state.weatherData.list.slice(0, 12);
            return (
                <div>
                    <div>
                        <h1>Forecast</h1>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>time</th>
                                    <th>temperature</th>
                                    <th>will feel like</th>
                                    <th>humidity</th>
                                    <th>overview</th>
                                </tr>
                            </thead>
                            <tbody>
                                { data.map((forecastData) => (
                                    <tr>
                                        <ForecastItem key={forecastData.dt} data={forecastData} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div><Link to="/">Back</Link></div>
                </div>
            )
        } else {
            return <h1>Loading</h1>
        }
    }
}

export default Forecast
