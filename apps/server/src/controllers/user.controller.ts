import type {NextFunction, Request, Response} from "express";
import {
    type ErrorResponse,
    type UpdateUser,
    updateUserSchema,
} from "@knigolub/shared";
import {UserService} from "../services/user.service";
import {AuthError} from "../errors/auth.error";
import {NotFoundError} from "../errors/not-found.error";
import {updateChatStatus} from "../schemas/user.schema";
import {ValidationError} from "../errors/validation.error";
import type {AuthRequest} from "../types/auth-request.type";

export class UserController {
    private userService = new UserService();

    /**
     * Регистрирует нового пользователя в системе.
     *
     * @param req - Express Request объект.
     * @param req.body - Данные для регистрации (username, email, password).
     * @param res - Express Response объект.
     * @param next - Express NextFunction для передачи ошибок в глобальный обработчик.
     * @returns HTTP 200 с объектом UserDto (данные пользователя и JWT-токен).
     */
    public async register(req: Request, res: Response, next: NextFunction) {
        const {username, email, password} = req.body;

        try {
            const userDto = await this.userService.registerUser({
                username,
                email,
                password,
            });
            return res.status(200).json(userDto);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Аутентифицирует пользователя по email и паролю, выдавая JWT-токен.
     *
     * @param req - Express Request объект.
     * @param req.body - Учетные данные пользователя (email, password).
     * @param res - Express Response объект.
     * @returns HTTP 200 с объектом UserDto при успехе, или HTTP 401 с описанием ошибки при неверных данных.
     */
    public async login(req: Request, res: Response) {
        const {email, password} = req.body;

        try {
            const userDto = await this.userService.loginUser({email, password});
            return res.status(200).json(userDto);
        } catch (error: any) {
            if (error instanceof AuthError) {
                const errorResponse: ErrorResponse = {
                    message: error.message,
                    field: error.field,
                };
                return res.status(error.statusCode).json(errorResponse);
            }
        }
    }

    /**
     * Получает данные профиля текущего авторизованного пользователя.
     *
     * @param req - Express Request объект (должен содержать req.user, добавленный middleware аутентификации).
     * @param res - Express Response объект.
     * @returns HTTP 200 с объектом User, либо HTTP 401 (не авторизован), 404 (пользователь не найден) или 500 (ошибка сервера).
     */
    public async getCurrentUser(req: Request, res: Response) {
        const id = req.user?.id;

        if (!id) {
            const errorResponse: ErrorResponse = {
                message: "Требуется авторизация",
            };
            return res.status(401).json(errorResponse);
        }

        try {
            const user = await this.userService.getUserById(id);
            return res.status(200).json(user);
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                const errorResponse: ErrorResponse = {
                    message: error.message,
                };
                return res.status(error.statusCode).json(errorResponse);
            }

            console.error("Ошибка при получении пользователя:", error);

            const errorResponse: ErrorResponse = {
                message: "Внутренняя ошибка сервера",
            };

            return res.status(500).json(errorResponse);
        }
    }

    /**
     * Загружает и обновляет аватар пользователя.
     * Ожидает запрос типа multipart/form-data с файлом в поле 'avatar' (обрабатывается multer).
     *
     * @param req - Express Request объект (содержит req.file от multer и req.user.id).
     * @param res - Express Response объект.
     * @param next - Express NextFunction для передачи ошибок.
     * @returns HTTP 200 с объектом AvatarResponse, либо HTTP 400 (файл не предоставлен) или 401 (не авторизован).
     */
    public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                const error: ErrorResponse = {message: "Не авторизован"};
                return res.status(401).json(error);
            }

            // Multer уже сохранил файл, информация о нём в req.file
            if (!req.file) {
                const error: ErrorResponse = {message: "Файл не был загружен"};
                return res.status(400).json(error);
            }

            // Формируем путь к файлу (относительный, для хранения в БД)
            const avatarUrl = `/uploads/avatars/${req.file.filename}`;

            // Обновляем запись в БД
            const response = await this.userService.updateAvatar(userId, avatarUrl);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Обновляет данные профиля текущего пользователя.
     * Выполняет валидацию входящих данных через updateUserSchema перед передачей в сервис.
     *
     * @param req - Express Request объект.
     * @param req.body - Данные для обновления (валидируются схемой updateUserSchema).
     * @param res - Express Response объект.
     * @param next - Express NextFunction для передачи ошибок.
     * @returns HTTP 200 с обновленным объектом User, либо HTTP 400 (ошибка валидации) или 401 (не авторизован).
     */
    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                const error: ErrorResponse = {message: "Не авторизован"};
                return res.status(401).json(error);
            }

            const validationResult = updateUserSchema.safeParse(req.body);

            if (!validationResult.success) {
                const error: ErrorResponse = {message: "Неверный формат данных"};
                return res.status(400).json(error);
            }

            const dto: UpdateUser = validationResult.data;

            const updateUser = await this.userService.updateUser(userId, dto);

            res.status(200).json(updateUser);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Обновляет статус пользователя в чате.
     * Выполняет валидацию входящих данных через updateChatStatusSchema перед передачей в сервис.
     *
     * Маршрут: PATC /users/me/chat-status
     *
     * @param req - Express Request объект (с расширенным типом AuthRequest).
     * @param req.body - Данные для обновления (валидируются схемой updateChatStatusSchema).
     * @param res - Express Response объект.
     * @param next - Express NextFunction для передачи ошибок в глобальный обработчик.
     * @returns HTTP 200 с обновленным объектом статуса, либо HTTP 400 (ошибка валидации) или 401 (не авторизован).
     */
    public async updateChatStatus(req: AuthRequest, res: Response, next: NextFunction) {
        const userId = req.user.id;

        try {
            const parsed = updateChatStatus.safeParse(req.body);

            if (!parsed.success) {
                throw new ValidationError("Неверные параметры обновления статуса чата");
            }

            const {chatStatus} = parsed.data;
            const updateStatus = await this.userService.updateChatStatus({userId, chatStatus})

            return res.status(200).json(updateStatus);
        } catch (error: any) {
            next(error);
        }
    }
}
