import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, clearCart } = useCart();
  const navigate = useNavigate();

  const getSubtotal = (item) =>
    item.pricePerKg * item.weight * item.quantity;

  const total = cart.reduce((sum, i) => sum + getSubtotal(i), 0);

  const handlePlaceOrder = () => {
    const message = cart
      .map(
        (i) =>
          `${i.name} (${i.weight}kg) × ${i.quantity} = ₹${getSubtotal(i)}`
      )
      .join("%0A");

    window.open(
      `https://wa.me/919548484695?text=Order Details:%0A${message}%0A%0ATotal: ₹${total}`,
      "_blank"
    );

    clearCart();
  };

  const goBackToMenu = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("menu3");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <div
      className="
        min-h-screen
        pt-20 sm:pt-24 md:pt-24 lg:pt-20
        lg:-mt-8
        px-4 sm:px-6
        bg-black/50 text-white
      "
    >
      <h1 className="text-3xl font-bold mb-4 text-center">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-white/70 text-center">
          Your cart is empty.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* BACK TO MENU */}
          <button
            onClick={goBackToMenu}
            className="
              mb-4
              inline-flex items-center
              text-sm text-white/70 hover:text-white
              underline
              hover:bg-white/10
              px-2 py-1 rounded
              sticky top-4 z-10 md:static
              backdrop-blur-sm
            "
          >
            ← Back to Menu
          </button>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: CART TABLE */}
            <div className="lg:col-span-2 bg-white/10 rounded-2xl p-4 sm:p-6 overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-white/20 text-white/70 text-sm sm:text-base">
                    <th className="pb-3 text-left w-[42%]">
                      Product
                    </th>
                    <th className="pb-3 text-center w-[15%] hidden md:table-cell">
                      Weight
                    </th>
                    <th className="pb-3 text-center w-[16%]">
                      Price
                    </th>
                    <th className="pb-3 text-center w-[18%]">
                      Quantity
                    </th>
                    <th className="pb-3 text-right w-[24%]">
                      Subtotal
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/10 text-sm sm:text-base"
                    >
                      {/* PRODUCT */}
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="leading-tight">
                            <div className="font-semibold break-words">
                              {item.name}
                            </div>
                            <div className="text-xs text-white/60 md:hidden">
                              ({item.weight} kg)
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* DESKTOP WEIGHT */}
                      <td className="py-4 text-center hidden md:table-cell whitespace-nowrap">
                        {item.weight} kg
                      </td>

                      {/* PRICE */}
                      <td className="py-4 text-center whitespace-nowrap text-sm sm:text-base">
                        ₹{item.pricePerKg}
                      </td>

                      {/* QUANTITY */}
                      <td className="py-4">
                        <div className="flex justify-center items-center gap-1 sm:gap-2">
                          <button
                            onClick={() =>
                              decreaseQty(item.id, item.weight)
                            }
                            className="
                              w-7 h-7 sm:w-8 sm:h-8
                              text-sm sm:text-base
                              flex items-center justify-center
                              bg-white/20 rounded
                            "
                          >
                            –
                          </button>

                          <span className="min-w-[18px] sm:min-w-[24px] text-center text-sm sm:text-base">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQty(item.id, item.weight)
                            }
                            className="
                              w-7 h-7 sm:w-8 sm:h-8
                              text-sm sm:text-base
                              flex items-center justify-center
                              bg-white/20 rounded
                            "
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* SUBTOTAL */}
                      <td className="py-4 text-right font-semibold whitespace-nowrap text-sm sm:text-base">
                        ₹{getSubtotal(item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="bg-white/10 rounded-2xl p-6 flex flex-col gap-6">
              <h2 className="text-xl font-bold text-[#ffe6c0]">
                Order Summary
              </h2>

              <div className="flex justify-between">
                <span>Total Items</span>
                <span>
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-[#ffe6c0] text-black font-bold rounded-xl"
              >
                Place Order via WhatsApp
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-3 bg-green-500 text-white font-bold rounded-xl"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full py-3 bg-red-500 text-white font-bold rounded-xl"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
