import type { NextFunction, Request, Response } from "express";
import type { ErrorResponse } from "@knigolub/shared";
import jwt from "jsonwebtoken";
import type {TokenPayload} from "../types/token-payload.type";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["x-token"] as string;

  if (!token || token.trim() === "") {
    const error: ErrorResponse = { message: "Требуется аутентификация" };
    return res.status(401).json(error);
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error(
      "🚨 КРИТИЧЕСКАЯ ОШИБКА: Переменная окружения JWT_SECRET не установлена",
    );
    const error: ErrorResponse = { message: "Внутренняя ошибка сервера" };
    return res.status(500).json(error);
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as {
      id: string;
      email: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    const errorResponse: ErrorResponse = {
      message: "Недействительный или истекший токен",
    };
    return res.status(401).json(errorResponse);
  }
};
