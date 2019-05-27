import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
            isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            };
            try {
                // $exist를 통해 존재여부 판단 가능                                  
                // prisma.$exists.like 는 true/false 값을 반환한다. 
                const existingLike = await prisma.$exists.like(filterOptions);
                if (existingLike) {
                    // like를 얻는것과 지우는것 모두 같은코드임 
                    await prisma.deleteManyLikes(filterOptions);
                } else {
                    await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        }
                    });
                }
                return true;
            } catch {
                return false; 
            }
        }
    }
};