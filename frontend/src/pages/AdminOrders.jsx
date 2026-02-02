import React, { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://bakemart-backend.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-white mt-20">Loading orders...</p>;
  }

  // 🔹 Group orders by date
  const groupedOrders = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-20">
      {/* ADMIN HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#ffe6c0]">
          👑 Admin Panel
        </h1>
        <p className="text-white/70 mt-1">
          Orders received from customers
        </p>
      </div>

      {Object.keys(groupedOrders).length === 0 && (
        <p className="text-center text-white/60">
          No orders received yet.
        </p>
      )}

      {Object.keys(groupedOrders).map((date) => (
        <div key={date} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1">
            📅 {date}
          </h2>

          <div className="space-y-4">
            {groupedOrders[date].map((order) => (
              <div
                key={order._id}
                className="bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition"
              >
                <div className="flex justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-bold text-lg">
                      {order.customer.fullName}
                    </p>
                    <p className="text-sm text-white/70">
                      {order.customer.phone} · {order.customer.email}
                    </p>
                    <p className="text-sm text-white/70 mt-1">
                      🚚 Delivery: {order.customer.deliveryDate} (
                      {order.customer.deliverySlot})
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-green-400 text-lg">
                      ₹{order.totalAmount}
                    </p>
                    <p className="text-xs text-white/60">
                      Payment ID: {order.paymentId}
                    </p>
                  </div>
                </div>

                <div className="mt-3 text-sm text-white/80">
                  <p className="font-semibold mb-1">Items</p>
                  <ul className="list-disc ml-5 space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} — {item.weight}kg × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
