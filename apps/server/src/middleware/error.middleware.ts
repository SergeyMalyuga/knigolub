import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma";
import { type ErrorResponse, UserErrorField } from "@knigolub/shared";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error("Ошибка:", err);

  // 1. Обработка специфичных ошибок Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2025: Запись не найдена (например, при удалении несуществующего избранного)
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Not Found",
        message: "Запись не найдена в базе данных",
      } as ErrorResponse);
    }
    // P2002: Нарушение уникального ограничения (дубликат)
    if (err.code === "P2002") {
      const target = err.meta?.target as string[] | undefined;
      const errorMessage = err.message || "";

      const isUsernameError =
        target?.includes(UserErrorField.USERNAME) ||
        errorMessage.includes("User_username_key");
      const isEmailError =
        target?.includes(UserErrorField.EMAIL) ||
        errorMessage.includes("User_email_key");

      if (isUsernameError) {
        const errorResponse: ErrorResponse = {
          message: "Этот ник уже занят",
          field: UserErrorField.USERNAME,
        };
        return res.status(409).json(errorResponse);
      }

      if (isEmailError) {
        const errorResponse: ErrorResponse = {
          message: "Этот email уже зарегистрирован",
          field: UserErrorField.EMAIL,
        };
        return res.status(409).json(errorResponse);
      }
    }
  }

  // 2. Обработка кастомных бизнес-ошибок
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  }

  console.log(err.message);
  return res.status(500).json({
    error: "Internal Server Error",
    message: "Что-то пошло не так на сервере",
  });
}
