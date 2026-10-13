import type {NewUser, UserDto} from "@knigolub/shared";
import type {User as PrismaUser} from "../../generated/prisma/client";
import {prisma} from "../../lib/prisma";
import {mapPrismaUserToUser} from "../mappers/user.mapper";
import {generateToken} from "../utils/jwt.util";
import bcrypt from "bcrypt";

export class UserService {
    public async registerUser(newUser: NewUser): Promise<UserDto> {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        const prismaUser: PrismaUser = await prisma.user.create({
            data: {
                username: newUser.username,
                email: newUser.email,
                password: hashedPassword
            }
        });

        const user = mapPrismaUserToUser(prismaUser);
        const token = generateToken(user);

        const userDto: UserDto = {
            user,
            token,
        };

        return userDto;
    }
}