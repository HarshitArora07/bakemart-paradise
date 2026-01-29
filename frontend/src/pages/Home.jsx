import { motion } from "framer-motion";
import logo from "../assets/home/logo.png";
import h1 from "../assets/home/h1.png";
import h2 from "../assets/home/h2.png";
import h3 from "../assets/home/h3.png";

export default function Home() {
  const cards = [h1, h2, h3];

  return (
    <section className="h-full w-full flex flex-col items-center justify-center relative pt-32 text-white font-modern">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <img
          src={logo}
          alt="Bakemart Paradise Logo"
          className="w-20 md:w-28 lg:w-32"
        />
      </div>

      {/* Text Container */}
<div className="flex flex-col items-center">
  {/* Wrapper that sizes itself to heading width */}
  <div className="inline-flex flex-col items-end space-y-1.5 md:space-y-2">

    {/* Main Heading */}
    <motion.h1
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="font-royal text-4xl md:text-6xl lg:text-7xl tracking-wide text-center mb-3 md:mb-4"

    >
      Bakemart Paradise
    </motion.h1>

    {/* Right-aligned Byline */}
    <motion.p
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      className="text-lg md:text-2xl font-modern font-light tracking-wide text-right leading-tight"

    >
      — By Kunal Arora
    </motion.p>

    <motion.p
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
      className="text-sm md:text-base font-modern text-white/80 text-right mt-0.5 md:mt-1"
    >
      (Self Taught Baker)
    </motion.p>
  </div>
</div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center items-center mt-8 gap-6">
        {cards.map((img, index) => {
          const initialProps =
            index === 0
              ? { opacity: 0, x: -50 }
              : index === 2
              ? { opacity: 0, x: 50 }
              : { opacity: 0, scale: 0.5 }; // h2 zoom-in untouched

          return (
            <motion.div
              key={index}
              initial={initialProps}
              animate={{ opacity: 1, x: 0, scale: 1, y: 0 }}
              transition={{
  opacity: { duration: 1, delay: 0.8 + index * 0.2 },
  x: { duration: 1, delay: 0.8 + index * 0.2 },
  scale: {
    duration: 0.9,
    delay: index === 1 ? 0.8 + index * 0.2 : 0,
    ease: "easeOut",
  },
}}

              whileHover={{
                scale: 1.1,
                y: -10,
                boxShadow: "0 20px 30px rgba(0,0,0,0.35)",
                transition: { duration: 0.12, ease: "easeOut", type: "tween" },
              }}
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl overflow-hidden bg-white/10 backdrop-blur-md cursor-pointer"
            >
              <img
                src={img}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
  