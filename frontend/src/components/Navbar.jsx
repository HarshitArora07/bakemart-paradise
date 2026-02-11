import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollTo = (id) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-16 py-6 flex justify-end items-center text-white">
      <div className="flex gap-4 md:gap-8 text-sm md:text-base items-center">
        <button onClick={() => scrollTo("home")} className="hover:underline">
          Home
        </button>

        <button onClick={() => scrollTo("about")} className="hover:underline">
          About
        </button>

        <button onClick={() => scrollTo("menu1")} className="hover:underline">
          Menu
        </button>

        <button onClick={() => scrollTo("contact")} className="hover:underline">
          Contact
        </button>

        {/* CART BUTTON */}
        <button
          onClick={() => navigate("/cart")}
          className="relative hover:underline"
        >
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
