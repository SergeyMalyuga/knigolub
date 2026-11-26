import {PRESENCE_TYPE} from "../constants/const";

export type PresenceChangeEvent =
    { type: PRESENCE_TYPE.ONLINE, userId: string } |
    { type: PRESENCE_TYPE.OFFLINE, userId: string };