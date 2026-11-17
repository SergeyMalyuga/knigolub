import type {TokenPayload} from "../types/token-payload.type";
import type {Socket} from "socket.io";
import jwt from "jsonwebtoken";
import {AuthSocketError} from "../errors/auth-socket.error";
import {TokenError} from "../errors/token.error";
import {ForbiddenError} from "../errors/forbidden.error";
import type {SocketNextFunction} from "../types/socket-next-function.type";

declare module 'socket.io' {
    interface SocketData {
        user: TokenPayload;
    }
}

export const websocketAuth = (socket: Socket, next: SocketNextFunction) => {
    const token = socket.handshake.headers['x-token'] as string;

    if (!token || token.trim() === "") {
        return next(new AuthSocketError("Требуется аутентификация"));
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error(
            "🚨 КРИТИЧЕСКАЯ ОШИБКА: Переменная окружения JWT_SECRET не установлена",
        );
        return next(new TokenError("Внутренняя ошибка сервера"));
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as {
            id: string;
            email: string;
        };
        socket.data.user = decoded;
        next();
    } catch (error) {
        return next(new ForbiddenError("Недействительный или истекший токен"));
    }
}