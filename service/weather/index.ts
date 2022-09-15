import axios from 'axios';
import * as dotenv from 'dotenv';
import { CurrentWeatherInterface, IconInterface, TempInterface } from './weather.interface';

dotenv.config();

/**
 * class OpenWeatherAPI fetch weather data from OpenWeather.com
 */
class OpenWeatherAPI {
    city: string;
    /**
     * @param {string} city - get user timezone and get the city
     * provide by client side.
     */
    constructor(city: string) {
        this.city = city;
    }
    /**
     * Method return current weather data of the user's city.
     */
    private async currentWeather() {
        const API = process.env.OPEN_WEATHER;

        const openWeather = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${API}&units=metric`;
        const fullData = await axios.get(openWeather);
        const main: TempInterface = fullData.data.main;
        const iconData: IconInterface = fullData.data.weather[0];
        const data: CurrentWeatherInterface = { main, iconData };
    }
}


export default OpenWeatherAPI;
