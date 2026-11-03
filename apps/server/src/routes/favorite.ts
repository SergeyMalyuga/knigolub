import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller";

const router = Router();
const favoriteController = new FavoriteController();

router.post("/toggle", async (req, res, next) =>
  favoriteController.toggleFavorite(req, res, next),
);

router.get("/", async (req, res, next) =>
  favoriteController.getFavorites(req, res, next),
);

export default router;
