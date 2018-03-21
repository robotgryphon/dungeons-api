import express from "express";
import driver from "./database";
import graphqlHTTP from "express-graphql";
import SCHEMA from "./schema";

let server = express();

server.post("/graphql", graphqlHTTP({
    schema: SCHEMA,
    graphiql: false
}));

server.get("/graphql", graphqlHTTP({
    schema: SCHEMA,
    graphiql: true
}));

server.listen(3000, () => {
    console.log("Listening.");
});

server.on("close", () => {
    driver.close();
});