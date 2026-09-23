import express from "express";
import dotenv from "dotenv";
import db from "./db.js";
import cors from "cors";
import userRouter from "./routes/user.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.send('сервер работает');
})

app.get('/books', async (req, res) => {
    try {
        const [result] = await db.execute('SELECT * FROM books');
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Не удалось получить книгу' });
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`));

