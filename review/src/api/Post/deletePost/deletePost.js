import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deletePost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { id } = args; 
            const { user } = request; 
            const post = await prisma.$exists.post({ id, user: { id: user.id }}); 
            if(post) {
                try {
                    await prisma.deletePost({ id });
                    return true;
                } catch {
                    return false;
                }          
            } else {
                throw Error("You can't do that");
            }
        }
    }
}