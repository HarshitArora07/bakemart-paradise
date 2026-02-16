import React, { useState, useEffect, useRef } from "react";
import bgMain from "../assets/bg-main.png";

// BEVERAGE & FUDGY IMAGES
import s1 from "../assets/menu/s1.png";
import s2 from "../assets/menu/s2.png";
import fm1 from "../assets/menu/fm1.png";

export default function Menu2() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const beverageMenu = [
    { name: "Cold Coffee", price: 80 },
    { name: "Chocolate Shake", price: 80 },
    { name: "Brownie Shake", price: 120 },
    { name: "Oreo Shake", price: 120 },
    { name: "KitKat Shake", price: 120 },
    { name: "Nutella Shake", price: 150 },
    { name: "Hazelnut Shake", price: 150 },
    { name: "Strawberry Shake", price: 100 },
    { name: "ButterScotch Shake", price: 100 },
    { name: "Blueberry Shake", price: 100 },
    { name: "Black-Currant Shake", price: 100 },
  ];

  const fudgyMenu = [{ name: "Brownie with Ice-Cream", price: 100 }];

  const MenuItems = ({ items }) => (
  <div className="flex-1 min-w-0">
    {items.map((item, i) => (
      <div
        key={i}
        className={`flex justify-between items-center py-[2px] text-[14px] sm:text-lg ${
          i !== items.length - 1 ? "border-b border-white/40" : ""
        } ${visible ? "animate-fade-in" : "opacity-0"}`}
        style={{ animationDelay: `${i * 80}ms` }}
      >
        {/* ITEM NAME */}
        <span className="flex-1 pr-2 truncate md:whitespace-normal">
  {item.name}
</span>


        {/* PRICE */}
        <span className="flex-shrink-0 w-16 sm:w-20 text-right">

          ₹{item.price}/-
        </span>
      </div>
    ))}
  </div>
);


  return (
    <div className="relative overflow-hidden" ref={sectionRef}>
      
      {/* BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-70 -z-10"
        style={{ backgroundImage: `url(${bgMain})` }}
      />

      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <section className="hidden md:flex min-h-screen justify-center items-start px-6 text-white pt-20 pb-20">

        <div className="flex gap-10 items-stretch w-full max-w-6xl">

          {/* BEVERAGES */}
          <div className="flex-1">
            <div className="w-full h-full bg-white/5 backdrop-blur-sm border  border-white/20 rounded-xl px-4 py-1 transition-all duration-300 ease-out hover:-translate-y-[10px] hover:ring-1 hover:ring-[#ffbf6b]/90 hover:shadow-[0_0_20px_rgba(255,191,107,0.55),_0_0_40px_rgba(255,191,107,0.65)]">
              <div className="flex flex-col gap-4 items-center -mt-18 ">
                <h3 className="text-[#ffe6c0] font-['Poppins'] text-4xl font-bold p-3 -mb-5">
                  BEVERAGES
                </h3>

                <div className={`flex gap-4 items-center ${visible ? "animate-fade-in" : "opacity-0"}`}>
                  <MenuItems items={beverageMenu.slice(0, 6)} />
                  <img
                    src={s1}
                    className={`w-52 h-52 object-contain ${
                      visible ? "animate-slide-in-right" : "opacity-0"
                    }`}
                  />
                </div>

                <div className={`flex gap-4 items-center -mt-2 ${visible ? "animate-fade-in" : "opacity-0"}`}>
                  <img
                    src={s2}
                    className={`w-52 h-52 object-contain ${
                      visible ? "animate-slide-in-left" : "opacity-0"
                    }`}
                  />
                  <MenuItems items={beverageMenu.slice(6)} />
                </div>
              </div>
            </div>
          </div>

          {/* FUDGY */}
          <div className="flex-1">
            <div className="w-full h-full bg-white/5 backdrop-blur-sm border  border-white/20 rounded-xl px-4 py-2 transition-all duration-300 ease-out hover:-translate-y-[10px] hover:ring-1 hover:ring-[#ffbf6b]/90 hover:shadow-[0_0_20px_rgba(255,191,107,0.55),_0_0_40px_rgba(255,191,107,0.65)]">
              <div className="flex flex-col gap-2 items-center -mt-18">
                <h3 className="text-[#ffe6c0] font-['Poppins'] text-4xl font-bold p-3 -mb-5">
                  FUDGY DELIGHTS
                </h3>

                <div className="mt-4">
                <MenuItems items={fudgyMenu} />
</div>
                <img
                  src={fm1}
                  className={`w-80 h-80 object-contain ${
                    visible ? "animate-zoom-in" : "opacity-0"
                  }`}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= MOBILE ================= */}
