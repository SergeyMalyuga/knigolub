import type { NextFunction, Request, Response } from "express";
import { type ErrorResponse } from "@knigolub/shared";
import { UserService } from "../services/user.service";
import { AuthError } from "../errors/auth.error";
import { NotFoundError } from "../errors/not-found.error";

export class UserController {
  private userService = new UserService();

  public async register(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;

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
    const { email, password } = req.body;

    try {
      const userDto = await this.userService.loginUser({ email, password });
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
}
