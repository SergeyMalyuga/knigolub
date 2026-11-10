import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { requireAuth } from "../middleware/require-auth.middleware";
import { authHandler } from "../utils/auth-hadler.utils";

const router = Router();
const reviewController = new ReviewController();

router.post(
  "/",
  requireAuth,
  authHandler((req, res, next) =>
    reviewController.createClubReview(req, res, next),
  ),
);

router.get("/", (req, res, next) =>
  reviewController.getClubReviews(req, res, next),
);

router.get(
  "/user",
  requireAuth,
  authHandler((req, res, next) =>
    reviewController.getUserClubReview(req, res, next),
  ),
);

router.patch(
  "/:id",
  requireAuth,
  authHandler((req, res, next) =>
    reviewController.updateClubReview(req, res, next),
  ),
);

export default router;
