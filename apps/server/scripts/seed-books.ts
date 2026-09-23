import {prisma} from '../lib/prisma';
import { getCoverUrl, searchBooks } from './utils/book-api.js';

// Минимальная типизация ответа от внешнего API (для удобства разработки)
interface ApiBook {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    number_of_pages_median?: number;
    subject?: string[];
}

/**
 * Основная функция загрузки книг
 */
async function seedBooks() {
    console.log('🚀 Начинаем загрузку книг...\n');

    try {
        const queries = [
            'Мастер и Маргарита',
            'Преступление и наказание',
            'Война и мир',
            '1984 George Orwell',
            'Гарри поттер',
            'The Lord of the Rings',
            'The witcher',
            'The Great Gatsby'
        ];

        const allBooks: ApiBook[] = [];

        // 1. Собираем книги по всем запросам
        for (const query of queries) {
            console.log(`📖 Ищем: "${query}"...`);
            const books = await searchBooks(query, 10) as ApiBook[];
            allBooks.push(...books);

            // Задержка между запросами (1 секунда)
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // 2. Убираем дубликаты по ключу OpenLibrary (key)
        const uniqueBooks = Array.from(
            new Map(allBooks.map(book => [book.key, book])).values()
        );

        console.log(`\n📚 Найдено уникальных книг: ${uniqueBooks.length}\n`);

        // 3. Сохраняем в БД
        let savedCount = 0;
        let skippedCount = 0;

        for (const book of uniqueBooks) {
            try {
                // Формируем данные. Prisma САМ превратит массив genres в JSON!
                const bookData = {
                    title: book.title,
                    author: book.author_name?.join(', ') || 'Неизвестен',
                    coverUrl: book.cover_i ? getCoverUrl(book.cover_i) : null,
                    publishYear: book.first_publish_year ? book.first_publish_year : null,
                    pageCount: book.number_of_pages_median || null,
                    genres: book.subject?.slice(0, 5) || [], // Просто передаем массив, Prisma разберется
                    description: `Книга "${book.title}" ${book.author_name?.[0] || ''}`.trim(),
                    externalId: book.key
                };

                // ПРОВЕРКА: Ищем по названию (как в оригинале)
                // 💡 PRO TIP: Гораздо надежнее искать по externalId (см. примечание ниже)
                const existingBook = await prisma.book.findFirst({
                    where: { title: book.title },
                    select: { id: true } // Запрашиваем только id для экономии памяти
                });

                if (existingBook) {
                    console.log(`⏭️ Пропускаем (уже есть): "${book.title}"`);
                    skippedCount++;
                    continue;
                }

                // СОХРАНЕНИЕ
                await prisma.book.create({
                    data: bookData
                });

                savedCount++;
                console.log(`✅ Сохранено: "${book.title}"`);

            } catch (error) {
                console.error(`❌ Ошибка при сохранении "${book.title}":`, error instanceof Error ? error.message : error);
            }
        }

        console.log(`\n🎉 Готово!`);
        console.log(`   Сохранено книг: ${savedCount}`);
        console.log(`   Пропущено (дубликаты): ${skippedCount}`);

    } catch (error) {
        console.error('❌ Критическая ошибка:', error);
        process.exit(1);
    } finally {
        // 4. Правильное закрытие соединения в Prisma
        await prisma.$disconnect();
        console.log('\n🔌 Соединение с БД закрыто');
    }
}

// Запуск скрипта
seedBooks();