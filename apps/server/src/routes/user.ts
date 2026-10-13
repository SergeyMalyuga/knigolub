import {Router} from "express";
import {UserController} from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post(
    "/register",
    async (req, res) => await userController.register(req, res),
);

router.post("/login", async (req, res) => await userController.login(req, res));

router.get("/profile", async (req, res) => userController.getCurrentUser(req, res));

export default router;
