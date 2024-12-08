import express from "express";

import authenticate from "../Middlewares/authenticationMiddleware.js";
import {
  getChats,
  sendMessage,
  getMessages,
} from "../Controllers/messageController.js";
const router = express.Router();

router.get("/all", authenticate, getChats);
router.post("/send/:id", authenticate, sendMessage);
router.get("/getmessages/:id", authenticate, getMessages);

export default router;
