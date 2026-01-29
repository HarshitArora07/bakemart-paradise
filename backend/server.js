import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// -------------------- DB CONNECT --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// -------------------- ORDER MODEL --------------------
const orderSchema = new mongoose.Schema(
  {
    items: Array,
    totalAmount: Number,
    customer: Object,
    paid: Boolean,
    paymentId: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

// -------------------- ROUTES --------------------

// 🔹 Fake Razorpay Order (Simulation)
app.post("/api/create-order", (req, res) => {
  const { amount } = req.body;

  res.json({
    orderId: "order_dummy_" + Date.now(),
    key: "rzp_test_dummy_key", // frontend expects this
  });
});

// 🔹 Save Order
app.post("/api/save-order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.json({
      success: true,
      message: "Order saved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order saving failed" });
  }
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on port ${PORT}`)
);
