import type { User as PrismaUser } from "../../generated/prisma/client";
import type { User } from "@knigolub/shared/src/models/user.model";

export function mapPrismaUserToUser(user: PrismaUser): User {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatarUrl: user?.avatarUrl || null,
    registrationAt: user.createdAt.getFullYear(),
  };
}
