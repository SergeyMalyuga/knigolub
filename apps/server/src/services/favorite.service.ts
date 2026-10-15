import { prisma } from "../../lib/prisma";
import type { Book, FavoriteResponse } from "@knigolub/shared";
import { mapPrismaBookToBook } from "../mappers/book.mapper";

export class FavoriteService {

  /**
   * Получает избранные книги пользователя
   *
   * @body { userId: string } - ID пользователя
   * @returns Book[]
   */
  public async getUserFavorites(userId: string): Promise<Book[]> {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        book: true,
      },
    });

    const books: Book[] = favorites.map((fav) => ({
      ...mapPrismaBookToBook(fav.book),
      isFavorite: true,
    }));

    return books;
  }


  /**
   * Добавляет книгу в избранное
   *
   * @body { userId: string } - ID пользователя
   * @returns Book[]
   */
  public async addToFavorites(
    userId: string,
    bookId: string,
  ): Promise<Book> {
    const response = await prisma.favorite.upsert({
      where: { userId_bookId: { userId, bookId } },
      update: {},
      create: { userId, bookId },
      include: {book: true}
    });

    const book: Book = {...mapPrismaBookToBook(response.book), isFavorite: true};
    return book;
  }

  /**
   * Удаляет книгу из избранного
   *
   * @body { userId: string } - ID пользователя
   * @returns Book[]
   */
  public async deleteFavorite(
    userId: string,
    bookId: string,
  ): Promise<Book> {
    const response = await prisma.favorite.delete({
      where: { userId_bookId: { userId, bookId } },
      include: {book: true}
    });

    const book: Book = {...mapPrismaBookToBook(response.book), isFavorite: false};
    return book;
  }

  /**
   * Переключает статус книги в избранном пользователя.
   * Если книга уже в избранном — удаляет, иначе добавляет.
   *
   * @body { bookId: string } - ID книги
   * @returns { Book }
   */
  public async toggleFavorite(
    userId: string,
    bookId: string,
  ): Promise<Book> {
    const exist = await prisma.favorite.findUnique({
      where: { userId_bookId: { userId, bookId } },
    });

    if (!exist) {
      return await this.addToFavorites(userId, bookId);
    }

    return await this.deleteFavorite(userId, bookId);
  }
}
