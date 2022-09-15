/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import express, { Request, Response } from 'express';
import NewscatcherService from '../service/newcatcher';

/*
*   NewsCatcherRouter handling API fetch from NewscatcherAPI
*   @param: dependency inject with service.
*
*   headlines: take no param, return all headlines, finance as default topic
*   topicHeadline: @param:string - take topic as param
*/
class NewsCatcherRouter {
    constructor(
        private despatcherService: NewscatcherService,
    ) {

    }
    public router() {
        const router = express.Router();

        router.get('/', this.headlines);
        router.get('/:topic', this.topicHeadline);

        return router;
    }

    private headlines = async (_req: Request, res: Response) => {
        try {
            const resp = await this.despatcherService.retrieveHeadline();
            res.json(resp);
        } catch (error) {
            console.error(error);
            res.status(500);
            res.json({ success: false });
        }
    };
    private topicHeadline = async (req: Request, res: Response) => {
        try {
            const topic = req.params.topic;
            console.log(topic);
            const resp = await this.despatcherService.retrieveHeadline(topic);
            res.json(resp);
        } catch (error) {
            console.error(error);
            res.status(500);
            res.json({ success: false });
        }
    };
}
export default NewsCatcherRouter;
