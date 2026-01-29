// ... your existing imports
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    cakeMessage: "",
    deliveryDate: "",
    deliverySlot: "",
  });

  const [dateFocused, setDateFocused] = useState(false);
  const [dateError, setDateError] = useState("");
  const [shakeDate, setShakeDate] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getSubtotal = (item) =>
    item.pricePerKg * item.weight * item.quantity;

  const total = cart.reduce((sum, i) => sum + getSubtotal(i), 0);

  const isValidDate = (v) => {
    if (!/^\d{2}-\d{2}-\d{4}$/.test(v)) return false;
    const [d, m, y] = v.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    if (
      date.getDate() !== d ||
      date.getMonth() !== m - 1 ||
      date.getFullYear() !== y
    )
      return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isDateValid = isValidDate(formData.deliveryDate);

  const areRequiredFieldsFilled =
    formData.fullName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.deliveryDate.trim() !== "" &&
    formData.deliverySlot.trim() !== "";

  const goBackToCart = () => navigate("/cart");

  // ----------------- UPDATED HANDLEPLACEORDER -----------------
  const handlePlaceOrder = async () => {
  if (!isDateValid || !areRequiredFieldsFilled) {
    setDateError(!isDateValid ? "Please select a valid delivery date" : "");
    setShakeDate(true);
    setTimeout(() => setShakeDate(false), 350);
    return;
  }

  try {
    // STEP 1: create fake order
    const res = await fetch(
      "https://bakemart-backend.onrender.com/api/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100 }),
      }
    );

    const data = await res.json();

    // STEP 2: simulate payment success
    const fakePaymentId = "pay_" + Date.now();

    // STEP 3: save order
    await fetch(
      "https://bakemart-backend.onrender.com/api/save-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          totalAmount: total,
          customer: formData,
          paid: true,
          paymentId: fakePaymentId,
        }),
      }
    );

    clearCart();
    alert("✅ Order placed successfully!");
    navigate("/");

  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again.");
  }
};

  // ------------------------------------------------------------

  return (
    <div
      className="
        min-h-screen pt-20 md:pt-24 lg:pt-20
        lg:-mt-8 px-4 sm:px-6
        bg-black/50 text-white
        relative z-0 lg:z-auto
      "
    >
      <h1 className="text-3xl font-bold mb-4 text-center">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-white/70 text-center">Your cart is empty.</p>
      ) : (
        <div className="max-w-6xl mx-auto">
          <button
            onClick={goBackToCart}
            className="
              mb-4 inline-flex items-center
              text-sm text-white/70 hover:text-white
              underline hover:bg-white/10
              px-2 py-1 rounded
              sticky top-4 z-10 md:static
              backdrop-blur-sm
            "
          >
            ← Back to Cart
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Details */}
            <div className="lg:col-span-2 bg-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#ffe6c0] mb-4">
                Customer Details
              </h2>

              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="p-2 rounded bg-white/20 text-white placeholder-white/70"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-2 rounded bg-white/20 text-white placeholder-white/70"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 rounded bg-white/20 text-white placeholder-white/70"
                />

                <textarea
                  name="cakeMessage"
                  placeholder="Write on Cake (optional)"
                  value={formData.cakeMessage}
                  onChange={handleChange}
                  className="p-2 rounded bg-white/20 text-white placeholder-white/70 resize-none"
                />

                {/* DATE INPUT */}
                <div className={`relative ${shakeDate ? "animate-shake" : ""}`}>
                  <input
                    type="text"
                    placeholder="DD-MM-YYYY"
                    inputMode="numeric"
                    value={formData.deliveryDate}
                    onFocus={() => setDateFocused(true)}
                    onBlur={() => setDateFocused(false)}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "").slice(0, 8);
                      if (v.length > 4)
                        v = v.slice(0, 2) + "-" + v.slice(2, 4) + "-" + v.slice(4);
                      else if (v.length > 2)
                        v = v.slice(0, 2) + "-" + v.slice(2);
                      setFormData((p) => ({ ...p, deliveryDate: v }));
                      if (v.length === 10 && !isValidDate(v)) {
                        setDateError("Please select a valid delivery date");
                        setShakeDate(true);
                        setTimeout(() => setShakeDate(false), 350);
                      } else setDateError("");
                    }}
                    className={`w-full p-2 pr-12 rounded bg-white/20 text-white placeholder-white/60 text-base sm:text-sm touch-manipulation transition ${
                      dateError ? "ring-2 ring-red-400" : "focus:ring-2 focus:ring-[#ffe6c0]/40"
                    }`}
                  />

                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-6 sm:h-6 bg-transparent cursor-pointer [color-scheme:dark] appearance-none [&::-webkit-datetime-edit]:hidden transition ${
                      dateFocused ? "scale-110 drop-shadow-[0_0_6px_#ffe6c0]" : ""
                    }`}
                    onChange={(e) => {
                      const [y, m, d] = e.target.value.split("-");
                      const formatted = `${d}-${m}-${y}`;
                      setFormData((p) => ({ ...p, deliveryDate: formatted }));
                      setDateError("");
                    }}
                  />

                  {dateError && (
                    <p className="mt-1 text-sm sm:text-xs text-red-400">
                      Please select a valid delivery date
                    </p>
                  )}
                </div>

                {/* Delivery Slot */}
                <select
                  name="deliverySlot"
                  value={formData.deliverySlot}
                  onChange={handleChange}
                  className="p-2 rounded bg-white/20 text-white"
                >
                  <option value="">Select Delivery Slot</option>
                  <option className="text-black">12 AM - 2 PM</option>
                  <option className="text-black">2 PM - 4 PM</option>
                  <option className="text-black">4 PM - 6 PM</option>
                  <option className="text-black">6 PM - 8 PM</option>
                  <option className="text-black">8 PM - 10 PM</option>
                </select>
              </div>

              <p className="text-sm text-white/70 mt-4">
                Once paid can’t be edited.
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-white/10 rounded-2xl p-6 flex flex-col gap-6">
              <h2 className="text-xl font-bold text-[#ffe6c0]">Order Summary</h2>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {cart.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-white/10 p-2 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-white/70">
                          {item.weight} kg × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">₹{getSubtotal(item)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!isDateValid || !areRequiredFieldsFilled}
                className={`w-full py-3 rounded-xl font-bold transition ${
                  isDateValid && areRequiredFieldsFilled
                    ? "bg-green-500 text-white hover:scale-105"
                    : "bg-green-500/40 text-white/50 cursor-not-allowed"
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
