import { prisma } from "../../lib/prisma";
import { googleBooksService } from "../services/google-books.service";
import type { GoogleBookItem } from "../models/google-book-item";

async function saveBook(googleBook: GoogleBookItem) {
  const { id, volumeInfo } = googleBook;

  if (!volumeInfo.authors?.length) {
    return null;
  }

  // Извлекаем ISBN
  const isbn10 = volumeInfo.industryIdentifiers?.find(
    (id) => id.type === "ISBN_10",
  )?.identifier;

  const isbn13 = volumeInfo.industryIdentifiers?.find(
    (id) => id.type === "ISBN_13",
  )?.identifier;

  // Обрабатываем дату публикации
  let publishedDate: Date | null = null;
  if (volumeInfo.publishedDate) {
    // Google может возвращать дату в разных форматах: "2020", "2020-05", "2020-05-15"
    publishedDate = new Date(volumeInfo.publishedDate);
    if (isNaN(publishedDate.getTime())) {
      publishedDate = null;
    }
  }

  let thumbnail = volumeInfo.imageLinks?.thumbnail ?? null;
  if (thumbnail) {
    thumbnail = thumbnail
      .replace("http:", "https:")
      .replace("zoom=1", "zoom=5");
  }

  const data = {
    title: volumeInfo.title,
    authors: volumeInfo.authors ?? [],
    description:
      volumeInfo.description ??
      `${volumeInfo.authors?.join(", ")} -  ${volumeInfo.title}`,
    thumbnail: thumbnail,
    isbn10: isbn10 ?? null,
    isbn13: isbn13 ?? null,
    publisher: volumeInfo.publisher ?? null,
    publishedAt: publishedDate,
    pageCount: volumeInfo.pageCount ?? null,
    language: volumeInfo.language ?? "ru",
    categories: volumeInfo.categories ?? [],
  };

  const book = await prisma.book.upsert({
    where: {
      googleId: id,
    },
    update: data,
    create: { googleId: id, ...data },
  });

  return book;
}

async function seedBooks() {
  console.log("🚀 Начинаем загрузку книг...\n");

  try {
    const queries = [
      "Мастер и Маргарита",
      "Преступление и наказание",
      "Война и мир",
      "Ведьмак",
      "Гарри поттер",
      "Властелин колец",
      "Вий",
      "Братья Стругацкие",
      "Андрей Беляев",
      "Андрей Белянин",
    ];

    const allBooks: GoogleBookItem[] = [];

    for (const query of queries) {
      console.log(`📖 Ищем: "${query}"...`);
      const books = await googleBooksService.searchBooks(query, 20);
      allBooks.push(...books);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const uniqueBooks = Array.from(
      new Map(allBooks.map((book) => [book.id, book])).values(),
    );

    console.log(`\n📚 Найдено уникальных книг: ${uniqueBooks.length}\n`);

    // 3. Сохраняем в БД
    let savedCount = 0;
    let failedCount = 0;

    for (const book of uniqueBooks) {
      try {
        await saveBook(book);
        savedCount++;
        console.log(`✅ Сохранено: "${book.volumeInfo.title}"`);
      } catch (err) {
        failedCount++;
        console.error(`❌ Ошибка: "${book.volumeInfo.title}"`, err);
      }
    }
  } catch (error) {
    console.error("❌ Критическая ошибка:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("\n🔌 Соединение с БД закрыто");
  }
}

await seedBooks();
