import { Class } from "../model/class";
import { Skill } from "../model/skill";

let classQuery = {
    Query: {
        class: (root: any, args: any, context: any) => {
            if(args.className) {
                return Class.findByName(args.className);
            } else {
                return {};
            }
        },

        classes: () => {
            return Class.getAll();
        }
    },

    Class: {
        skill_choices: (root: any, args: any, context: any) => {
            return Skill.getFromClass(root);
        }
    }
}

export default classQuery;