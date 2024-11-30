import express from "express";

import authenticate from "../Middlewares/authenticationMiddleware.js";
import {
  signUp,
  logIn,
  logOut,
  myProfile,
  getUser,
} from "../Controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.get("/myprofile", authenticate, myProfile);

router.get("/profile/:id", authenticate, getUser);

export default router;
