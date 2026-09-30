import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// 1. Расширяем типизацию Express, чтобы TypeScript не ругался на req.user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        // добавьте другие поля, которые вы кладете в JWT при логине
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 2. Достаем токен ИМЕННО из того заголовка, который шлет ваш Angular
  const token = req.headers["x-token"] as string;

  // Если токена нет, просто идем дальше. req.user останется undefined (гость)
  if (!token) {
    return next();
  }

  try {
    // 3. Проверяем и расшифровываем токен (используем ваш секретный ключ)
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "super-secret",
    ) as {
      id: string;
      email: string;
    };

    // 4. 🎯 ВОТ ОНА! Магия. Вручную присваиваем пользователя к запросу
    req.user = decoded;

    next(); // Передаем управление в роут
  } catch (error) {
    // Если токен протух или поддельный.
    // Для публичных роутов (как список книг) просто идем дальше как гость.
    // Для приватных роутов (профиль) здесь нужно вернуть res.status(401).json(...)
    next();
  }
};
