import * as db from "../database/db";
import { AgencyModelInterface } from './interface';
const conn = db.conn;

class AgencyModel {
    async getAllAgencies(): Promise<AgencyModelInterface[]> {
        const agencies: AgencyModelInterface[] = [];

        return new Promise((res, rej) => {
            conn.serialize(() => {
                const query = `SELECT * FROM agency;`;
                conn.all(query, (err: string, rows: AgencyModelInterface[]) => {
                    rows.forEach((row) => agencies.push(row));
                    if (err) return rej(err);
                    res(agencies);
                });
            });
            conn.close()
        });
    }
    async getAgencyById(agency_id: number): Promise<AgencyModelInterface> {
        let id = agency_id;
        return new Promise((res, rej) => {
            conn.serialize(() => {
                const query = `SELECT * FROM agency WHERE id = ?;`;
                conn.get(query, id, (err: Error, row: AgencyModelInterface) => {
                    if (err) return rej(err);
                    res(row);
                });
            });
            conn.close()
        });
    }

    async getAgencyByName(name: string): Promise<AgencyModelInterface> {

        return new Promise((res, rej) => {
            conn.serialize(() => {
                const query = `SELECT * FROM agency WHERE name = ?;`;
                conn.get(query, name, (err: Error, row: AgencyModelInterface) => {
                    if (err) return rej(err);
                    res(row);
                });
            });
            conn.close()
        });
    }
    async getAgencyByURL(url: string): Promise<AgencyModelInterface> {
        return new Promise((res, rej) => {
            conn.serialize(() => {
                const query = `SELECT * FROM agency WHERE url = ?;`;

                conn.get(query, url, (err: Error, row: AgencyModelInterface) => {
                    if (err) return rej(err)
                    console.log(row)
                    res(row)
                })
            })
            conn.close()
        })
    }


}
async function testing() {
    const am = new AgencyModel()
    let data = await am.getAllAgencies()
    console.log(data)
}
testing()
export default AgencyModel;
