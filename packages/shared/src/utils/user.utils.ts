import type {ChatStatus} from "../types/chat-status.type";
import {CHAT_STATUS_CONFIG} from "../constants/const";

// ============================================
// Chat Status Utilities
// ============================================
export function isChatStatus(value: string): value is ChatStatus {
    return Object.values(CHAT_STATUS_CONFIG).some(status =>
        status.value === value);
}