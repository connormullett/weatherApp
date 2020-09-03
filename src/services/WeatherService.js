
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const API_BASE_URL = 'http://api.openweathermap.org/data/2.5';


async function getWeatherByGeoPosition(latitude, longitude) {
    const url = `${API_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;
    const response = await axios.get(url)
        .then((res) => {
            return res.data;
        });
    return response;
}


async function getHourlyForecast(latitude, longitude) {
    const url = `${API_BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;
    console.log(url);
    const response = await axios.get(url)
        .then((res) => {
            return res.data
        });
    return response;
}


export const weatherService = {
    getWeatherByGeoPosition,
    getHourlyForecast
};