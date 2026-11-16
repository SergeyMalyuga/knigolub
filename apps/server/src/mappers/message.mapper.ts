import type {MessageWithUser} from "../types/message.types";
import type {Message} from "@knigolub/shared";

export function mapPrismaToMessage(message: MessageWithUser): Message {
    return {
        id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        author: {
            name: message.user.username,
            avatarUrl: message.user.avatarUrl
        }
    }
}