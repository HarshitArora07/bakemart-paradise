import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// -------------------- MIDDLEWARE --------------------
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
    customer: {
      fullName: String,
      phone: String,
      email: String,
      cakeMessage: String,
      deliveryDate: String,
      deliverySlot: String,
    },
    paid: Boolean,
    paymentId: String,
    status: {
      type: String,
      default: "PLACED",
    },
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
    key: "rzp_test_dummy_key",
    amount,
  });
});

// 🔹 Save Order
app.post("/api/save-order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      orderId: order._id,
    });
  } catch (err) {
    console.error("❌ Save Order Error:", err);
    res.status(500).json({ error: "Order saving failed" });
  }
});

// 🔹 Get All Orders (Latest First)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Fetch Orders Error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
