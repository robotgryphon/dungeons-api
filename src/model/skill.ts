import database from "../database";
import { StatementResult } from "neo4j-driver/types/v1";

export class Skill {

    public id: number = -1;
    public name: string = "";
    public description: string = "";

    constructor(obj: any) {
        if(obj.identity) this.id = obj.identity.low;
        Object.assign(this, obj.properties);
    }

    static async getAll(): Promise<Skill[]> {
        let session = database.session();
        let data: StatementResult = await session.run(`
            MATCH (s:Skill)
            RETURN collect(s) as s;`);

        if(!data || data.records.length == 0)
            return Promise.reject("No result found.");

        let skill: Skill[] = data.records[0].get("s").map((skill: any) => new Skill(skill));
        return Promise.resolve(skill);
    }

    static async findById(id: number): Promise<Skill> {
        let session = database.session();
        let data: StatementResult = await session.run(`
            MATCH (s:Skill)
            WHERE id(s) = $id
            RETURN s;`, { id: id })

        if(!data || data.records.length == 0)
            return Promise.reject("No result found.");

        let skill: Skill = data.records[0].get("s").map((skill: any) => new Skill(skill));
        return Promise.resolve(skill);
    }

    static async getFromClass(c: any): Promise<Skill[]> {
        let session = database.session();
        let data: StatementResult = await session.run(`
            MATCH (c:Class)-[:CHOOSES_PROFICIENCY_IN]->(s:Skill)
            WHERE id(c) = $id
            RETURN collect(s) as skills;`, { id: c.id })

        if(!data || data.records.length == 0)
            return Promise.reject("No result found.");

        let skills: Skill[] = data.records[0].get("skills").map((skill: any) => new Skill(skill));
        return Promise.resolve(skills);
    }
}