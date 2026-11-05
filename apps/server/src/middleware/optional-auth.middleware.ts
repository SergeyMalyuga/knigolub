import type {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

declare global { //TODO create optionalAuth & requireAuth
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["x-token"] as string;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || token.trim() === "") {
    return next();
  }

  if (!jwtSecret) {
    console.warn("Переменная окружения JWT_SECRET не установлена")
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      jwtSecret,
    ) as {
      id: string;
      email: string;
    };

    req.user = decoded;

    next();
  } catch (error) {
    next();
  }
};
