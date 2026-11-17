import { SOCKET_CLIENT_EVENTS } from "../constants/const.js";

export interface ClientToServerEvents {
  [SOCKET_CLIENT_EVENTS.JOIN_CHAT]: (chatId: string) => void;
  [SOCKET_CLIENT_EVENTS.SEND_MESSAGE]: (data: {
    text: string;
    chatId: string;
  }) => void;
}
