import { prisma } from "../../lib/prisma";
import type { CreateMessageInput } from "../types/create-message-input.type";
import { mapPrismaToMessage } from "../mappers/message.mapper";
import type { Message } from "@knigolub/shared";

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
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    return mapPrismaToMessage(prismaMessage);
  }
}
