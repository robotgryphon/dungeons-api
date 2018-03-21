import database from "../database";
import { StatementResult } from "neo4j-driver/types/v1";

export class Class {
    
    public id: number = 0;
    public name: string = "";

    constructor(node: any) {
        if(node.id) this.id = node.id.low;
        Object.assign(this, node.properties);
    }

    static async getAll() : Promise<Class[]> {
        let session = database.session();
        let data: StatementResult = await session.run(`
            MATCH (c:Class)
            RETURN collect({ id: id(c), properties: properties(c) }) as c;`);

        if(!data || data.records.length == 0)
            return Promise.reject("No result found.");

        let temp: any[] = data.records[0].get("c");
        let c1: Class[] = temp.map(clazz => new Class(clazz));
        return Promise.resolve(c1);
    }

    static async findByName(name: string) : Promise<Class> {
        let session = database.session();
        let data: StatementResult = await session.run(`
            MATCH (c:Class)
            WHERE toLower(c.name) = $name
            RETURN { id: id(c), properties: properties(c) } as c;`, { name: name.toLowerCase() })

        if(!data || data.records.length == 0)
            return Promise.reject("No result found.");

        let c: Class = new Class(data.records[0].get("c"));
        return Promise.resolve(c);
    }
}