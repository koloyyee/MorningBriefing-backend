import express, { Request, Response } from 'express'
import NewscatcherService from "../service/newcatcher"



class NewsCatcherRouter {
    constructor(
        private newscatcherService: NewscatcherService
    ) {

    }
    public router() {
        const router = express.Router()

        router.get("/", this.headlines)
        router.get("/:topic", this.topicHeadline)

        return router
    }

    private headlines = async (_req: Request, res: Response) => {
        try {
            const resp = await this.newscatcherService.retrieveHeadline()
            res.json(resp)
        } catch (error) {
            console.error(error)
            res.status(500)
            res.json({ success: false })
        }

    }
    private topicHeadline = async (req: Request, res: Response) => {
        try {
            const topic = req.params.topic
            console.log(topic)
            const resp = await this.newscatcherService.retrieveHeadline(topic)
            res.json(resp)
        } catch (error) {
            console.error(error)
            res.status(500)
            res.json({ success: false })
        }

    }
}
export default NewsCatcherRouter