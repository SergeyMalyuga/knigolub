import {z} from 'zod';
import {CHAT_STATUS_CONFIG, isChatStatus} from "@knigolub/shared";

export const updateChatStatus = z.object({
    chatStatus: z.string().refine(val => isChatStatus(val), {
        message: `Недопустимый статус. Разрешено: ${Object.values(CHAT_STATUS_CONFIG)
            .map((s) => s.value)
            .join(', ')}`,
    })
})