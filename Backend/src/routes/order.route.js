import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { createOrder, getOrder, getOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.route('/')
  .post(verifyToken, createOrder) // Create order
  .get(verifyToken, getOrders); // Get all

router.get('/:orderId', verifyToken, getOrder); // Get one

export default router;