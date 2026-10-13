import {type Credential, type NewUser, type User, type UserDto, UserErrorField} from "@knigolub/shared";
import type {User as PrismaUser} from "../../generated/prisma/client";
import {prisma} from "../../lib/prisma";
import {mapPrismaUserToUser} from "../mappers/user.mapper";
import {generateToken} from "../utils/jwt.util";
import bcrypt from "bcrypt";
import {AuthError} from "../errors/auth.error";
import {NotFoundError} from "../errors/not-found.error";
import {DEFAULT_AVATAR_URL} from "../constants/const";

export class UserService {
    public async registerUser(newUser: NewUser): Promise<UserDto> {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        const prismaUser: PrismaUser = await prisma.user.create({
            data: {
                username: newUser.username,
                email: newUser.email,
                password: hashedPassword,
                avatarUrl: DEFAULT_AVATAR_URL
            },
        });

        const user = mapPrismaUserToUser(prismaUser);
        const token = generateToken(user);

        const userDto: UserDto = {
            user,
            token,
        };

        return userDto;
    }

    public async loginUser(credentials: Credential): Promise<UserDto> {
        const prismaUser: PrismaUser | null = await prisma.user.findUnique({where: {email: credentials.email}});

        if (!prismaUser) {
            throw new AuthError('Неверный email или пароль', UserErrorField.EMAIL, 401);
        }

        const passwordValid = await bcrypt.compare(credentials.password, prismaUser.password);

        if (!passwordValid) {
            throw new AuthError('Неверный email или пароль', UserErrorField.PASSWORD, 401);
        }

        const user = mapPrismaUserToUser(prismaUser);
        const token = generateToken(user);
        const userDto: UserDto = {
            user,
            token,
        };

        return userDto;
    }

    public async getUserById(id: string): Promise<User> {
        const prismaUser: PrismaUser | null = await prisma.user.findUnique({where: {id}});

        if (!prismaUser) {
            throw new NotFoundError(`Пользователь с id "${id}" не найден`);
        }

        const user = mapPrismaUserToUser(prismaUser);

        return user;
    }
}
