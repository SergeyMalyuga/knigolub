import {PRESENCE_STATUS} from "../constants/const";

export type PresenceChangeEvent =
    { type: PRESENCE_STATUS.ONLINE, userId: string } |
    { type: PRESENCE_STATUS.OFFLINE, userId: string };