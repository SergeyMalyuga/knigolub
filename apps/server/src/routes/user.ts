import {Router} from "express";
import {prisma} from "../../lib/prisma";
import bcrypt from 'bcrypt';
import type {User as PrismaUser} from '../../generated/prisma/client';
import {mapPrismaUserToUser} from "../mapper/user.mapper";
import {generateToken} from "../utils/jwt.util";
import type {UserDto} from "@knigolub/shared/src/models/user.dto";
import type {ErrorResponse} from "@knigolub/shared/src/models/error-response";

const router = Router();

router.get("/", async (req, res) => {
    res.send("User сервер работает");
});

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

            const field = error.meta?.target as string[];

            if (field?.includes("username")) {
                const errorResponse: ErrorResponse = {
                    message: "Этот ник уже занят",
                    field: "username",
                }
                return res.status(409).json(errorResponse);
            }

            if (field?.includes("email")) {
                const errorResponse = {
                    message: "Этот email уже зарегистрирован",
                    field: "email",
                }
                return res.status(409).json(errorResponse);
            }
        }
    }

    return res.status(500).json({
        message: "Внутренняя ошибка сервера",
    });
})

export default router;
