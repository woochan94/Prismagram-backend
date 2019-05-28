import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        upload: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request); 
            const { user } = request;
            const { 
                caption, files
            } = args;
            // 먼저 file없이 post를 생성 후 
            const post = await prisma.createPost({ caption, user: { connect: { id: user.id } } }); 
            // 파일을 생성 및 먼저 만든 post에 connect 
            files.forEach(async file => {
                await prisma.createFile({
                    url: file,
                    post: {
                        connect: {
                            id: post.id
                        }
                    }
                })
            });
            return post;
        }
    }
}