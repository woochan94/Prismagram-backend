import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        files: ({id}) => prisma.post({ id }).files(), 
        comments: ({id}) => prisma.post({ id }).comments(),
        user: ({id}) => prisma.post({ id }).user(),
        isLiked: async (parent, __, { request }) => {
            const { user } = request;
            const { id } = parent;
            // like 테이블? 에서 parent로 가져온 postId와 저장된 postId를 비교하고
            // request에서 가져온 userid와 저장된 user의 id를 비교하여 좋아요 유무 판별 
            return prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id
                        }
                    }
                ]
            });
        },
        likeCount: (parent) => prisma.likesConnection({
            where: {
                post: { id: parent.id }
            }
        })
            .aggregate()
            .count()
    }
}