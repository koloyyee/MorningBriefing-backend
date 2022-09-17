"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
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
    retrieveHeadline(topic = 'finance', lang = 'en') {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'GET',
                url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
                params: { topic: topic, lang: lang, media: 'True' },
                headers: {
                    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                    'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com',
                },
            };
            const resp = yield axios_1.default.request(options);
            try {
                const data = yield resp.data;
                return data;
            }
            catch (err) {
                const error = err;
                console.error(error.message);
            }
        });
    }
    ;
    /**
     * Save the news in JSON file as backup
     */
    saveNewsBackUps() {
        return __awaiter(this, void 0, void 0, function* () {
            const topics = ['news', 'finance', 'business', 'tech', 'food'];
            topics.forEach((topic) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield this.retrieveHeadline(topic = topic);
                try {
                    const filePath = node_path_1.default.join(__dirname, `/backups/${topic}.json`);
                    node_fs_1.default.writeFile(filePath, JSON.stringify(resp), { flag: 'w' }, (err) => console.error(err));
                }
                catch (err) {
                    console.error(err);
                }
            }));
        });
    }
    /**
     * Read Backups by Topic
     * @param {string} topic - query by topic: news, business, tech, food.
     */
    fallbackFiles(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = node_path_1.default.join(__dirname, `/backups/${topic}.json`);
            const backupData = node_fs_1.default.readFileSync(filePath);
            return JSON.parse(JSON.stringify(backupData));
        });
    }
}
exports.default = NewscatcherService;
