import { Router } from "express";
import { authCheck } from "../middleware/authMiddleware";
import {
  sendMessageToChatGPT,
  getChatByUser,
} from "../controller/chatController";

const router = Router();

router.route("/chat").post(authCheck, sendMessageToChatGPT as any);
router.route("/allChat/:id").get(getChatByUser);

export default router;
