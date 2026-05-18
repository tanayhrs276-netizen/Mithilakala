import express from "express";
import {
  createPayment,
  getUserPayments,
  updatePaymentStatus
} from "../controller/paymentController.js";

const router = express.Router();

// ✅ Create payment
router.post("/create", createPayment);

// ✅ Get all payments of a user
router.get("/:userId", getUserPayments);

// ✅ Update payment status
router.put("/update/:paymentId", updatePaymentStatus);

export default router;