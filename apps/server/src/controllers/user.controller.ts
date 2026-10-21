import type {NextFunction, Request, Response} from "express";
import {type ErrorResponse, type UpdateUserDto, updateUserSchema} from "@knigolub/shared";
import {UserService} from "../services/user.service";
import {AuthError} from "../errors/auth.error";
import {NotFoundError} from "../errors/not-found.error";
import {mapPrismaUserToUser} from "../mappers/user.mapper";
import user from "../routes/user";

export class UserController {
    private userService = new UserService();

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
     * Загрузка аватарки пользователя
     * POST /users/avatar
     * Content-Type: multipart/form-data
     * Body: { avatar: File }
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

            const dto: UpdateUserDto = validationResult.data

            const updateUser = await this.userService.updateUser(userId, dto);

            res.status(200).json(updateUser);

        } catch (error: any) {
            next(error);
        }
    }
}
