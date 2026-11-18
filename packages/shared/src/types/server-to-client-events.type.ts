import { SOCKET_SERVER_EVENTS } from "../constants/const.js";
import type {Message} from "../models/message.model.js";

export interface ServerToClientEvents {
  [SOCKET_SERVER_EVENTS.NEW_MESSAGE]: (message: Message) => void;
  [SOCKET_SERVER_EVENTS.ERROR]: (error: { message: string }) => void;
}