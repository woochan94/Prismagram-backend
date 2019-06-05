import dotenv from "dotenv"; 
import {GraphQLServer} from "graphql-yoga"
import logger from "morgan";
import schema from './schema';

dotenv.config(); 

// GraphQLServer에는 express 서버가 내장되어 있다. 
// 그러므로 express 모듈을 따로 설치할 필요 없이 express에 관한 함수를 사용할 수 있다. 
const server = new GraphQLServer({ schema }); 

server.express.use(logger("dev"));

server.start(() => console.log('Server is running on localhost:4000'))