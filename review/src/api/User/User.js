import { prisma } from "../../../generated/prisma-client"; 

export default {
    User: {
        posts: ({ id }) => prisma.user({ id }).posts(), 
        rooms: ({ id }) => prisma.user({ id }).rooms(),
        fullName: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isSelf: (parent, __, { request }) => {
            const { user } = request; 
            const { id: parentId } = parent; 
            return user.id === parentId
        },
        isFollowing: async(parent, _, { request }) => {
            const { user } = request; 
            const { id:parentId } = parent; 
            try {
                return prisma.$exists.user({
                    AND: [
                        {
                            id: user.id 
                        }, 
                        {
                            following_some: {
                                id: parentId
                            }
                        }
                    ]
                })
            } catch {
                return false; 
            }
        }
    }
}