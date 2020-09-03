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
            const area = this.state.weatherData.name;
            return (
                <div style={weatherStyle}>
                    <h1>Current weather for {this.capitalize(area)} area</h1>
                    <h3>{this.capitalize(description)}</h3>
                    <p>Currently {this.floor(temp)}F</p>
                    <p>feels like {this.floor(feels_like)}F</p>
                    <Link style={linkStyle} to="/forecast">Forecast</Link>
                </div>
            )
        } else {
            return (
                <div style={loadingStyle}>
                    <h1>Loading ... </h1>
                </div>
            )
        }
    }
}

const weatherStyle = {
    width: '80vw',
    height: '40vh',
    maxWidth: '1300px',
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: '#1E1E27',
    marginTop: '20px',
    padding: '20px',
    borderRadius: '15px',
    color: 'white',
    fontWeight: 'bold'
}

const linkStyle = {
    position: 'relative',
    marginTop: '20px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#4B4B5E',
    padding: '8px',
    borderRadius: '10px',
    top: '5em'
}

const loadingStyle = {
    margin: 'auto',
    textAlign: 'center'
}

export default Home
