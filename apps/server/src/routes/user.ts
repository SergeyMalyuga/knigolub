import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { uploadAvatar } from "../config/multer.config";
import {requireAuth} from "../middleware/require-auth.middleware";
import {authHandler} from "../utils/auth-hadler.utils";

const router = Router();
const userController = new UserController();

router.post(
  "/register",
  async (req, res, next) => await userController.register(req, res, next),
);

router.post("/login", async (req, res) => await userController.login(req, res));

router.get("/profile", async (req, res) =>
  userController.getCurrentUser(req, res),
);

router.post(
  "/avatar",
  uploadAvatar.single("avatarUrl"),
  async (req, res, next) => userController.uploadAvatar(req, res, next),
);

router.patch("/profile", async (req, res, next) =>
  userController.updateUser(req, res, next),
);

router.patch("/me/chat-status", requireAuth,
    authHandler((req, res, next) =>
        userController.updateChatStatus(req, res, next)));

export default router;
