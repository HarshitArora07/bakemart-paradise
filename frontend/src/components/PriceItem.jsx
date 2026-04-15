import React from 'react';

const PriceItem = ({ name, price, isLast }) => {
  return (
    <div className={`flex justify-between items-center py-[1px] sm:py-0.5 text-[11px] sm:text-lg gap-2 ${!isLast ? "border-b border-white/40" : ""}`}>
      <span className="text-white/90 truncate sm:whitespace-normal sm:overflow-visible flex-1 min-w-0">{name}</span>
      <span className="text-white font-medium italic shrink-0">₹{price}/-</span>
    </div>
  );
};

export default PriceItem;
