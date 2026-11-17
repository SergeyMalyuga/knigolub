import type {ExtendedError} from "socket.io";

export type SocketNextFunction = (err?: ExtendedError) => void;