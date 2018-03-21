import { Skill } from "../model/skill";

let skillQuery = {
    Query: {
        skill: (root: any, args: any, context: any) => {
            return Skill.findById(args.id);
        },

        skills: () => {
            return Skill.getAll();
        }
    }
}

export default skillQuery;