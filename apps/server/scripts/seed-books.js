import pool from '../db.js';
import {getCoverUrl, searchBooks} from './utils/book-api.js';

/**
 * Проверка существования книги по названию
 * @param {string} title - Название книги
 * @returns {Promise<boolean>} true если книга существует
 */
async function checkIfExists(title) {
        const [rows] = await pool.execute(
            'SELECT id FROM books WHERE title = ? LIMIT 1',
            [title]
        );
        return rows.length > 0;
}

/**
 * Сохранение книги в базу данных
 * @param {Object} bookData - Данные книги
 * @returns {Promise<string>} ID сохраненной книги
 */
async function saveBook(bookData) {
    const query = `
    INSERT INTO books (title, author, coverUrl, publishYear, pageCount, genres, description, externalId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
        bookData.title,
        bookData.author,
        bookData.coverUrl,
        bookData.publishYear,
        bookData.pageCount,
        JSON.stringify(bookData.genres),
        bookData.description,
        bookData.externalId
    ];

    const [result] = await pool.execute(query, values);
    return result.insertId;
}

/**
 * Основная функция загрузки книг
 */
async function seedBooks() {
    console.log('🚀 Начинаем загрузку книг...\n');

    try {
        // Список популярных книг для загрузки
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

        const allBooks = [];

        // Собираем книги по всем запросам
        for (const query of queries) {
            console.log(`📖 Ищем: "${query}"...`);
            const books = await searchBooks(query, 10);
            allBooks.push(...books);

            // Задержка между запросами (чтобы не превысить лимиты API)
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Убираем дубликаты по ключу OpenLibrary
        const uniqueBooks = Array.from(
            new Map(allBooks.map(book => [book.key, book])).values()
        );

        console.log(`\n📚 Найдено уникальных книг: ${uniqueBooks.length}\n`);

        // Сохраняем в БД
        let savedCount = 0;
        let skippedCount = 0;

        for (const book of uniqueBooks) {
            try {
                // Проверяем, есть ли уже такая книга
                const exists = await checkIfExists(book.title);

                if (exists) {
                    console.log(`⏭️  Пропускаем (уже есть): "${book.title}"`);
                    skippedCount++;
                    continue;
                }

                // Формируем данные для сохранения
                const bookData = {
                    title: book.title,
                    author: book.author_name?.join(', ') || 'Неизвестен',
                    coverUrl: book.cover_i ? getCoverUrl(book.cover_i) : null,
                    publishYear: book.first_publish_year || null,
                    pageCount: book.number_of_pages_median || null,
                    genres: book.subject?.slice(0, 5) || [],
                    description: `Книга "${book.title}" ${book.author_name?.[0] || ''}`.trim(),
                    externalId: book.key
                };

                await saveBook(bookData);
                savedCount++;
                console.log(`✅ Сохранено: "${book.title}"`);
            } catch (error) {
                console.error(`❌ Ошибка при сохранении "${book.title}":`, error.message);
            }
        }

        console.log(`\n🎉 Готово!`);
        console.log(`   Сохранено книг: ${savedCount}`);
        console.log(`   Пропущено (дубликаты): ${skippedCount}`);

    } catch (error) {
        console.error('❌ Критическая ошибка:', error);
        process.exit(1);
    } finally {
        // Закрываем пул соединений
        await pool.end();
        console.log('\n🔌 Пул соединений закрыт');
    }
}

// Запуск скрипта
seedBooks();