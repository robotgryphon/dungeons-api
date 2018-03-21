import ClassResolver from './class';
import SkillResolver from "./skill";

import merge from "lodash.merge";


// Add the user and character query endpoints
let rootResolver = merge(ClassResolver, SkillResolver);
export default rootResolver;