import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        me: async (_,__,{ request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { user } = request ;
            const userProfile = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts();
            return {
                user: userProfile, 
                posts
            };
        }
    }, 
    User: {
        // custom resolver => 하나의 field만을 위한 것 
        // parent는 위에있는 resolver 
        fullName: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        }
    }
};