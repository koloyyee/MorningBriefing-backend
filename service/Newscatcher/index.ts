import axios, { AxiosError } from 'axios';
import * as dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { NewscatcherInterface } from './newcatcher.interface';

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
        lang: string = 'en'): Promise<NewscatcherInterface | {} | undefined> {
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
            console.error(error.message);
        }
    };
    /**
     * Save the news in JSON file as backup
     */
    async saveNewsBackUps() {
        const topics = ['news', 'finance', 'business', 'tech', 'food'];

        topics.forEach(async (topic) => {
            const resp = await this.retrieveHeadline(topic = topic);
            try {
                const filePath = path.join(__dirname, `/backups/${topic}.json`);

                fs.writeFile(
                    filePath,
                    JSON.stringify(resp),
                    { flag: 'w' },
                    (err) => console.error(err));
            } catch (err) {
                console.error(err);
            }
        });
    }
    /**
     * Read Backups by Topic
     * @param {string} topic - query by topic: news, business, tech, food.
     */
    async fallbackFiles(topic: string):
        Promise<NewscatcherInterface | string> {
        const filePath = path.join(__dirname, `/backups/${topic}.json`);
        const backupData = fs.readFileSync(filePath);
        return JSON.parse(backupData);
    }
}


export default NewscatcherService;

