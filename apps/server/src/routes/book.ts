import {Router} from "express";
import {BookController} from "../controllers/book.controller";

const router = Router();
const bookController = new BookController();

router.get("/", async (req, res) =>
bookController.getBooks(req, res));

export default router;
