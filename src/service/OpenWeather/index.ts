import axios from 'axios';
import * as dotenv from 'dotenv';
import {
    CurrentWeatherInterface,
    IconInterface,
    // eslint-disable-next-line comma-dangle
    TempInterface
} from './weather.interface';

dotenv.config();

/**
 * class OpenWeatherAPI fetch weather data from OpenWeather.com
 */
class OpenWeatherService {
    /**
     *
     */
    constructor() {
    }
    /**
     * Method return current weather data of the user's city.
     * @param {string} city - take the city name from client.
     */
    public async currentWeather(city: string)
        : Promise<CurrentWeatherInterface> {
        const API = process.env.OPEN_WEATHER;

        const openWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`;
        const fullData = await axios.get(openWeather);
        const main: TempInterface = fullData.data.main;
        const iconData: IconInterface = fullData.data.weather[0];
        const data: CurrentWeatherInterface = {
            temp: main.temp,
            feels_like: main.feels_like,
            temp_min: main.temp_min,
            temp_max: main.temp_max,
            pressure: main.pressure,
            humidity: main.humidity,
            icon: iconData,
        };
        return data;
    }
}

export default OpenWeatherService;
