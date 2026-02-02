import React, { useEffect, useRef, useState } from "react";
import bgMain from "../assets/bg-main.png";

// Slider Images
import c1 from "../assets/cakes/c1.png";
import c2 from "../assets/cakes/c2.png";
import c3 from "../assets/cakes/c3.png";
import c4 from "../assets/cakes/c4.png";
import c5 from "../assets/cakes/c5.png";
import c6 from "../assets/cakes/c6.png";
import c7 from "../assets/cakes/c7.png";
import c8 from "../assets/cakes/c8.png";

// Cake Images
import co1 from "../assets/cakes/co1.png";
import co2 from "../assets/cakes/co2.png";
import co3 from "../assets/cakes/co3.png";
import co4 from "../assets/cakes/co4.png";
import co5 from "../assets/cakes/co5.png";
import co6 from "../assets/cakes/co6.png";
import co7 from "../assets/cakes/co7.png";
import co8 from "../assets/cakes/co8.png";
import co9 from "../assets/cakes/co9.png";
import co10 from "../assets/cakes/co10.png";

import { useCart } from "../context/CartContext";

export default function Menu3() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { addToCart, increaseQty, decreaseQty, cart } = useCart();

  const cakes = [
    { id: 1, name: "Chocolate", pricePerKg: 720, image: co1 },
    { id: 2, name: "Black Forest", pricePerKg: 670, image: co2 },
    { id: 3, name: "Chocolate Truffle", pricePerKg: 800, image: co3 },
    { id: 4, name: "Blueberry", pricePerKg: 720, image: co4 },
    { id: 5, name: "Black Currant", pricePerKg: 670, image: co5 },
    { id: 6, name: "Butterscotch", pricePerKg: 670, image: co6 },
    { id: 7, name: "Strawberry", pricePerKg: 670, image: co7 },
    { id: 8, name: "Pineapple", pricePerKg: 600, image: co8 },
    { id: 9, name: "Mix Fruit", pricePerKg: 670, image: co9 },
    { id: 10, name: "Red Velvet", pricePerKg: 720, image: co10 },
  ];

  const sliderImages = [c1, c2, c3, c4, c5, c6, c7, c8];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const CakeCard = ({ cake }) => {
    const [weight, setWeight] = useState(1);

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
      <div className="bg-white/10 rounded-2xl p-3 sm:p-3 w-full max-w-[200px]">
        <div className="w-full h-24 sm:h-32 rounded-xl mb-2 overflow-hidden">
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full h-full object-cover scale-110"
          />
        </div>

        <h4 className="text-center font-semibold text-[#ffe6c0] text-sm sm:text-base">
          {cake.name}
        </h4>

        <p className="text-center text-white/80 text-xs sm:text-sm">
          ₹{cake.pricePerKg} / kg
        </p>

        {/* Responsive weight buttons */}
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[0.5, 1, 1.5, 2].map((w) => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={`
                px-2 py-1 rounded-full border text-xs sm:text-sm
                ${weight === w ? "bg-[#ffe6c0] text-black border-[#ffe6c0]" : "border-white/40 text-white"}
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
              className="px-3 py-1 rounded-xl bg-white/20 font-bold text-sm sm:text-base"
            >
              –
            </button>
            <span className="text-white font-bold text-sm sm:text-base">
              {cartItem.quantity}
            </span>
            <button
              onClick={() => increaseQty(cake.id, weight)}
              className="px-3 py-1 rounded-xl bg-white/20 font-bold text-sm sm:text-base"
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
    );
  };

  return (
    <div
  ref={sectionRef}
  className="relative overflow-hidden min-h-screen menu3-page"
>

      <div
        className="fixed inset-0 bg-cover bg-center opacity-70 -z-10"
                style={{ backgroundImage: `url(${bgMain})` }}
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <section
        className="
          min-h-screen
          pt-20 m:pt-24 md:pt-24 lg:pt-20
          lg:-mt-8
          px-4 sm:px-6
          bg-black/50 text-white
        "
      >
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#ffe6c0] mb-6">
  ‼️OUR EXPERTISE‼️
</h2>


        <div className="relative overflow-hidden mb-20">
          <div className="flex w-max animate-marquee">
            {[...sliderImages, ...sliderImages].map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="h-48 w-auto object-contain rounded-3xl shrink-0"
              />
            ))}
          </div>
        </div>

        <h3 className="text-center text-2xl font-bold mb-1 -mt-6">
          Choose Your Cake
        </h3>

        <p className="text-center text-white/60 text-sm mt-2 mb-4">
          Select weight & place your order ↓
        </p>

        {/* Responsive cake cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center pb-20">
          {cakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); } 
          to { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
}
