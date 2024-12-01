import express from "express";

import {
  getInventory,
  addInventory,
  deleteInventory,
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

export default router;