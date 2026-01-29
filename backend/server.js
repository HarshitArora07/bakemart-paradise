import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Order schema
const orderSchema = new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  customer: Object,
  paid: Boolean,
  paymentId: String,
  date: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);

// Routes
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      payment_capture: 1,
    });
    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Razorpay order creation failed" });
  }
});

app.post("/api/save-order", async (req, res) => {
  try {
    const { items, totalAmount, customer, paid, paymentId } = req.body;
    const newOrder = new Order({ items, totalAmount, customer, paid, paymentId });
    await newOrder.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
