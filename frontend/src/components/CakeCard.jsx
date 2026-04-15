import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CakeCard = ({ cake, onHover }) => {
  const [weight, setWeight] = useState(1);
  const { addToCart, increaseQty, decreaseQty, cart } = useCart();

  const cartItem = cart.find(
    (i) => i.id === cake.id && i.weight === weight
  );

  const subtotal = cartItem
    ? cartItem.quantity * cake.pricePerKg * weight
    : cake.pricePerKg * weight;

  const handleAdd = () => {
    if (!cartItem) {
      addToCart({
        id: cake.id,
        name: cake.name,
        image: cake.image,
        pricePerKg: cake.pricePerKg,
        weight,
        quantity: 1,
      });
    }
  };

  return (
    <motion.div
      onMouseEnter={() => onHover('cakes')}
      onMouseLeave={() => onHover(null)}
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-full max-w-[200px] flex flex-col transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,230,192,0.3)] hover:border-[#ffe6c0]/40 hover:-translate-y-1"
    >
      <div className="w-full h-24 sm:h-32 rounded-xl mb-3 overflow-hidden ring-1 ring-white/10">
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-full object-cover scale-110"
        />
      </div>

      <h4 className="text-center font-semibold text-[#ffe6c0] text-sm sm:text-base mb-1">
        {cake.name}
      </h4>

      <p className="text-center text-white/80 text-xs sm:text-sm mb-2">
        ₹{cake.pricePerKg} / kg
      </p>

      {/* Responsive weight buttons */}
      <div className="mt-auto">
        <div className="grid grid-cols-2 gap-2">
          {[0.5, 1, 1.5, 2].map((w) => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={`
                px-2 py-1 rounded-full border text-xs sm:text-sm transition-all
                ${weight === w ? "bg-[#ffe6c0] text-black border-[#ffe6c0]" : "border-white/40 text-white hover:bg-white/10"}
                text-center
              `}
            >
              {w}kg
            </button>
          ))}
        </div>

        <p className="text-center mt-2 font-semibold text-white text-sm sm:text-base">
          ₹{subtotal}
        </p>

        {cartItem ? (
          <div className="flex justify-center items-center gap-2 mt-2">
            <button
              onClick={() => decreaseQty(cake.id, weight)}
              className="px-3 py-1 rounded-xl bg-white/20 font-bold text-sm sm:text-base hover:bg-white/30"
            >
              –
            </button>
            <span className="text-white font-bold text-sm sm:text-base">
              {cartItem.quantity}
            </span>
            <button
              onClick={() => increaseQty(cake.id, weight)}
              className="px-3 py-1 rounded-xl bg-white/20 font-bold text-sm sm:text-base hover:bg-white/30"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="mt-2 w-full py-2 rounded-xl font-semibold bg-[#ffe6c0] text-black hover:scale-105 transition text-sm sm:text-base"
          >
            Add to Order
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CakeCard;
