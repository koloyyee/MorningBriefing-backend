import axios from "axios";
import * as jsdom from "jsdom";
import { NewsHeadlineInterface } from './interface';
const { JSDOM } = jsdom;

const config = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    },
};
export default class ScrapingFromAgency {
    constructor() {

    }
    /** 
    @param {string} agencyLink - agency link e.g: https://www.bbc.com
    @param {string} className - the class of the html tag e.g: .this-class-name
    @param {number} span - 0 = false, 1 = true
    */
    public async scrape(agencyLink: string, className: string, span: number = 0): Promise<NewsHeadlineInterface[]> {

        const newsHeadline: NewsHeadlineInterface[] = []

        const headlines = await this.getHeadlines(agencyLink, className, span)
        const hrefs = await this.getHref(agencyLink, className)

        headlines.map((v: string, i: number) => {
            const headline: NewsHeadlineInterface = { "headline": "", "url": "" };
            headline["headline"] = v
            headline["url"] = hrefs[i]
            newsHeadline.push(headline)
        })
        // console.log(newsHeadline)
        return newsHeadline
    }

    private async fetchPageData(url: string, className: string) {
        const resp = await axios.get(url, config)
        const dom = new JSDOM(resp.data);
        const data = dom.window.document.querySelectorAll(`.${className}`);

        return data;
    }

    private async getHeadlines(url: string, className: string, span: number) {
        let headlines: string[] = [];

        const data = await this.fetchPageData(url, className);

        data.forEach((el) => {
            if (span === 1) {
                // headlines is hidden in the span
                const headline: string | null = el.querySelector("span")!.textContent;
                headlines.push(headline!);
            } else {
                const headline = el.textContent?.trim();
                headlines.push(headline!);
            }
        });

        return headlines;
    }
    private async getHref(url: string, className: string) {
        let hrefs: string[] = [];
        const data = await this.fetchPageData(url, className);

        data.forEach((el) => {
            const href: string | null = el.getAttribute("href");
            hrefs.push(`${href}`);
        });
        return hrefs;
    }


}


