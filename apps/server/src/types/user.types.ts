import type { Prisma } from "../../generated/prisma/client";

export type PrismaOnlineUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    avatarUrl: true;
  };
}>;
