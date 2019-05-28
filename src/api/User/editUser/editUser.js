import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { username, email, firstName, lastName, bio, avatar } = args; 
            const { user } = request; 
            // update할때 빈 매개변수를 보내더라도 이전의 데이터를 보존해준다. 
            return prisma.updateUser({
                where: {
                    id: user.id
                }, 
                data: {
                    username, email, firstName, lastName, bio, avatar
                }
            });
        }
    }
}