import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import ChatGroupController from "../controllers/ChatGroupController.js";
import ChatGroupUserContrller from "../controllers/ChatGroupUserController.js";
import ChatsController from "../controllers/ChatsController.js";

const router = Router();

// Auth Router
router.post("/auth/login", AuthController.login);

//chat group creating
router.post("/chat-group", authMiddleware, ChatGroupController.store);
// find unique chat group
router.get("/chat-group/:id", ChatGroupController.show);

//find all group chat
router.get("/chat-group/", authMiddleware, ChatGroupController.index);

//update group chat
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);

//delete the group chat
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.delete);

// * Chat group user

router.get("/chat-group-users", ChatGroupUserContrller.index);

router.post("/chat-group-users", ChatGroupUserContrller.store);

// * Chats Messages

router.get("/chats/:groupId", ChatsController.index);
export default router;
