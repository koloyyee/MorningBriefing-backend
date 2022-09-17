import express, { Request, Response, Router } from 'express';
import OpenWeatherService from '../../service/OpenWeather';
/**
 * @param {Express} req - Express get client side route query.
 * @param {Express} res - Express response, use res.json() to return json.
 */
class OpenWeatherRouter {
    /**
     *
     * openweather - dependency injection from OpenWeatherService
     */
    constructor(
        private openweather: OpenWeatherService,

    ) { };
    /**
     *  @return {Router} router method, router bundles all routes.
     */
    public router(): Router {
        // eslint-disable-next-line new-cap
        const router = express.Router();

        router.get('/:city', this.currentWeather);

        return router;
    }
    private currentWeather = async (req: Request, res: Response) => {
        try {
            const city = req.params.city;
            const data = await this.openweather.currentWeather(city);
            return res.json(data);
        } catch (err) {
            console.error(err);
            return res.json({ message: 'failed to fetch.' });
        }
    };
}

export default OpenWeatherRouter;
