import {Router} from "express";
import {prisma} from "../../lib/prisma";
import bcrypt from 'bcrypt';
import type {User as PrismaUser} from '../../generated/prisma/client';
import {mapPrismaUserToUser} from "../mapper/user.mapper";
import {generateToken} from "../utils/jwt.util";
import type {UserDto} from "@knigolub/shared/src/models/user.dto";
import type {ErrorResponse} from "@knigolub/shared/src/models/error-response";
import {UserErrorField} from "@knigolub/shared";

const router = Router();

router.post("/register", async (req, res) => {
    const {username, password, email} = req.body;

    try {
        const newUser: PrismaUser = await prisma.user.create({
            data: {
                username,
                email,
                password: await bcrypt.hash(password, 10),
            }
        })

        const user = mapPrismaUserToUser(newUser);
        const userDto: UserDto = {
            user,
            token: generateToken(user),
        }

        return res.status(200).json(userDto);

    } catch (error: any) {
        if (error.code === "P2002") {
            const target = error.meta?.target as string[] | undefined;
            const errorMessage = error.message || "";

            const isUsernameError = target?.includes(UserErrorField.USERNAME) || errorMessage.includes("User_username_key");
            const isEmailError = target?.includes(UserErrorField.EMAIL) || errorMessage.includes("User_email_key");

            if (isUsernameError) {
                const errorResponse: ErrorResponse = {
                    message: "Этот ник уже занят",
                    field: UserErrorField.USERNAME,
                }
                return res.status(409).json(errorResponse);
            }

            if (isEmailError) {
                const errorResponse: ErrorResponse = {
                    message: "Этот email уже зарегистрирован",
                    field: UserErrorField.EMAIL,
                }
                return res.status(409).json(errorResponse);
            }
        }
        return res.status(500).json({
            message: error.message,
        });
    }
})

export default router;
