import {ChatStatus} from "./chat-status.type";

export interface ChatStatusResponse {
    userId: string;
    chatStatus: ChatStatus;
}