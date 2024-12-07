import express from "express";

import authenticate from "../Middlewares/authenticationMiddleware.js";
import { getChats } from "../Controllers/messageController.js";
const router = express.Router();

router.get("/all", authenticate, getChats);

export default router;
