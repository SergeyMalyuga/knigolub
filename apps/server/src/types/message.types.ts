import type {Prisma} from "../../generated/prisma/client";

export type MessageWithUser = Prisma.MessageGetPayload<{
    select: {
        id: true,
        text: true,
        createdAt: true,
        user: {
            select: {
                username: true,
                avatarUrl: true,
            }
        }
    }
}>