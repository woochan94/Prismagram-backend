import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        // custom resolver => 하나의 field만을 위한 것 
        // parent는 위에있는 resolver 
        fullName: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async (parent, __, { request }) => {
            const { user } = request; // 요청 계정의 아이디 
            const { id: parentId } = parent; // 현재 로그인한 계정의 아이디
            try {
                const exists = await prisma.$exists.user({ 
                    AND: [
                        { id: user.id }, 
                        { following_some: {id: parentId} }
                    ]
                  });
                return exists;
            } catch {
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request; 
            const { id: ParentId } = parent; 
            return user.id === ParentId; 
        }
    },
    Post: {
        isLiked: async (parent, __, { request }) => {
            const { user } = request; 
            const { id } = parent; 
            // like 테이블? 에서 parent로 가져온 postId와 저장된 postId를 비교하고
            // request에서 가져온 userid와 저장된 user의 id를 비교하여 좋아요 유무 판별 
            return prisma.$exists.like({
                AND: [
                    { user: {
                        id: user.id
                    }}, 
                    { post: {
                        id
                    }}
                ]
            }); 
        }
    }
};
