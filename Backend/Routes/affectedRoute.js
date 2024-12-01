import express from "express";

import { createPost } from "../Controllers/affectedController.js";
import authenticate from "../Middlewares/authenticationMiddleware.js";

const router = express.Router();

router.post("/create", authenticate, createPost);

export default router;
