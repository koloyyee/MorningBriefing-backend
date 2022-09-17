import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import { newscatcher, openWeather } from './routes/index';
dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);

const app = express();

// static file
app.use(express.static(path.join(__dirname, 'public')));

/**
 * express middleware
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * express api endpoints.
 */
app.use('/news', newscatcher.router());
app.use('/weather', openWeather.router());

app.listen(PORT, () => console.log(`running on ${PORT}`));
