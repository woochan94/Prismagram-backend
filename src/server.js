import "./env";
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "../generated/prisma-client";
import logger from "morgan";
import passport from "passport"; 
import schema from "./schema";
import "./passport"; 
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

// context는 resolver 사이에서 정보를 공유할 때 사용 
const server = new GraphQLServer({ schema, context: (request) => ({request})
});

// GraphQLServer에는 express 서버가 내장되어 있다. 
server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
    console.log(`✅  Server running on http://localhost:${PORT}`)
);