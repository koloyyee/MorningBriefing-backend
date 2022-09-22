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
            let resp = await this.newcatcherService.retrieveHeadline();
            return res.json(resp)
        } catch (error) {
            let resp = await this.newcatcherService.fallbackFiles("news");
            console.log(res.json(resp))

            const err = error as AxiosError;
            console.log('fallback on backups')
            console.log(err.message);

            return res.json(resp);
        }
    };
    private topicHeadline = async (req: Request, res: Response) => {
        const topic = req.params.topic;
        try {
            const resp = await this.newcatcherService.retrieveHeadline(topic);

            return res.json(resp);
        } catch (error) {
            const resp = await this.newcatcherService.fallbackFiles(topic);
            return res.json(resp)
            // res.json({ success: false });
        }
    };
}
export default NewsCatcherRouter;
