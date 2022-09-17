"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openWeather = exports.newscatcher = void 0;
const Newscatcher_1 = __importDefault(require("../service/Newscatcher"));
const OpenWeather_1 = __importDefault(require("../service/OpenWeather"));
const NewscatcherRouter_1 = __importDefault(require("./NewscatcherRouter"));
const OpenWeatherRouter_1 = __importDefault(require("./OpenWeatherRouter"));
// Services
const newscatcherService = new Newscatcher_1.default();
const openWeatherService = new OpenWeather_1.default();
// Routers
// Dependency Injection with Service
const newscatcher = new NewscatcherRouter_1.default(newscatcherService);
exports.newscatcher = newscatcher;
const openWeather = new OpenWeatherRouter_1.default(openWeatherService);
exports.openWeather = openWeather;
