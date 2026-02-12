import React, { useEffect, useState, useRef } from "react";
import bgMain from "../assets/bg-main.png";
import b1 from "../assets/menu/b1.png";
import b2 from "../assets/menu/b2.png";
import f1 from "../assets/menu/f1.png";
import f2 from "../assets/menu/f2.png";
import p1 from "../assets/menu/p1.png";
import p2 from "../assets/menu/p2.png";

export default function Menu1() {
  const [visible1, setVisible1] = useState(false);
  const section1Ref = useRef(null);

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible1(true);
            observer1.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (section1Ref.current) observer1.observe(section1Ref.current);
    return () => observer1.disconnect();
  }, []);

  const burgerMenu = [
    { name: "Aloo Tikki", price: 50 },
    { name: "Cheese Delight", price: 70 },
    { name: "Punjabi Burger", price: 80 },
    { name: "Bakemart Special", price: 70 },
    { name: "Kurkure Burger", price: 100 },
    { name: "Paneer Crusted", price: 120 },
  ];

  const friesMenu = [
    { name: "Salted Fries", price: 80 },
    { name: "Peri-Peri Fries", price: 100 },
    { name: "Mayo Fries", price: 120 },
    { name: "Pizza Fries", price: 140 },
  ];

  const pastaMenu = [
    { name: "White Sauce Pasta", price: 170 },
    { name: "Red Sauce Pasta", price: 170 },
    { name: "Spicy Pasta", price: 180 },
    { name: "Mix Sauce Pasta", price: 200 },
  ];

  const MenuItems = ({ items }) => (
    <div className={`w-full max-w-[280px] sm:max-w-xs opacity-0 ${visible1 ? "animate-fade-in" : ""}`}>
      {items.map((item, i) => (
        <div key={i} className={`flex justify-between py-[2px] sm:py-1 text-[12px] sm:text-lg ${i !== items.length - 1 ? "border-b border-white/40" : ""}`}>
          <span>{item.name}</span>
          <span>₹{item.price}/-</span>
        </div>
      ))}
    </div>
  );

  const SectionImages = ({ images, burgerCustom, friesCustom, pastaCustom }) => (
  <div
    className={`
      relative flex gap-0 sm:gap-4
      justify-center
      items-center            /* ✅ proper vertical alignment on mobile */
      
      /* Desktop keeps original behavior */
      ${burgerCustom ? "md:items-end" : ""}
      ${friesCustom ? "md:items-start" : ""}
      ${pastaCustom ? "md:mt-4 md:items-end" : ""}
    `}
  >
    {images.map((img, i) => {
      const anim =
        visible1 && i === 0
          ? "animate-slide-in-left"
          : visible1
          ? "animate-slide-in-right"
          : "opacity-0";

      /* ================= BURGER ================= */
      if (burgerCustom && i === 0)
        return (
          <div key={i} className={anim}>
            <img
              src={img}
              className="
                relative w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44
                lg:-top-8
                rounded-lg
                -rotate-[15deg]
              "
            />
          </div>
        );

      if (burgerCustom && i === 1)
        return (
          <div key={i} className={`${anim} -ml-5 sm:-ml-10`}>
            <img
              src={img}
              className="
                relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36
                lg:-top-6
                rounded-lg
              "
            />
          </div>
        );

      /* ================= FRIES ================= */
      if (friesCustom)
        return (
          <div key={i} className={anim}>
            <img
              src={img}
              className={`
                ${
                  i === 0
                    ? "w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44"
                    : "w-28 h-28 sm:w-40 sm:h-40 md:w-40 md:h-44 md:-ml-4"
                }
                rounded-lg
                ${i === 0 ? "-rotate-[15deg]" : "rotate-[15deg]"}
              `}
            />
          </div>
        );

      /* ================= PASTA ================= */
      if (pastaCustom)
        return (
          <div
            key={i}
            className={`relative ${anim} ${
              i === 0 ? "-mt-6 md:mt-0" : "-mt-3 md:mt-0"
            }`}
          >
            <img
              src={img}
              className={`
                ${i === 0 ? "w-36 h-32" : "w-32 h-28"}
                sm:w-40 sm:h-40 md:w-44 md:h-44
                rounded-lg
              `}
            />
          </div>
        );

      return null;
    })}
  </div>
);



  return (
    <div className="relative overflow-hidden">
      <div className="fixed inset-0 bg-cover bg-center opacity-70 -z-10" style={{ backgroundImage: `url(${bgMain})` }} />
      <section ref={section1Ref} className="min-h-screen flex flex-col justify-start md:justify-center px-4 sm:px-6 pt-10 sm:pt-16 text-white">
        <div className="absolute top-16 sm:top-20 md:top-12 left-1/2 -translate-x-1/2">
          <h1 className="font-['Cinzel'] text-xl sm:text-3xl md:text-5xl font-bold animate-fade-in whitespace-nowrap text-[#edcb97]">What We Serve ! ! !</h1>
        </div>

        <div
  className="
    flex flex-col md:flex-row gap-3
    justify-center items-stretch
    mt-16 sm:mt-20 md:mt-0
    md:h-[85vh]
  "
>



          {["BURGERS","FRIES","PASTA"].map((_,i)=>null)}
          

          <div className="flex-1 flex flex-col items-center md:mt-12 min-h-0">
  <div className="w-full h-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl px-2 sm:px-4 py-2 sm:py-4 md:h-[78vh] md:max-h-[78vh] md:overflow-hidden transition-all duration-300 ease-out hover:-translate-y-[10px] hover:ring-1 hover:ring-[#ffbf6b]/90 hover:shadow-[0_0_20px_rgba(255,191,107,0.55),_0_0_40px_rgba(255,191,107,0.65)]">

    {/* ===== DESKTOP (ORIGINAL — DO NOT TOUCH) ===== */}
    <div className="hidden md:flex flex-col md:items-center md:text-center md:-translate-y-10">
      <h3 className="font-['Poppins'] text-4xl font-bold mb-4 mt-8 text-[#ffe6c0]">
        BURGERS
      </h3>
      <div className="flex flex-col items-center gap-3">
        <MenuItems items={burgerMenu} />
        <SectionImages images={[b1, b2]} burgerCustom />
      </div>
    </div>

    {/* ===== MOBILE ===== */}
    <div className="flex md:hidden flex-col items-center justify-center h-full">
      <h3 className="font-['Poppins'] text-lg font-bold mb-3 text-[#ffe6c0]">
        BURGERS
      </h3>
      <div className="flex gap-3">
        <MenuItems items={burgerMenu} />
        <SectionImages images={[b1, b2]} burgerCustom />
      </div>
    </div>

  </div>
</div>




          {/* ================= FRIES ================= */}
<div className="flex-1 flex flex-col items-center md:mt-12 min-h-0">
  <div
    className="
      w-full h-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl
      px-2 sm:px-4 py-2 sm:py-4 flex flex-col
      md:items-center md:text-center md:pb-8
      transition-all duration-300 ease-out
      hover:-translate-y-[10px]
      hover:ring-1 hover:ring-[#ffbf6b]/90
      hover:shadow-[0_0_20px_rgba(255,191,107,0.55),_0_0_40px_rgba(255,191,107,0.65)]
      flex-1
    "
  >
    {/* ===== MOBILE (UNCHANGED) ===== */}
    <div className="flex flex-col md:hidden w-full mt-1 gap-1">
      <h3 className="font-['Poppins'] text-lg font-bold text-center text-[#ffe6c0]">
        FRIES
      </h3>

      <div className="flex gap-2">
        <SectionImages images={[f1, f2]} friesCustom />
        <MenuItems items={friesMenu} />
      </div>
    </div>

    {/* ===== DESKTOP (UNCHANGED) ===== */}
    <div className="hidden md:flex flex-col items-center gap-3 flex-1">
      <SectionImages images={[f1, f2]} friesCustom />

      <h3 className="font-['Poppins'] text-4xl font-bold text-center text-[#ffe6c0]">
        FRIES
      </h3>

      <MenuItems items={friesMenu} />
    </div>
  </div>
</div>


          
          
          <div className="flex-1 flex flex-col items-center md:mt-12 min-h-0">
  <div className="w-full h-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl px-2 sm:px-4 py-2 sm:py-4 md:h-[78vh] md:max-h-[78vh] md:overflow-hidden transition-all duration-300 ease-out hover:-translate-y-[10px] hover:ring-1 hover:ring-[#ffbf6b]/90 hover:shadow-[0_0_20px_rgba(255,191,107,.5),_0_0_40px_rgba(255,191,107,.65)]">

    {/* ===== DESKTOP (ORIGINAL — DO NOT TOUCH) ===== */}
    <div className="hidden md:flex flex-col md:items-center md:text-center md:-translate-y-10">
      <h3 className="font-['Poppins'] text-4xl font-bold mb-4 mt-8 text-[#ffe6c0]">
        PASTA
      </h3>
      <div className="flex flex-col items-center gap-2">
        <MenuItems items={pastaMenu} />
        <SectionImages images={[p1, p2]} pastaCustom />
      </div>
    </div>

    {/* ===== MOBILE ===== */}
    <div className="flex md:hidden flex-col items-center justify-center h-full">
      <h3 className="font-['Poppins'] text-lg font-bold mb-3 text-[#ffe6c0]">
        PASTA
      </h3>
      <div className="flex gap-2">
        <MenuItems items={pastaMenu} />
        <SectionImages images={[p1, p2]} pastaCustom />
      </div>
    </div>

  </div>
</div>



        </div>
      </section>
    </div>
  );
}
