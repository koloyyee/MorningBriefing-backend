// import knexConn from "../database/knex";
// import { NewsModelInterface } from "./interface";

// const newsTable = knexConn<NewsModelInterface>('news');

// class NewsModel {
//     constructor() {

//     }

//     async getAllNews() {
//         const data = await newsTable
//         const json = JSON.stringify(data)

//         return json
//     }
//     async getByAgencyID(agency_id: string | number) {
//         let id = agency_id;
//         if (typeof agency_id == "string") {
//             id = parseInt(agency_id)
//         }
//         const data = await newsTable.where('agency_id', id)
//         return JSON.stringify(data)
//     }
//     // async insertNews(news: NewsHeadlineInterface) {
//     //     const agencyModel = new AgencyModel()
//     //     const agencyId = await agencyModel.getAgencyByURL(news.url)

//     //     const data: NewsModelInterface = {
//     //         agency_id: parseInt(agencyId),
//     //         headline: news.headline,
//     //         url: news.url,

//     //     }
//     // }


// }

// export default NewsModel
