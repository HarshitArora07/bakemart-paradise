import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        weight: Number,
        quantity: Number,
        price: Number,
        subtotal: Number,
      },
    ],
    totalAmount: Number,
    customer: {
      fullName: String,
      phone: String,
      email: String,
      cakeMessage: String,
      deliveryDate: String,
      deliverySlot: String,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    paymentId: String,
    status: {
      type: String,
      default: "PLACED",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
