import type {OnlineUser} from "@knigolub/shared";
import {presenceService} from "../services/presence.service";
import type {PrismaOnlineUser} from "../types/user.types";


export function mapPrismaToOnlineUser(user: PrismaOnlineUser): OnlineUser {
    return {
        id: user.id,
        name: user.username,
        avatarUrl: user.avatarUrl,
        onlineSince: presenceService.getOnlineSince(user.id)?.toISOString() ?? new Date().toISOString(),
    }
}