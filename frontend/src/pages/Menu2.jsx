import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// import bgMain from "../assets/bg-main.png";
import s1 from "../assets/menu/s1.png";
import s2 from "../assets/menu/s2.png";
import s3 from "../assets/menu/s3.png";
import s4 from "../assets/menu/s4.png";

import fm1 from "../assets/menu/fm1.png";

export default function Menu2() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const beverageMenu = {
    classic: [
      { name: "Cold Coffee", price: 80 },
      { name: "Chocolate Shake", price: 80 },
    ],
    premium: [
      { name: "Brownie Shake", price: 120, tag: "Best Seller" },
      { name: "Oreo Shake", price: 120 },
      { name: "KitKat Shake", price: 120 },
    ],
    deluxe: [
      { name: "Nutella Shake", price: 150, tag: "Popular" },
      { name: "Hazelnut Shake", price: 150 },
    ],
    fruity: [
      { name: "Strawberry Shake", price: 100 },
      { name: "ButterScotch Shake", price: 100 },
      { name: "Blueberry Shake", price: 100 },
      { name: "Black-Currant Shake", price: 100 },
    ],
  };

  const FloatingImage = ({ src, className = "", delay = 0 }) => (
    <motion.img
      src={src}
      className={className}
      animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );

  const GlowOrb = ({ size = "w-20 h-20" }) => (
    <motion.div
      className={`absolute ${size} bg-[#ffbf6b]/25 blur-2xl rounded-full`}
      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3.5, repeat: Infinity }}
    />
  );

  const MenuItem = ({ item, index, last }) => (
    <div
      className={`flex justify-between items-center py-[5px] ${
        !last ? "border-b border-white/20" : ""
      } ${visible ? "animate-fade-in" : "opacity-0"}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className="flex items-center gap-2 text-white/90 text-sm">
        {item.name}
        {item.tag && (
          <span className="text-[9px] bg-[#ffbf6b] text-black px-2 rounded">
            {item.tag}
          </span>
        )}
      </span>
      <span className="text-[#ffbf6b] font-semibold">₹{item.price}</span>
    </div>
  );

  const CategoryBlock = ({ title, items }) => (
    <div>
      <p className="text-[10px] text-[#ffbf6b]/70 uppercase mb-1">
        {title}
      </p>
      {items.map((item, i) => (
        <MenuItem
          key={i}
          item={item}
          index={i}
          last={i === items.length - 1}
        />
      ))}
    </div>
  );

  return (
    <div ref={sectionRef} className="relative w-full min-h-[600px] overflow-hidden">

      

      {/* ================= DESKTOP ================= */}
      <section className="hidden md:grid grid-cols-[1fr_340px] gap-6 w-full px-6 py-1 text-white relative z-10">

        {/* BEVERAGES */}
<div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl flex flex-col">

  {/* HEADER */}
  <div className="text-center py-4 border-b border-white/10">
    <h3 className="text-[#ffe6c0] text-3xl font-bold tracking-widest">
      BEVERAGES
    </h3>
  </div>

  {/* BODY */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 py-5">

  {/* LEFT COLUMN */}
  <div className="space-y-6 border-r border-white/10 pr-4">

    {/* CLASSIC */}
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      
      {/* TEXT */}
      <div className="flex-1">
        <p className="text-[13px] text-[#ffbf6b]/80 tracking-[0.25em] uppercase mb-2">
          Classic
        </p>

        {beverageMenu.classic.map((item, i) => (
          <div key={i} className="flex justify-between text-base text-white/90">
            <span>{item.name}</span>
            <span className="text-[#ffbf6b]">₹{item.price}</span>
          </div>
        ))}
      </div>

      {/* IMAGE (CENTERED + BIGGER) */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          <GlowOrb size="w-20 h-20 md:w-24 md:h-24" />
          <FloatingImage src={s1} className="w-full h-full object-contain" />
        </div>
      </div>
    </div>

    {/* PREMIUM */}
    <div className="flex items-center justify-between gap-4">
      
      <div className="flex-1">
        <p className="text-[13px] text-[#ffbf6b]/80 tracking-[0.25em] uppercase mb-2">
          Premium
        </p>

        {beverageMenu.premium.map((item, i) => (
          <div key={i} className="flex justify-between text-base text-white/90">
            <span className="flex items-center gap-2">
              {item.name}
              {item.tag && (
                <span className="text-[10px] bg-[#ffbf6b] text-black px-2 py-[2px] rounded">
                  {item.tag}
                </span>
              )}
            </span>
            <span className="text-[#ffbf6b]">₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center flex-shrink-0">
        <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          <GlowOrb size="w-20 h-20 md:w-24 md:h-24" />
          <FloatingImage src={s2} delay={0.3} className="w-full h-full object-contain" />
        </div>
      </div>
    </div>

  </div>

  {/* RIGHT COLUMN */}
  <div className="space-y-6 pl-4">

    {/* DELUXE */}
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      
      <div className="flex-1">
        <p className="text-[13px] text-[#ffbf6b]/80 tracking-[0.25em] uppercase mb-2">
          Deluxe
        </p>

        {beverageMenu.deluxe.map((item, i) => (
          <div key={i} className="flex justify-between text-base text-white/90">
            <span className="flex items-center gap-2">
              {item.name}
              {item.tag && (
                <span className="text-[10px] bg-[#ffbf6b] text-black px-2 py-[2px] rounded">
                  {item.tag}
                </span>
              )}
            </span>
            <span className="text-[#ffbf6b]">₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center flex-shrink-0">
        <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          <GlowOrb size="w-20 h-20 md:w-24 md:h-24" />
          <FloatingImage src={s3} delay={0.5} className="w-full h-full object-contain" />
        </div>
      </div>
    </div>

    {/* FRUITY */}
    <div className="flex items-center justify-between gap-4">
      
      <div className="flex-1">
        <p className="text-[13px] text-[#ffbf6b]/80 tracking-[0.25em] uppercase mb-2">
          Fruity
        </p>

        {beverageMenu.fruity.map((item, i) => (
          <div key={i} className="flex justify-between text-base text-white/90">
            <span>{item.name}</span>
            <span className="text-[#ffbf6b]">₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center flex-shrink-0">
        <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          <GlowOrb size="w-20 h-20 md:w-24 md:h-24" />
          <FloatingImage src={s4} delay={0.7} className="w-full h-full object-contain" />
        </div>
      </div>
    </div>

  </div>

</div>
</div>

        {/* FUDGY */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl flex flex-col items-center p-6">

          <h3 className="text-[#ffe6c0] text-2xl font-bold mb-4">
            FUDGY DELIGHTS
          </h3>

          <div className="relative flex-1 flex items-center justify-center">
            <GlowOrb size="w-40 h-40" />
            <FloatingImage src={fm1} className="w-48 h-48" />
          </div>

          <div className="w-full border-t border-white/10 pt-4 flex justify-between">
            <span>Brownie with Ice-Cream</span>
            <span className="text-[#ffbf6b] font-semibold">₹100</span>
          </div>

        </div>
      </section>

      {/* ================= MOBILE ================= */}
<section className="md:hidden px-2 pt-2 pb-10 text-white relative z-10 space-y-5">

  {/* BEVERAGES */}
  <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">

    <h3 className="text-center text-[#ffe6c0] text-xl mb-4">
      BEVERAGES
    </h3>

    {/* CLASSIC (RIGHT - s1) */}
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1">
        <CategoryBlock title="CLASSIC" items={beverageMenu.classic} />
      </div>

      <div className="relative w-20 h-20 flex-shrink-0">
        <GlowOrb size="w-16 h-16" />
        <FloatingImage src={s1} className="w-20 h-20 object-contain" />
      </div>
    </div>

    {/* PREMIUM (LEFT - s2) */}
    <div className="flex items-center gap-3 mb-4">

      <div className="relative w-20 h-20 flex-shrink-0">
        <GlowOrb size="w-16 h-16" />
        <FloatingImage src={s2} delay={0.3} className="w-20 h-20 object-contain" />
      </div>

      <div className="flex-1">
        <CategoryBlock title="PREMIUM" items={beverageMenu.premium} />
      </div>
    </div>

    {/* DELUXE (RIGHT - s3) */}
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1">
        <CategoryBlock title="DELUXE" items={beverageMenu.deluxe} />
      </div>

      <div className="relative w-20 h-20 flex-shrink-0">
        <GlowOrb size="w-16 h-16" />
        <FloatingImage src={s3} delay={0.5} className="w-20 h-20 object-contain" />
      </div>
    </div>

    {/* FRUITY (LEFT - s4) */}
    <div className="flex items-center gap-3">

      <div className="relative w-20 h-20 flex-shrink-0">
        <GlowOrb size="w-16 h-16" />
        <FloatingImage src={s4} delay={0.7} className="w-20 h-20 object-contain" />
      </div>

      <div className="flex-1">
        <CategoryBlock title="FRUITY" items={beverageMenu.fruity} />
      </div>
    </div>

  </div>

  {/* FUDGY */}
  <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">

    <h3 className="text-[#ffe6c0] text-xl mb-4">
      FUDGY DELIGHTS
    </h3>

    <div className="relative flex justify-center">
      <GlowOrb size="w-32 h-32" />
      <FloatingImage src={fm1} className="w-36 h-36 object-contain" />
    </div>

    <div className="mt-3 flex justify-between border-t border-white/10 pt-3">
      <span>Brownie with Ice-Cream</span>
      <span className="text-[#ffbf6b] font-semibold">₹100</span>
    </div>

  </div>
</section>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}