import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
      createAccount: async (_, args) => {
        const { username, email, firstName = "", lastName = "", bio = "" } = args;
        // pirsma에서 username 이나 email을 갖고 있는 user가 존재하는지 확인 
        const exists = await prisma.$exists.user({
          OR: [
            {
              username
            },
            { email }
          ]
        });
        if (exists) {
          throw Error("This username / email is already taken");
        }
        await prisma.createUser({
          username,
          email,
          firstName,
          lastName,
          bio
        });
        return true;
      }
    }
  };