<section className="md:hidden w-full px-4 pt-16 pb-10 text-white flex flex-col gap-6">

  {/* BEVERAGES CARD */}
  <div className="
  w-full
  bg-white/5 backdrop-blur-sm
  border border-white/20
  rounded-xl
  px-4 py-5
  transition-all duration-300 ease-out
  hover:-translate-y-[6px]
  hover:ring-1 hover:ring-[#ffbf6b]/90
  hover:shadow-[0_0_20px_rgba(255,191,107,0.55),_0_0_40px_rgba(255,191,107,0.65)]
">


    <div className="flex flex-col items-center gap-5 -mt-3">
      <h3 className="text-[#ffe6c0] font-['Poppins'] text-2xl font-bold">
        BEVERAGES
      </h3>

      {/* FIRST ROW */}
      <div className="flex w-full items-center gap-3 -mt-4">
        <div className="flex-1 min-w-0">
          <MenuItems items={beverageMenu.slice(0, 6)} />
        </div>

        <img
          src={s1}
          className={`w-24 h-24 object-contain flex-shrink-0 ${
            visible ? "animate-slide-in-right" : "opacity-0"
          }`}
        />
      </div>

      {/* SECOND ROW */}
      <div className="flex w-full items-center gap-0 -ml-8 -mt-2 -mb-2">
        <img
          src={s2}
          className={`w-28 h-28 object-contain flex-shrink-0 ${
            visible ? "animate-slide-in-left" : "opacity-0"
          }`}
        />

        <div className="flex-1 min-w-0">
          <MenuItems items={beverageMenu.slice(6)} />
        </div>
      </div>
    </div>
  </div>

  {/* FUDGY CARD */}
  <div className="
  w-full
  bg-white/5 backdrop-blur-sm
  border border-white/20
  rounded-xl
  px-4 py-3 -mt-2
  transition-all duration-300 ease-out
  hover:-translate-y-[6px]
  hover:ring-1 hover:ring-[#ffbf6b]/90
  hover:shadow-[0_0_20px_rgba(255,191,107,0.55),_0_0_40px_rgba(255,191,107,0.65)]
">


    <div className="flex flex-col items-center text-center gap-3">
      <h3 className="text-[#ffe6c0] font-['Poppins'] text-2xl font-bold">
        FUDGY DELIGHTS
      </h3>

      <div className="w-full flex justify-center">
  <div className="w-full max-w-xs">
    {fudgyMenu.map((item, i) => (
      <div
        key={i}
        className={`flex justify-center items-center py-[2px] text-[14px] ${
          visible ? "animate-fade-in" : "opacity-0"
        }`}
        style={{ animationDelay: `${i * 80}ms` }}
      >
        <span className="text-center">
          {item.name} &nbsp; ₹{item.price}/-
        </span>
      </div>
    ))}
  </div>
</div>


      <img
        src={fm1}
        className={`w-32 h-32 object-contain ${
          visible ? "animate-zoom-in" : "opacity-0"
        }`}
      />
    </div>
  </div>

</section>


      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes slide-in-right {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes slide-in-left {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes zoom-in {
            0% { opacity: 0; transform: scale(0.5); }
            100% { opacity: 1; transform: scale(1); }
          }

          .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
          .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
          .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
          .animate-zoom-in { animation: zoom-in 0.8s ease-out forwards; }
        `}
      </style>
    </div>
  );
}
