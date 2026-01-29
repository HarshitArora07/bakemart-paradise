import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function CartButton() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide if cart is empty OR user is already on cart page
  if (cart.length === 0 || location.pathname === "/cart" || location.pathname === "/checkout") return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="
        fixed bottom-6 right-6
        bg-[#ffe6c0] text-black font-bold
        py-3 px-6 rounded-full
        shadow-lg
        hover:scale-105 transition
        z-50
      "
    >
      View Cart ({cart.length})
    </button>
  );
}
