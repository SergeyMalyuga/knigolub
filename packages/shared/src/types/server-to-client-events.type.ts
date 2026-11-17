import {SOCKET_SERVER_EVENTS} from '../constants/const.js';
import {Message} from '@knigolub/shared';

export interface ServerToClientEvents {
  [SOCKET_SERVER_EVENTS.NEW_MESSAGE]: (message: Message) => void;
  [SOCKET_SERVER_EVENTS.ERROR]: (error: { message: string }) => void;
}
