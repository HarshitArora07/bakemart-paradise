import React, { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Filters
  const [searchText, setSearchText] = useState(
    new URLSearchParams(window.location.search).get("search") || ""
  );
  const [fromDate, setFromDate] = useState(
    new URLSearchParams(window.location.search).get("from") || ""
  );
  const [toDate, setToDate] = useState(
    new URLSearchParams(window.location.search).get("to") || ""
  );

  // 📊 Analytics drawer
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsView, setAnalyticsView] = useState("daily"); // "daily" or "monthly"

  useEffect(() => {
    fetch("https://bakemart-backend.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);

        // Apply filters from URL on page load
        if (searchText || fromDate || toDate) {
          applyFilters(data);
        }

        setLoading(false);
      });
  }, []);

  // 🔎 APPLY SEARCH + DATE FILTER
  const applyFilters = (ordersToFilter = orders) => {
    const result = ordersToFilter.filter((order) => {
      const namePhoneMatch =
        order.customer.fullName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        order.customer.phone.includes(searchText);

      const orderDate = new Date(order.createdAt)
        .toISOString()
        .split("T")[0];

      const fromOk = !fromDate || orderDate >= fromDate;
      const toOk = !toDate || orderDate <= toDate;

      return namePhoneMatch && fromOk && toOk;
    });

    setFilteredOrders(result);

    // 💾 Save filters in URL
    const params = new URLSearchParams();
    if (searchText) params.set("search", searchText);
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
  };

  // 📤 EXPORT TO EXCEL (CSV)
  const exportToExcel = () => {
    if (filteredOrders.length === 0) return;

    const headers = [
      "Name",
      "Phone",
      "Email",
      "Amount",
      "Delivery Date",
      "Delivery Slot",
      "Payment ID",
    ];

    const rows = filteredOrders.map((o) => [
      o.customer.fullName,
      o.customer.phone,
      o.customer.email,
      o.totalAmount,
      o.customer.deliveryDate,
      o.customer.deliverySlot,
      o.paymentId,
    ]);

    const csvContent =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bakemart-orders.csv";
    link.click();
  };

  // 🧾 PRINT INVOICE
  const printInvoice = (order) => {
    const invoiceWindow = window.open("", "_blank", "width=800,height=600");
    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${order.customer.fullName}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h1 { color: #ffe6c0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <h1>Invoice</h1>
          <p><strong>Name:</strong> ${order.customer.fullName}</p>
          <p><strong>Phone:</strong> ${order.customer.phone}</p>
          <p><strong>Email:</strong> ${order.customer.email}</p>
          <p><strong>Delivery:</strong> ${order.customer.deliveryDate} · ${order.customer.deliverySlot}</p>
          <p><strong>Payment ID:</strong> ${order.paymentId}</p>

          <h2>Items</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Weight</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item) =>
                    `<tr>
                      <td>${item.name}</td>
                      <td>${item.weight}kg</td>
                      <td>${item.quantity}</td>
                      <td>₹${item.weight * item.quantity}</td>
                    </tr>`
                )
                .join("")}
            </tbody>
          </table>

          <h3>Total: ₹${order.totalAmount}</h3>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
    invoiceWindow.print();
  };

  if (loading) {
    return (
      <p className="text-center text-white mt-32 text-lg animate-pulse">
        Loading orders…
      </p>
    );
  }

  // 🔹 GROUP FILTERED ORDERS BY DATE
  const groupedOrders = filteredOrders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  // 📊 ANALYTICS CALCULATION
  const analyticsData = () => {
    const dataMap = {};
    filteredOrders.forEach((order) => {
      const dateObj = new Date(order.createdAt);
      const key =
        analyticsView === "daily"
          ? dateObj.toISOString().split("T")[0]
          : `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`;
      if (!dataMap[key]) dataMap[key] = { orders: 0, revenue: 0 };
      dataMap[key].orders += 1;
      dataMap[key].revenue += order.totalAmount;
    });

    const sortedKeys = Object.keys(dataMap).sort((a, b) => (a < b ? 1 : -1));
    return sortedKeys.map((key) => ({ date: key, ...dataMap[key] }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24">
      {/* ADMIN HEADER */}
<div className="mb-8">
  <div className="flex flex-col gap-4 md:flex-row md:items-center">
    
    {/* LEFT SPACER (desktop only) */}
    <div className="hidden md:block w-[140px]" />

    {/* CENTER TITLE */}
    <div className="text-center flex-1">
      <h1 className="text-4xl font-extrabold text-[#ffe6c0]">
        👑 Admin Orders
      </h1>
      <p className="text-white/70 mt-2">
        Manage and review all customer orders
      </p>
    </div>

    {/* RIGHT BUTTON */}
    <div className="flex justify-end">
      <button
        onClick={() => setShowAnalytics(true)}
        className="bg-[#ffe6c0] text-black px-4 py-2 rounded font-semibold shadow-lg"
      >
        📊 Analytics
      </button>
    </div>

  </div>
</div>

      {/* Analytics Drawer */}
      {showAnalytics && (
        <div className="fixed top-0 right-0 w-96 h-full bg-black/95 p-6 shadow-2xl overflow-y-auto z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#ffe6c0]">📊 Orders Analytics</h2>
            <button
              onClick={() => setShowAnalytics(false)}
              className="text-white text-lg font-bold"
            >
              ✖
            </button>
          </div>

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setAnalyticsView("daily")}
              className={`px-4 py-2 rounded ${
                analyticsView === "daily" ? "bg-[#ffe6c0] text-black" : "bg-white/10 text-white"
              } font-semibold`}
            >
              Daily
            </button>
            <button
              onClick={() => setAnalyticsView("monthly")}
              className={`px-4 py-2 rounded ${
                analyticsView === "monthly" ? "bg-[#ffe6c0] text-black" : "bg-white/10 text-white"
              } font-semibold`}
            >
              Monthly
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {analyticsData().map((item) => (
              <div key={item.date} className="bg-white/10 p-4 rounded-xl">
                <p className="text-sm text-white/70">
                  {analyticsView === "daily" ? "Date" : "Month"}:{" "}
                  <span className="font-semibold">{item.date}</span>
                </p>
                <p className="text-lg mt-1">
                  Orders: <span className="font-bold">{item.orders}</span>
                </p>
                <p className="text-lg">
                  Revenue: <span className="font-bold text-green-400">₹{item.revenue}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🔍 FILTER BAR */}
<div
  className="
    bg-white/10 rounded-xl p-2 mb-10 w-full
    flex flex-row items-center gap-1
    md:flex-row md:gap-2
  "
>
  {/* Name / Phone input - 25% */}
  <input
    type="text"
    placeholder="Name / phone"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    className="
      bg-black/40 px-1 py-1 rounded text-[10px]
      flex-[2.5] min-w-0 shrink
      md:flex-[1] md:w-1/4 md:px-3 md:py-2 md:text-sm
    "
  />

  {/* From Date - 25% */}
  <input
    type="date"
    value={fromDate}
    onChange={(e) => setFromDate(e.target.value)}
    className="
      bg-black/40 px-1 py-1 rounded text-[10px] text-white
      flex-[2.5] min-w-0 shrink
      md:flex-[1] md:w-1/4 md:px-3 md:py-2 md:text-sm
      appearance-none
      [&::-webkit-calendar-picker-indicator]:invert(1)
      [&::-webkit-calendar-picker-indicator]:contrast(100%)
    "
  />

  {/* To Date - 25% */}
  <input
    type="date"
    value={toDate}
    onChange={(e) => setToDate(e.target.value)}
    className="
      bg-black/40 px-1 py-1 rounded text-[10px] text-white
      flex-[2.5] min-w-0 shrink
      md:flex-[1] md:w-1/4 md:px-3 md:py-2 md:text-sm
      appearance-none
      [&::-webkit-calendar-picker-indicator]:invert(1)
      [&::-webkit-calendar-picker-indicator]:contrast(100%)
    "
  />

  {/* Buttons container - 25% */}
<div className="flex flex-[2.5] gap-1 min-w-0 shrink md:flex-[1] md:w-1/4">
  {/* Search Button */}
  <button
    onClick={() => applyFilters()}
    className="
      text-black font-semibold rounded flex flex-col items-center justify-center
      flex-1 min-w-0 shrink
      bg-transparent md:bg-[#ffe6c0] p-0 md:px-2 md:py-2 md:text-base
    "
  >
    <span className="md:inline-block">🔍</span>
    <span className="hidden md:block text-xs mt-1">Search</span>
    
  </button>

  {/* Export Button */}
  <button
    onClick={exportToExcel}
    className="
      bg-green-500 text-black font-semibold rounded flex flex-col items-center justify-center
      flex-1 min-w-0 shrink text-[10px] md:px-2 md:py-2 md:text-base
    "
  >
    <span className="md:inline-block">📤</span>
    <span className="hidden md:block text-xs mt-1">Export</span>
    
  </button>

  {/* Clear Button */}
  <button
    onClick={() => {
      setSearchText("");
      setFromDate("");
      setToDate("");
      setFilteredOrders(orders);
      window.history.replaceState({}, "", window.location.pathname);
    }}
    className="
      bg-red-600 text-black font-semibold rounded flex flex-col items-center justify-center
      flex-1 min-w-0 shrink text-[10px] md:px-2 md:py-2 md:text-base
    "
  >
    <span className="md:inline-block">❌</span>
    <span className="hidden md:block text-xs mt-1">Clear</span>
  
  </button>
</div>

</div>


      {Object.keys(groupedOrders).length === 0 && (
        <p className="text-center text-white/60">No orders found.</p>
      )}

      {/* ORDERS */}
      {Object.keys(groupedOrders).map((date) => {
        const dailyTotal = groupedOrders[date].reduce(
          (sum, o) => sum + o.totalAmount,
          0
        );

        return (
          <div key={date} className="mb-12">
            <div className="flex flex-wrap justify-between items-center mb-4 border-b border-white/20 pb-2">
              <h2 className="text-xl font-semibold">📅 {date}</h2>
              <div className="text-sm text-white/70">
                {groupedOrders[date].length} orders ·{" "}
                <span className="text-green-400 font-semibold">₹{dailyTotal}</span>
              </div>
            </div>

            <div className="space-y-6">
              {groupedOrders[date].map((order, index) => (
                <div
                  key={order._id}
                  className="bg-white/10 rounded-2xl p-5 hover:bg-white/15 transition"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-bold text-lg">
                        #{index + 1} · {order.customer.fullName}
                      </p>
                      <p className="text-sm text-white/70">📞 {order.customer.phone}</p>
                      <p className="text-sm text-white/70">📧 {order.customer.email}</p>
                      <p className="text-sm text-white/70 mt-1">
                        🚚 {order.customer.deliveryDate} · {order.customer.deliverySlot}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-green-400 font-bold text-xl">₹{order.totalAmount}</p>
                      <span className="inline-block mt-1 px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                        Paid
                      </span>
                      <p className="text-xs text-white/50 mt-1 break-all">{order.paymentId}</p>

                      <button
                        onClick={() => printInvoice(order)}
                        className="mt-2 bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded hover:bg-yellow-400 transition"
                      >
                        🖨️ Print Invoice
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-white/10 pt-3">
                    <p className="font-semibold mb-2 text-sm text-[#ffe6c0]">📦 Items Ordered</p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                      {order.items.map((item, i) => (
                        <li key={i} className="bg-black/30 rounded-lg px-3 py-2">
                          <span className="font-medium">{item.name}</span> · {item.weight}kg × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
