import type {ChatStatus} from "@knigolub/shared";

export interface UpdateChatStatus {
    userId: string;
    chatStatus: ChatStatus;
}