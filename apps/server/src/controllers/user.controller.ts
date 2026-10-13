import type {Request, Response} from "express";
import {type ErrorResponse, UserErrorField} from "@knigolub/shared";
import {UserService} from "../services/user.service";

export class UserController {
    private userService = new UserService();

   public async register(req: Request, res: Response) {
        const {username, email, password} = req.body;

        try {

           const userDto = await this.userService.registerUser({username, email, password})
            return res.status(200).json(userDto);

        } catch (error: any) {
            if (error.code === "P2002") {
                const target = error.meta?.target as string[] | undefined;
                const errorMessage = error.message || "";

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
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}