import express from "express";

import authenticate from "../Middlewares/authenticationMiddleware.js";
import { getAllNotifications } from "../Controllers/notificationController.js";

const router = express.Router();

router.get("/all", authenticate, getAllNotifications);

export default router;
