import { prisma } from "../../../generated/prisma-client"; 

export default {
    Post: {
        user: ({ id }) => prisma.post({ id }).user(), 
        comments: ({ id }) => prisma.post({ id }).comments(), 
        likeCount: (parent) => prisma.likesConnection({
            where: {
                post: { id: parent.id }
            }
        }).aggregate().count(),
        isLiked: (parent, _, { request }) => {
            const { user } = request; 
            const { id: parentId } = parent; 
            try {
                return prisma.$exists.like({
                    AND: [
                        {
                            user: {
                                id: user.id
                            }
                        }, 
                        {
                            post: {
                                id: parentId
                            }   
                        }
                    ]
                })
            } catch {
                return false; 
            }
        },
        files: ({ id }) => prisma.post({ id }).files()
    }
}