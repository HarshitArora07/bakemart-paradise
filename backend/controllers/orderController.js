import Order from "../models/Order.js";

// @desc    Create a new order
// @route   POST /api/save-order
// @access  Public
export const saveOrder = async (req, res) => {
  try {
    const { items, customer, paymentId, paid } = req.body;

    const normalizedItems = items.map((item) => {
      const pricePerKg = Number(item.price) || 0;
      const weight = Number(item.weight) || 0;
      const quantity = Number(item.quantity) || 0;

      const subtotal = pricePerKg * weight * quantity;

      return {
        name: item.name,
        weight,
        quantity,
        price: pricePerKg,
        subtotal,
      };
    });

    const totalAmount = normalizedItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    const order = new Order({
      items: normalizedItems,
      totalAmount,
      customer,
      paid: paid ?? true,
      paymentId,
    });

    await order.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order saving failed" });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Fetch Orders Error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// @desc    Create simulation order (Razorpay mock)
// @route   POST /api/create-order
// @access  Public
export const createOrderSimulation = (req, res) => {
  const { amount } = req.body;

  res.json({
    orderId: "order_dummy_" + Date.now(),
    key: "rzp_test_dummy_key",
    amount,
  });
};
