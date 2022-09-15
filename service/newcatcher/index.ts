import axios, { AxiosError } from 'axios';
import * as dotenv from 'dotenv';
import { NewscatcherInterface } from './newscatcher.interface';

dotenv.config();
/**
 * NewscatcherService,fetch data via RapidAPI
 */
class NewscatcherService {
    /** no injection and dependency yet. */
    constructor() { }

    /**
 * Retrieving all headlines from RapidAPI
 * @param {string} topic - default finance, sport, business, world, etc.
 * @param {string} lang - default en (english), de, fr, etc.
 */
    async retrieveHeadline(
        topic: string = 'finance',
        lang: string = 'en'): Promise<NewscatcherInterface | {}> {
        const options: {} = {
            method: 'GET',
            url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
            params: { topic: topic, lang: lang, media: 'True' },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com',
            },
        };

        const resp = await axios.request(options);
        try {
            const data: NewscatcherInterface = await resp.data;
            return data;
        } catch (err) {
            const error = err as AxiosError;
            return { 'message': error.message };
        }
    };
}

export default NewscatcherService;

