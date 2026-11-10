import type { AuthHandler } from "../types/auth-handler.type";
import type { RequestHandler } from "express";

export function authHandler(handler: AuthHandler): RequestHandler {
  return handler as RequestHandler;
}
