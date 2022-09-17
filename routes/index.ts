import NewscatcherService from '../service/Newcatcher';
import OpenWeatherService from '../service/OpenWeather';
import NewsCatcherRouter from './NewscatcherRouter';
import OpenWeatherRouter from './OpenWeatherRouter';

// Services
const newscatcherService = new NewscatcherService();
const openWeatherService = new OpenWeatherService();

// Routers
// Dependency Injection with Service
const newscatcher = new NewsCatcherRouter(newscatcherService);
const openWeather = new OpenWeatherRouter(openWeatherService);


export {
    newscatcher,
    openWeather,
};

