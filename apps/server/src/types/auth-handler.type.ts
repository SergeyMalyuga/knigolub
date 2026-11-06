import type {NextFunction, Response} from "express";
import type {AuthRequest} from "./auth-request.type";

export type AuthHandler = (req: AuthRequest, res: Response, next: NextFunction) =>
    Response | void | Promise<Response | void>;