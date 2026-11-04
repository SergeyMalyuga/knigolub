import {Router} from "express";
import {ReviewController} from "../controllers/review.controller";

const router = Router();
const reviewController = new ReviewController();

router.post('/', (req, res, next) =>
    reviewController.createClubReview(req, res, next))

export default router;