/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { AxiosError } from 'axios';
import express, { Request, Response, Router } from 'express';
import NewscatcherService from '../../service/Newscatcher';

/*
*   NewsCatcherRouter handling API fetch from NewscatcherAPI
*   @param: dependency inject with service.
*
*   headlines: take no param, return all headlines, finance as default topic
*   topicHeadline: @param:string - take topic as param
*/
class NewsCatcherRouter {
    constructor(
        private newcatcherService: NewscatcherService,
    ) {

    }
    public router(): Router {
        const router = express.Router();

        router.get('/', this.headlines);
        router.get('/:topic', this.topicHeadline);

        return router;
    }

    private headlines = async (_req: Request, res: Response) => {
        try {
            const resp = await this.newcatcherService.retrieveHeadline();
            res.json(resp);
        } catch (error) {
            // console.error(error);
            res.status(500);
            res.json({ success: false });
        }
    };
    private topicHeadline = async (req: Request, res: Response) => {
        const topic = req.params.topic;
        try {
            const resp = await this.newcatcherService.retrieveHeadline(topic);
            res.json(resp);
        } catch (error) {
            const err = error as AxiosError;
            console.log(err.message);
            console.log('fallback on backups');
            const resp = await this.newcatcherService.fallbackFiles(topic);
            res.json(resp);

            res.status(500);
            // res.json({ success: false });
        }
    };
}
export default NewsCatcherRouter;
