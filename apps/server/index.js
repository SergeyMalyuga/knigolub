import express from "express";
import db from "./db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.send('сервер работает');
})

app.listen(port, () => console.log(`Listening on port ${port}`));

