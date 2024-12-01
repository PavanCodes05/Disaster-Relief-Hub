import express from "express";

import {
  createPost,
  getMyPosts,
  populatePosts,
} from "../Controllers/affectedController.js";
import authenticate from "../Middlewares/authenticationMiddleware.js";

const router = express.Router();

router.get("/myposts", authenticate, getMyPosts);
router.post("/create", authenticate, createPost);
router.get("/populateposts/:id", authenticate, populatePosts);

export default router;
