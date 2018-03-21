import { v1 as neo4j } from "neo4j-driver";
import { readFileSync } from "fs";
import util from 'util';

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "neo4j"));
const session = driver.session();

let prof: Buffer = readFileSync("classes-formatted.json");

// @ts-ignore
let json = JSON.parse(prof);

async function addSkill(cName: string, sName: string) {
    await session.run(`
        MATCH (c:Class), (p:Skill)
            WHERE c.name = $name AND p.name = $skillName
            CREATE (c)-[x:CAN_TAKE_PROFICIENCY]->(p)
            RETURN x`, { name: cName, skillName: sName });
}

async function addProficiency(cName: string, sName: string) {
    await session.run(`
        MATCH (c:Class), (p:Proficiency)
            WHERE c.name = $name AND p.name = $skillName
            CREATE (c)-[x:CAN_TAKE_PROFICIENCY]->(p)
            RETURN x`, { name: cName, skillName: sName });
}

async function run() {
    let created = 0;

    for(let dClass of json) {
        console.log(dClass.name);
        let choiceTypes = Object.keys(dClass.proficiency_choices);

        for(let choiceType of choiceTypes) {
            let choices = dClass.proficiency_choices[choiceType];
            for(let choice of choices) {
                switch(choiceType.toLowerCase()) {
                    case "skill":
                        // await addSkill(dClass.name, choice);
                        break;
                    
                    case "proficiency":
                        console.log(choice);
                        // await addProficiency(dClass.name, choice);
                        break;
                }
            }
        }
    }
}

run().then(_ => {
    session.close();
    driver.close();
});




