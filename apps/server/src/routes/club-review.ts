import {Router} from "express";
import {ReviewController} from "../controllers/review.controller";
import {requireAuth} from "../middleware/require-auth.middleware";
import {authHandler} from "../utils/auth-hadler.utils";

const router = Router();
const reviewController = new ReviewController();

router.post("/", requireAuth,
    authHandler((req, res, next) =>
        reviewController.getUserClubReview(req, res, next)
    ),
);

router.get("/", (req, res, next) =>
    reviewController.getClubReviews(req, res, next),
);

router.get("/user", requireAuth, authHandler((req, res, next) =>
    reviewController.getUserClubReview(req, res, next))
);

export default router;
