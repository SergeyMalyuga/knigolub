import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { requireAuth } from "../middleware/require-auth.middleware";

const router = Router();
const reviewController = new ReviewController();

router.post("/", requireAuth, (req, res, next) =>
  reviewController.createClubReview(req, res, next),
);

router.get("/", (req, res, next) =>
  reviewController.getClubReviews(req, res, next),
);

router.get("/user", requireAuth, (req, res, next) =>
  reviewController.getUserClubReview(req, res, next),
);

export default router;
