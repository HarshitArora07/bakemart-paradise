import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Global Background
import bgDefault from '../assets/bg-main.png';

// Assets for Sections
import b1 from "../assets/menu/b1.png";
import b2 from "../assets/menu/b2.png";
import f1 from "../assets/menu/f1.png";
import f2 from "../assets/menu/f2.png";
import p1 from "../assets/menu/p1.png";
import p2 from "../assets/menu/p2.png";
import s1 from "../assets/menu/s1.png";
import s2 from "../assets/menu/s2.png";
import fm1 from "../assets/menu/fm1.png";

// Cake Assets
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

import MenuCard from '../components/MenuCard';
import CakeCard from '../components/CakeCard';
import Menu2 from './Menu2';

// Menu Data
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

// const beverageMenu = [
//     { name: "Cold Coffee", price: 80 },
//     { name: "Chocolate Shake", price: 80 },
//     { name: "Brownie Shake", price: 120 },
//     { name: "Oreo Shake", price: 120 },
//     { name: "KitKat Shake", price: 120 },
//     { name: "Nutella Shake", price: 150 },
// ];

// const fudgyMenu = [{ name: "Brownie with Ice-Cream", price: 100 }];

const cakesData = [
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

const categories = [
    { id: 'savory', name: 'Snacks & Sides', bg: b1 },
    { id: 'beverages', name: 'Beverages', bg: s1 },
    { id: 'cakes', name: 'Premium Cakes', bg: co1 }
];

const TabbedMenuPage = () => {
    const [activeTab, setActiveTab] = useState('savory');
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // Current background image logic
    const activeBG = hoveredCategory 
        ? categories.find(c => c.id === hoveredCategory)?.bg 
        : categories.find(c => c.id === activeTab)?.bg || bgDefault;

    return (
        <div className="relative h-screen md:overflow-hidden flex flex-col pt-14 md:pt-20">
            {/* CROSS-FADE BACKGROUND */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeBG}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 bg-cover bg-center -z-10"
                    style={{ backgroundImage: `url(${activeBG})` }}
                />
            </AnimatePresence>

            {/* TAB HEADER - Now sitting naturally in the flex flow */}
            <div className="w-full max-w-4xl mx-auto px-4 mb-4 md:mb-6 relative z-10">
                <div className="flex justify-start md:justify-center flex-nowrap overflow-x-auto scrollbar-hide gap-4 sm:gap-8 border-b border-white/20 pb-2 px-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`
                                relative py-2 px-4 font-['Cinzel'] tracking-widest uppercase text-sm sm:text-lg transition-all whitespace-nowrap
                                ${activeTab === cat.id ? 'text-[#ffe6c0]' : 'text-white/40 hover:text-white/70'}
                            `}
                        >
                            {cat.name}
                            {activeTab === cat.id && (
                                <motion.div 
                                    layoutId="activeTabUnderline"
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#edcb97]"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTENT AREA - Fills remaining space without magic numbers */}
            <div className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-4 relative z-10 overflow-y-auto md:overflow-visible">
                <AnimatePresence mode="wait">
                    {activeTab === 'savory' && (
                        <motion.div
                            key="savory"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="flex flex-col md:flex-row gap-4 justify-center items-stretch h-full pb-8"
                        >
                            <MenuCard title="BURGERS" items={burgerMenu} images={[b1, b2]} categoryType="BURGERS" onHover={setHoveredCategory} />
                            <MenuCard title="FRIES" items={friesMenu} images={[f1, f2]} categoryType="FRIES" onHover={setHoveredCategory} />
                            <MenuCard title="PASTA" items={pastaMenu} images={[p1, p2]} categoryType="PASTA" onHover={setHoveredCategory} />
                        </motion.div>
                    )}

                    {activeTab === 'beverages' && (
  <motion.div
    key="beverages"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    className="w-full h-full pb-8"
  >
    <Menu2 />
  </motion.div>
)}

                    {activeTab === 'cakes' && (
                        <motion.div 
                            key="cakes"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center h-full flex flex-col items-center overflow-y-auto pt-4"
                        >
                            <h2 className="font-['Cinzel'] text-2xl sm:text-4xl text-[#ffe6c0] mb-6">Our Masterpieces</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center w-full max-w-6xl pb-20">
                                {cakesData.map((cake) => (
                                    <CakeCard key={cake.id} cake={cake} onHover={setHoveredCategory} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TabbedMenuPage;
