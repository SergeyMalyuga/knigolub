import type {NextFunction, Response} from "express";
import {MessageService} from "../services/message.service";
import type {AuthRequest} from "../types/auth-request.type";
import {createMessageSchema} from "../schemas/message.schema";
import {chatGateway} from "../services/chat-gateway.service";
import {SOCKET_SERVER_EVENTS} from "@knigolub/shared";

export class MessageController {
    private messageService = new MessageService();

    /**
     * Создаёт сообщение.
     *
     * Маршрут: POST /messages
     *
     * @param req - Express request объект (валидация через схему createMessageSchema).
     * @param res - Express response объект.
     * @param next - Express next функция для передачи ошибок в глобальный обработчик.
     * @returns JSON с сообщением.
     */
    public async createMessage(
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) {
        const userId = req.user.id;
        const io = chatGateway.getIO();

        try {
            const parsed = createMessageSchema.safeParse(req.body);

            if (!parsed.success) {
                return next(parsed.error);
            }

            const {text} = parsed.data;
            const newMessage = await this.messageService.createMessage({
                userId,
                text,
            });
            io.emit(SOCKET_SERVER_EVENTS.NEW_MESSAGE, newMessage)
            return res.status(201).json(newMessage);
        } catch (error: any) {
            next(error);
        }
    }
}
