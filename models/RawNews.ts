import * as db from "../database/db";
import { NewsModelInterface } from './interface';

const conn = db.conn;
// const agencyModel = new AgencyModel()

class NewsModel {
    async getAllNews(): Promise<NewsModelInterface[]> {
        const news: NewsModelInterface[] = [];

        return new Promise((res, rej) => {
            conn.serialize(() => {
                const query = `SELECT * FROM news;`;
                conn.all(query, (err: string, rows: NewsModelInterface[]) => {
                    rows.forEach((row) => news.push(row));
                    if (err) return rej(err);
                    res(news);
                });
            });
            conn.close()
        });
    }
    // async getNewsByAgency(name: string): Promise<NewsModelInterface> {
    //     const agencyID = agencyModel.getAgencyById
    //     return new Promise((res, rej) => {
    //         conn.serialize(() => {
    //             const query = `SELECT * FROM agency WHERE name = ?;`;
    //             conn.get(query, name, (err: Error, row: NewsModelInterface) => {
    //                 if (err) return rej(err);
    //                 res(row);
    //             });
    //         });
    //         conn.close()
    //     });
    // }

    // async insertNews({
    //     agency_id,
    //     headline,
    //     url }: NewsModelInterface) {

    // }

}

export default NewsModel;
