import express from "express";
import razorpay from "../config/razorpay.js";

const router = express.Router();

/**
 * ✅ CREATE ORDER
 */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

/**
 * ✅ SAVE ORDER
 */
router.post("/save-order", async (req, res) => {
  try {
    const orderData = req.body;

    // 🔹 You can later save this to MongoDB
    console.log("ORDER RECEIVED:", orderData);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
});

export default router;
