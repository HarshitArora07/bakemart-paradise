import React from 'react';

const PriceItem = ({ name, price, isLast }) => {
  return (
    <div className={`flex justify-between py-[1px] sm:py-0.5 text-[12px] sm:text-lg ${!isLast ? "border-b border-white/40" : ""}`}>
      <span className="text-white/90">{name}</span>
      <span className="text-white font-medium italic">₹{price}/-</span>
    </div>
  );
};

export default PriceItem;
