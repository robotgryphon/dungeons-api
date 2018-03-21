import { readFileSync } from "fs";
import { join } from "path";
import { makeExecutableSchema } from "graphql-tools";

import resolvers from "./resolvers";

let fileData = readFileSync(join(__dirname, "..", "schema.graphql"));

let typeDefs = fileData.toString("utf8");
let SCHEMA = makeExecutableSchema({
    typeDefs, 
    resolvers
});

export default SCHEMA;