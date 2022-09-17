/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
'use strict';
const __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
/*
*   NewsCatcherRouter handling API fetch from NewscatcherAPI
*   @param: dependency inject with service.
*
*   headlines: take no param, return all headlines, finance as default topic
*   topicHeadline: @param:string - take topic as param
*/
class NewsCatcherRouter {
    constructor(newcatcherService) {
        this.newcatcherService = newcatcherService;
        this.headlines = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.newcatcherService.retrieveHeadline();
                res.json(resp);
            } catch (error) {
                // console.error(error);
                res.status(500);
                res.json({ success: false });
            }
        });
        this.topicHeadline = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const topic = req.params.topic;
            try {
                const resp = yield this.newcatcherService.retrieveHeadline(topic);
                res.json(resp);
            } catch (error) {
                const err = error;
                console.log(err.message);
                console.log('fallback on backups');
                const resp = yield this.newcatcherService.fallbackFiles(topic);
                res.json(resp);
                res.status(500);
                // res.json({ success: false });
            }
        });
    }
    router() {
        const router = express_1.default.Router();
        router.get('/', this.headlines);
        router.get('/:topic', this.topicHeadline);
        return router;
    }
}
exports.default = NewsCatcherRouter;
