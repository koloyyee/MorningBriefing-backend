import knexConn from "../database/knex";
import { AgencyModelInterface } from "./interface";

const agencyTable = knexConn<AgencyModelInterface>('agency');

class AgencyModel {
    constructor() {

    }

    async getAllAgencies() {
        const data = await agencyTable
        const json = JSON.stringify(data)
        return json
    }

    async getAgencyByID(agency_id: string | number) {
        let id = agency_id;
        if (typeof agency_id == "string") {
            id = parseInt(agency_id)
        }
        const data = await agencyTable.where('id', id)
        return JSON.stringify(data)
    }

    async getAgencyByName(name: string) {
        const data = await agencyTable.where('name', name)
        return JSON.stringify(data)
    }

    async getAgencyByURL(url: string) {
        const data = await agencyTable.where('url', url)
        return JSON.stringify(data)
    }

}

export default AgencyModel