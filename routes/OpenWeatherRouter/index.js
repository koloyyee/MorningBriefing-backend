"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/**
 * @param {Express} req - Express get client side route query.
 * @param {Express} res - Express response, use res.json() to return json.
 */
class OpenWeatherRouter {
    /**
     *
     * openweather - dependency injection from OpenWeatherService
     */
    constructor(openweather) {
        this.openweather = openweather;
        this.currentWeather = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const city = req.params.city;
                const data = yield this.openweather.currentWeather(city);
                return res.json(data);
            }
            catch (err) {
                console.error(err);
                return res.json({ message: 'failed to fetch.' });
            }
        });
    }
    ;
    /**
     *  @return {Router} router method, router bundles all routes.
     */
    router() {
        // eslint-disable-next-line new-cap
        const router = express_1.default.Router();
        router.get('/:city', this.currentWeather);
        return router;
    }
}
exports.default = OpenWeatherRouter;
