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
      <div className="w-full h-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-6 sm:px-8 pt-4 pb-6 md:pt-6 md:pb-8 flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/[0.1] hover:border-[#ffe6c0]/40 hover:shadow-[0_0_40px_rgba(255,230,192,0.3)]">
        
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
            <div className="w-full max-w-[280px] mx-auto space-y-1 mb-6">
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

        {/* Mobile Layout - Horizontal Side-by-Side */}
        <div className="flex md:hidden flex-row items-center justify-between gap-4 py-2 h-full">
          {/* Layout Block 1 */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            {isFries ? (
              <div className="scale-75 origin-center">
                <SectionImages images={images} type={categoryType} />
              </div>
            ) : (
              <div className="text-left">
                <h3 className="font-royal text-xl font-bold text-[#ffe6c0] uppercase tracking-widest mb-2">
                  {title}
                </h3>
                <div className="space-y-1">
                  {items.map((item, idx) => (
                    <PriceItem key={idx} {...item} isLast={idx === items.length - 1} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Layout Block 2 */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            {isFries ? (
              <div className="text-right">
                <h3 className="font-royal text-xl font-bold text-[#ffe6c0] uppercase tracking-widest mb-2">
                  {title}
                </h3>
                <div className="space-y-1">
                  {items.map((item, idx) => (
                    <PriceItem key={idx} {...item} isLast={idx === items.length - 1} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="scale-75 origin-center">
                <SectionImages images={images} type={categoryType} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionImages = ({ images, type }) => {
  const isFries = type === "FRIES";
  const isPasta = type === "PASTA";
  const isBurger = type === "BURGERS";

  return (
    <div className={`relative flex gap-2 justify-center items-center ${isFries ? "items-start" : "items-end"} w-full h-full`}>
      {images.map((img, i) => {
        let styleClasses = "rounded-xl object-contain drop-shadow-2xl ";
        
        if (isBurger) {
          if (i === 0) styleClasses += "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 -rotate-[12deg]";
          else styleClasses += "w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 -ml-8 sm:-ml-12 mb-2 rotate-[5deg]";
        } else if (isFries) {
          styleClasses += (i === 0 ? "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 -rotate-[15deg]" : "w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 -ml-4 rotate-[15deg]");
        } else if (isPasta) {
          styleClasses += (i === 0 ? "w-32 h-24 sm:w-44 sm:h-32 md:w-48 md:h-40" : "w-28 h-20 sm:w-36 sm:h-28 md:w-40 md:h-32 -ml-6");
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
