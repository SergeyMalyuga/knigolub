import {Router} from 'express';
import {prisma} from "../lib/prisma";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    } catch (err) {
        console.error('Ошибка при получении книг:', err);
        res.status(500).json({error: 'Не удалось получить книги'});
    }
})

export default router;