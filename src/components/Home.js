import React, { Component } from 'react'
import { weatherService } from '../services/WeatherService';
import { Link } from 'react-router-dom';

export class Home extends Component {

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
        const weatherData = await weatherService.getWeatherByGeoPosition(this.state.lat, this.state.long);
        this.setState({
            weatherData: weatherData,
            loading: false
        });
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    floor = (num) => {
        return num | 0;
    }

    render() {
        if (!this.state.loading)
        {
            const description = this.state.weatherData.weather[0].description;
            const {temp, feels_like} = this.state.weatherData.main;
            return (
                <div>
                    <div>
                        <h1>{this.capitalize(description)}</h1>
                        <p>Currently {this.floor(temp)}F</p>
                        <p>feels like {this.floor(feels_like)}F</p>
                    </div>
                    <div>
                        <Link to="/forecast">Forcast</Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading ... </div>
            )
        }
    }
}

export default Home