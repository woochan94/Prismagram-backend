import { prisma } from "../../../generated/prisma-client";

export default {
    Room: {
        participants: root => prisma.room({ id: root.id }).participants(),
        messages: ({ id }) => prisma.room({ id }).messages()
    }
}