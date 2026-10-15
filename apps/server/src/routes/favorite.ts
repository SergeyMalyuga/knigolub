import {Router} from "express";
import {FavoriteService} from "../services/favorite.service";
import {FavoriteController} from "../controllers/favorite.controller";

const router = Router();
const favoriteController = new FavoriteController();

router.post('toggle', async (req, res, next) =>
    favoriteController.toggleFavorite(req, res, next))

export default router;