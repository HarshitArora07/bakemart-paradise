import React, { useEffect, useState } from "react";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-black/50 text-white">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-white/70">You have no past orders.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <h2 className="font-bold text-lg mb-2">Order #{i+1}</h2>
              <ul className="list-disc list-inside text-white/80">
                {order.items.map((item,idx)=>(
                  <li key={idx}>{item.name} - {item.weight}kg × {item.quantity} = ₹{item.totalPrice}</li>
                ))}
              </ul>
              <p className="mt-2 font-semibold">Total: ₹{order.totalAmount}</p>
              <p className="text-xs text-white/60">{new Date(order.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
