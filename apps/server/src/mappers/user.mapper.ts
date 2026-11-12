import type {User as PrismaUser} from "../../generated/prisma/client";
import type {User} from "@knigolub/shared/src/models/user.model";
import {CHAT_STATUS_CONFIG, isChatStatus} from "@knigolub/shared";

export function mapPrismaUserToUser(user: PrismaUser): User {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user?.avatarUrl || null,
        registrationAt: user.createdAt,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        birthday: user.birthday,
        chatStatus: isChatStatus(user.chatStatus) ? user.chatStatus : CHAT_STATUS_CONFIG.OFFLINE.value,
    };
}
