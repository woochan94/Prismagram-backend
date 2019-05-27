import passport from "passport"; 
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

// passport는 인증 관련한 모든 일을 한다. 
// jwt 토큰이나 쿠키에서 정보를 가져와서 사용자 정보에 serialize(저장)함 
// - 토큰 정보를 가져와서 해독한 후 사용자 객체를 express의 request에 추가해준다. 

const jwtOptions = {
    // Authorization 헤더에서 jwt를 찾는 역할 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET
}; 

// done은 우리가 사용자를 찾았을 때 호출해야 하는 함수 
const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user({id: payload.id}); 
        if(user != null) {
            return done(null, user);
        } else {
            return done(null, false); 
        }
    } catch (err) {
        return done(err, false);
    }
}


export const authenticateJwt = (req, res, next) => passport.authenticate("jwt", {sessions: false}, (error, user) => {
    if(user) {
        // verifyUser에서 사용자를 받아온후에, 사용자가 존재하면 그 사용자 정보를 req객체에 붙여주는 역할 
        req.user = user; 
    }
    next(); 
})(req, res, next);

// JWT는 토큰을 입력받아서 정보를 해석한 후 해석된 정보를 콜백 함수로 전달해 준다. 
// strategy가 모든 작업을 한 후 결과물을 payload에 전달해줌 
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();


/*
<Passport 작동> 
- 서버에 전달되는 모든 요청은 authenticateJwt 함수를 통과함 
    => server.js에서 server.express.use(authenticateJwt);
- authenticateJwt 함수에서는 passport.authenticate("jwt") 함수를 실행함 
- passport.use(new Strategy(jwtOptions, verifyUser)); 로 넘어옴 
    => 토큰이 추출되면 verifyUser를 payload와 함께 실행함 
- verifyUser에서의 payload는 토큰에서 해석된 id를 받아서 user를 찾아 리턴함 
- 그런다음에 passport.authenticate의 콜백함수가 실행됨 
    => 사용자가 있으면 그 사용자를 req에 추가함 
- server.js에서 context에 req를 담아줌 
*/