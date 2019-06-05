import dotenv from "dotenv"; 
import {GraphQLServer} from "graphql-yoga"

dotenv.config(); 

// graphql-yoga Quickstart 
const typeDefs = `
    type Query {
        hello : String!
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hi"
    }
}

const server = new GraphQLServer({ typeDefs, resolvers }); 
server.start(() => console.log('Server is running on localhost:4000'))