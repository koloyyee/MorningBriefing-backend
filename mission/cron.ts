// /* eslint-disable camelcase */
// /* eslint-disable require-jsdoc */
// // import AgencyController from '../controllers/agency';
// import { AgencyModelInterface } from '../models/interface';
// import ScrapeFromAgency from './scrape';

// const agencyController = new AgencyController();
// const fromAgency = new ScrapeFromAgency();

// async function schedulesScrape() {
//     const resp = await agencyController.getAll();
//     const agencies: AgencyModelInterface[] = await JSON.parse(resp);

//     const agencyNews: {}[] = [];
//     agencies;

//     agencies.forEach(async (agency) => {
//         const { name, url, dom_class_name, has_span } = agency;
//         const newsObj = { 'agency': '', 'agencyUrl': '', 'news': {} };

//         const data = await fromAgency.scrape(url, dom_class_name, has_span);


//         newsObj['agency'] = name;
//         newsObj['agencyUrl'] = url;
//         newsObj['news'] = data;

//         agencyNews.push(newsObj);
//         console.log(newsObj);
//     });
// }

// schedulesScrape();
