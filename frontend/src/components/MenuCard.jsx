import React from 'react';
import { motion } from 'framer-motion';
import PriceItem from './PriceItem';

const MenuCard = ({ title, items, images, categoryType }) => {
  // Original logic for image positions
  const isFries = categoryType === "FRIES";
  const isPasta = categoryType === "PASTA";
  const isBurger = categoryType === "BURGERS";

  return (
    <div className="flex-1 flex flex-col items-center min-h-0 w-full group">
      <div className="w-full h-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-5 sm:px-8 pt-2 pb-3 md:pt-6 md:pb-8 flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/[0.1] hover:border-[#ffe6c0]/40 hover:shadow-[0_0_40px_rgba(255,230,192,0.3)]">

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col items-center justify-start text-center h-full gap-2">
          {/* If Fries, Images at the Top */}
          {isFries && (
            <div className="flex-1 flex items-center justify-center w-full min-h-0 pt-2 pb-6">
              <SectionImages images={images} type={categoryType} />
            </div>
          )}

          <div className="w-full">
            <h3 className="font-royal text-2xl sm:text-3xl font-bold mb-4 text-[#ffe6c0] uppercase tracking-widest">
              {title}
            </h3>

            {/* Menu Items */}
            <div className="w-full max-w-[280px] text-justify mx-auto space-y-1 mb-6">
              {items.map((item, idx) => (
                <PriceItem key={idx} {...item} isLast={idx === items.length - 1} />
              ))}
            </div>
          </div>

          {/* If not Fries, Images at the Bottom */}
          {!isFries && (
            <div className="flex-1 flex items-center justify-center w-full min-h-0 py-2">
              <SectionImages images={images} type={categoryType} />
            </div>
          )}
        </div>

        {/* Mobile Layout */}
<div className="flex md:hidden flex-col items-center justify-center w-full h-full flex-1 py-2">

  {/* Centered Content Group */}
  <div className="flex flex-col items-center justify-center gap-6 w-full">

    {/* Title */}
    <h3 className="font-royal text-xl sm:text-xl font-bold text-[#ffe6c0] uppercase tracking-widest leading-tight text-center">
      {title}
    </h3>

    {/* Items + Images */}
    <div className="flex flex-row w-full gap-2 items-center justify-center">

      {isFries ? (
        <>
          {/* Images LEFT */}
          <div className="flex-[0.8] flex flex-col items-center justify-center">
            <SectionImages images={images} type={categoryType} />
          </div>

          {/* Menu Items RIGHT */}
          <div className="flex-[0.9] max-w-[220px] space-y-1 text-left">
            {items.map((item, idx) => (
              <PriceItem key={idx} {...item} isLast={idx === items.length - 1} />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Menu Items LEFT */}
          <div className="flex-[0.9] max-w-[220px] space-y-1 text-left">
            {items.map((item, idx) => (
              <PriceItem key={idx} {...item} isLast={idx === items.length - 1} />
            ))}
          </div>

          {/* Images RIGHT */}
          <div className="flex-[0.8] flex flex-col items-center justify-center">
            <SectionImages images={images} type={categoryType} />
          </div>
        </>
      )}

    </div>
  </div>
</div>
      </div>
    </div>
  );
};

const SectionImages = ({ images, type, className = "" }) => {
  const isFries = type === "FRIES";
  const isPasta = type === "PASTA";
  const isBurger = type === "BURGERS";

  return (
    <div className={`${className} relative flex gap-1 sm:gap-2 justify-center items-center ${isFries ? "items-start" : "items-end"} w-full h-full`}>
      {images.map((img, i) => {
        let styleClasses = "rounded-xl object-contain drop-shadow-2xl transition-all duration-300 ";

if (isBurger) {
  if (i === 0)
    styleClasses += "w-[clamp(90px,28vw,140px)] h-auto -rotate-[12deg]";
  else
    styleClasses += "w-[clamp(110px,32vw,160px)] h-auto -ml-6 sm:-ml-10 rotate-[5deg]";
} 
else if (isFries) {
  if (i === 0)
    styleClasses += "w-[clamp(90px,26vw,130px)] h-auto -rotate-[15deg]";
  else
    styleClasses += "w-[clamp(80px,24vw,120px)] h-auto -ml-3 rotate-[15deg]";
} 
else if (isPasta) {
  if (i === 0)
    styleClasses += "w-[clamp(120px,34vw,180px)] h-auto";
  else
    styleClasses += "w-[clamp(100px,30vw,150px)] h-auto -ml-4";
}

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative z-10"
          >
            <img src={img} alt="Menu Item" className={styleClasses} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default MenuCard;