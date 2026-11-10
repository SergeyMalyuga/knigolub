import type { Request } from "express";
import type { TokenPayload } from "./token-payload.type";

export interface AuthRequest extends Request {
  user: TokenPayload;
}
