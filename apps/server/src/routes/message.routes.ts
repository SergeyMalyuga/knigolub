import {Router} from 'express';
import {requireAuth} from "../middleware/require-auth.middleware";
import {authHandler} from "../utils/auth-handler.utils";
import {MessageController} from "../controllers/message.controller";

const router = Router();
const messageController = new MessageController();

router.post('/', requireAuth, authHandler((req, res, next) =>
    messageController.createMessage(req, res, next)
));

export default router;