import React, { Component } from 'react'
import { weatherService } from '../services/WeatherService';
import { ForecastItem } from './ForecastItem';
import { Link } from 'react-router-dom';
import './Forecast.css'

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
                <div className="forecast">
                    <div>
                        <h1>Forecast</h1>
                    </div>
                    <div>
                        <table className="data-table">
                            <thead style={{
                                textAlign: 'left',
                            }}>
                                <tr>
                                    <th>time</th>
                                    <th>temperature</th>
                                    <th>feels like</th>
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
                    <div><Link style={linkStyle} to="/">Back</Link></div>
                </div>
            )
        } else {
            return (
                <div style={loadingStyle}>
                    <h1>Loading</h1>
                </div>
            )
        }
    }
}


const loadingStyle = {
    margin: 'auto',
    textAlign: 'center',
    verticalAlign: 'bottom'
}

const linkStyle = {
    position: 'relative',
    marginTop: '20px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#4B4B5E',
    padding: '8px',
    borderRadius: '10px',
    top: '1em'
}

export default Forecast
