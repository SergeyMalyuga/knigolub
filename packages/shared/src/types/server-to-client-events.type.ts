import { SOCKET_SERVER_EVENTS } from "../constants/const.js";
import type { Message } from "../models/message.model.js";
import {OnlineUser} from "../models/online-user.model";

export interface ServerToClientEvents {
  [SOCKET_SERVER_EVENTS.NEW_MESSAGE]: (message: Message) => void;
  [SOCKET_SERVER_EVENTS.ERROR]: (error: { message: string }) => void;
  [SOCKET_SERVER_EVENTS.PRESENCE_SNAPSHOT]: (users: OnlineUser[]) => void;
  [SOCKET_SERVER_EVENTS.PRESENCE_ONLINE]: (user: OnlineUser) => void;
  [SOCKET_SERVER_EVENTS.PRESENCE_OFFLINE]: (userId: string) => void;
}
