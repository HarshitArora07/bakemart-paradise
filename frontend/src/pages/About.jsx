import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import a1 from "../assets/about/a1.png";

export default function About() {
  const [imageVisible, setImageVisible] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true);   // trigger image when heading is visible
          observer.disconnect();   // only once
        }
      },
      { threshold: 0.5 }           // trigger when 50% of heading is visible
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
  }, []);

  return (
    <section className="h-full flex flex-col items-start px-6 md:px-20 pt-24 relative">
      
      {/* Main title with zoom-in effect */}
      <motion.h1
        ref={headingRef}
        className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-wide"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Bakemart Paradise
      </motion.h1>

      {/* About card */}
      <motion.div
        className="w-full max-w-4xl bg-[#F3E6D3]/90 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg relative"
        initial={{ x: 300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold tracking-wide mb-6 text-gray-900">
            About Us
          </h2>

          <p className="font-['Poppins'] text-sm md:text-base leading-relaxed text-justify text-gray-800">
            Started in 2020 as a home bakery, Bakemart Paradise grew into a
            full-fledged café outlet in 2023 through dedication, hard work,
            and countless blessings.
            <br /><br />
            Today, we proudly offer an expanded range of cakes along with a
            delicious snacks menu. Customization goes to another level with
            continuous motivation, creativity, and attention to detail.
            <br /><br />
            Customer satisfaction remains at the heart of everything we do.
          </p>
        </motion.div>
      </motion.div>

      {/* Right-side image (desktop only) */}
      <motion.img
        src={a1}
        alt="Bakemart decor"
        className="
          hidden md:block
          absolute
          right-0
          top-[-48%] lg:top-[-83%] xl:top-[-83%]
          -translate-y-1/2
          w-[60%] lg:w-[55%] xl:w-[50%]
          max-w-[750px] lg:max-w-[850px] xl:max-w-[990px]
          object-contain
          pointer-events-none
        "
        initial={{ x: "100%", opacity: 0 }}   // offscreen right
        animate={imageVisible ? { x: 0, opacity: 1 } : {}} // slide when heading visible
        transition={{ duration: 1, ease: "easeOut", delay: 1 }} // 2s after heading visible
      />
    </section>
  );
}
