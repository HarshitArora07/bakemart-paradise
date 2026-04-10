import express from "express";
import {
  saveOrder,
  getOrders,
  createOrderSimulation,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", createOrderSimulation);
router.post("/save-order", saveOrder);
router.get("/orders", getOrders);

export default router;
