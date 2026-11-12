import {CHAT_STATUS_CONFIG} from "../constants/const";

export type ChatStatus = typeof CHAT_STATUS_CONFIG[keyof typeof CHAT_STATUS_CONFIG]['value'];
