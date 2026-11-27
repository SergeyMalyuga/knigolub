import { prisma } from "../../lib/prisma";
import type { CreateMessageInput } from "../types/create-message-input.type";
import { mapPrismaToMessage } from "../mappers/message.mapper";
import type { Message } from "@knigolub/shared";
import { MESSAGES_LIMIT } from "../constants/const";
import { getAbsoluteAvatarUrl } from "../utils/url.utils";

export class MessageService {
  /**
   * Создаёт сообщение.
   *
   * @param input - Данные для создания сообщения.
   * @param input.userId - ID пользователя (из JWT).
   * @param input.text - Текст сообщения.
   * @returns Сообщение с данными автора
   */
  public async createMessage(input: CreateMessageInput): Promise<Message> {
    const prismaMessage = await prisma.message.create({
      data: {
        text: input.text,
        userId: input.userId,
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    const message = mapPrismaToMessage(prismaMessage);
    message.author.avatarUrl = getAbsoluteAvatarUrl(message.author.avatarUrl);
    return message;
  }

  /**
   * Получает сообщения.
   *
   * @returns Список сообщений.
   */
  public async getMessages(): Promise<Message[]> {
    const prismaMessages = await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: MESSAGES_LIMIT,
      select: {
        id: true,
        text: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });
    return prismaMessages.reverse().map((message) => {
      message.user.avatarUrl = getAbsoluteAvatarUrl(message.user.avatarUrl);
      return mapPrismaToMessage(message);
    });
  }
}
