import express from "express";

import {
  getInventory,
  addInventory,
  deleteInventory,
  getRecommendedPosts,
  makeDonation,
} from "../Controllers/donorController.js";
import authenticate from "../Middlewares/authenticationMiddleware.js";
import donorAuthorization from "../Middlewares/donorAuthorization.js";

const router = express.Router();

router.get("/inventory", authenticate, donorAuthorization, getInventory);

router.post("/inventory/add", authenticate, donorAuthorization, addInventory);
router.post(
  "/inventory/delete",
  authenticate,
  donorAuthorization,
  deleteInventory
);
router.get(
  "/recommendedposts",
  authenticate,
  donorAuthorization,
  getRecommendedPosts
);

router.post("/makedonation", authenticate, donorAuthorization, makeDonation);

export default router;
