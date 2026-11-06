import {
  type AvatarResponse,
  type Credential,
  type NewUser,
  type UpdateUser,
  type User,
  type UserDto,
  UserErrorField,
} from "@knigolub/shared";
import type { User as PrismaUser } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { mapPrismaUserToUser } from "../mappers/user.mapper";
import { generateToken } from "../utils/jwt.util";
import bcrypt from "bcrypt";
import { AuthError } from "../errors/auth.error";
import { NotFoundError } from "../errors/not-found.error";
import { DEFAULT_AVATAR_URL } from "../constants/const";
import { getAbsoluteAvatarUrl } from "../utils/url.utils";
import { deleteFileSafely } from "../utils/file.utils";

export class UserService {
  /**
   * Регистрирует нового пользователя в системе.
   * Хеширует пароль, устанавливает аватар по умолчанию и генерирует JWT-токен.
   *
   * @param newUser - Данные для регистрации (username, email, password).
   * @returns Объект UserDto, содержащий данные пользователя и токен авторизации.
   * @throws {Prisma.PrismaClientKnownRequestError} Если пользователь с таким email или username уже существует (ошибка уникальности P2002).
   */
  public async registerUser(newUser: NewUser): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const prismaUser: PrismaUser = await prisma.user.create({
      data: {
        username: newUser.username,
        email: newUser.email,
        password: hashedPassword,
        avatarUrl: DEFAULT_AVATAR_URL,
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

  /**
   * Аутентифицирует пользователя по email и паролю.
   *
   * @param credentials - Учетные данные пользователя (email и password).
   * @returns Объект UserDto с данными пользователя и новым JWT-токеном.
   * @throws {AuthError} Если пользователь не найден или пароль неверен (статус 401).
   */
  public async loginUser(credentials: Credential): Promise<UserDto> {
    const prismaUser: PrismaUser | null = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!prismaUser) {
      throw new AuthError(
        "Неверный email или пароль",
        UserErrorField.EMAIL,
        401,
      );
    }

    const passwordValid = await bcrypt.compare(
      credentials.password,
      prismaUser.password,
    );

    if (!passwordValid) {
      throw new AuthError(
        "Неверный email или пароль",
        UserErrorField.PASSWORD,
        401,
      );
    }

    const user = {
      ...mapPrismaUserToUser(prismaUser),
      avatarUrl: getAbsoluteAvatarUrl(prismaUser.avatarUrl),
    };
    const token = generateToken(user);

    const userDto: UserDto = {
      user,
      token,
    };

    return userDto;
  }

  /**
   * Получает данные пользователя по его уникальному идентификатору.
   * Преобразует относительный путь аватара в абсолютный URL.
   *
   * @param id - Уникальный идентификатор пользователя.
   * @returns Объект User с полными данными пользователя.
   * @throws {NotFoundError} Если пользователь с указанным ID не найден.
   */
  public async getUserById(id: string): Promise<User> {
    const prismaUser: PrismaUser | null = await prisma.user.findUnique({
      where: { id },
    });

    if (!prismaUser) {
      throw new NotFoundError(`Пользователь с id "${id}" не найден`);
    }
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const absoluteUrl = `${baseUrl}${prismaUser.avatarUrl}`;
    const user = { ...mapPrismaUserToUser(prismaUser), avatarUrl: absoluteUrl };

    return user;
  }

  /**
   * Обновляет URL аватара пользователя.
   * Безопасно удаляет старый файл аватара из файловой системы, если он отличается от нового.
   *
   * @param userId - Уникальный идентификатор пользователя.
   * @param avatarUrl - Новый путь к файлу аватара.
   * @returns Объект AvatarResponse с обновленными данными (ID и абсолютный URL аватара).
   * @throws {Prisma.PrismaClientKnownRequestError} Если пользователь с указанным ID не найден (ошибка P2025).
   */
  public async updateAvatar(userId: string, avatarUrl: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        avatarUrl: true,
      },
    });

    if (user?.avatarUrl && user.avatarUrl !== avatarUrl) {
      deleteFileSafely(user.avatarUrl);
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
      select: {
        id: true,
        avatarUrl: true,
      },
    });

    const response: AvatarResponse = {
      ...updateUser,
      avatarUrl: getAbsoluteAvatarUrl(updateUser.avatarUrl),
    };

    return response;
  }

  /**
   * Обновляет данные пользователя.
   * Преобразует относительный путь аватара в абсолютный URL в возвращаемом объекте.
   *
   * @param userId - Уникальный идентификатор обновляемого пользователя.
   * @param dto - Объект с полями, которые необходимо обновить.
   * @returns Объект User с обновленными данными.
   * @throws {NotFoundError} Если пользователь с указанным ID не найден.
   */
  public async updateUser(userId: string, dto: UpdateUser): Promise<User> {
    //TODO return User
    if (Object.keys(dto).length === 0) {
      const prismaUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!prismaUser) {
        throw new NotFoundError(`Пользователь с id "${userId}" не найден`);
      }
    }

    const prismaUser = await prisma.user.update({
      where: { id: userId },
      data: dto,
    });

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const absoluteUrl = `${baseUrl}${prismaUser.avatarUrl}`;

    const user = { ...mapPrismaUserToUser(prismaUser), avatarUrl: absoluteUrl };

    return user;
  }
}
