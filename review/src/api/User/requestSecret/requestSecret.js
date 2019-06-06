import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from './../../../utils';

export default {
    Mutation: {
        requestSecret: async(_, args, { request }) => {
            const { email } = args; 
            const loginSecret = generateSecret(); // 랜덤 단어 생성 
            try {
                await sendSecretMail(email, loginSecret); // 입력된 이메일로 메일을 보내는 함수 
                // args로 넘어온 email과 같은 user 에 생성된 랜덤 단어를 업데이트 시켜줌  
                await prisma.updateUser({data: { loginSecret }, where: { email }});
                return true;
            } catch(error) {
                console.log(error);
                return false;
            }
        }
    }
};