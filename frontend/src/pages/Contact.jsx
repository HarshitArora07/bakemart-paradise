import { useEffect, useRef, useState } from "react";
import c from "../assets/contact/c.png";
import c2 from "../assets/contact/c2.png";
import c3 from "../assets/contact/c3.png";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="
        min-h-screen
        px-6 md:px-20
        py-12 sm:py-16 md:py-14
        text-white
        flex items-center
        font-['Poppins']
      "
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* LEFT SIDE – TEXT */}
        <div className="flex flex-col justify-center space-y-4 md:space-y-6">

          {/* HEADING */}
          <h2
            className={`font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-bold text-left transition-opacity duration-800 ease-out ${
              visible ? "opacity-100 animate-fade-in" : "opacity-0"
            }`}
          >
            <span className="block">Let’s Stay</span>
            <span className="block">in Touch</span>
          </h2>

          <div className="text-base sm:text-lg md:text-xl space-y-4 md:space-y-6">

            {/* PHONE */}
            <div
              className={`flex items-center gap-4 md:gap-5 transition-opacity duration-800 ease-out ${
                visible ? "opacity-100 animate-fade-in" : "opacity-0"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <img src={c} alt="Phone" className="w-7 h-7 md:w-9 md:h-9" />
              <a href="tel:+918954483483" className="hover:underline">
                +91 8954483483
              </a>
            </div>

            {/* INSTAGRAM */}
            <div
              className={`flex items-center gap-4 md:gap-5 transition-opacity duration-800 ease-out ${
                visible ? "opacity-100 animate-fade-in" : "opacity-0"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <img src={c2} alt="Instagram" className="w-7 h-7 md:w-9 md:h-9" />
              <a
                href="https://www.instagram.com/bakemartparadise/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @bakemartparadise
              </a>
            </div>

            {/* ADDRESS */}
            <div
              className={`flex items-start gap-4 md:gap-5 transition-opacity duration-800 ease-out ${
                visible ? "opacity-100 animate-fade-in" : "opacity-0"
              }`}
              style={{ transitionDelay: "0.6s" }}
            >
              <img
                src={c3}
                alt="Location"
                className="w-7 h-7 md:w-9 md:h-9 mt-1"
              />
              <a
                href="https://maps.app.goo.gl/gENHrj7zV2YZi1ri9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Avantika Phase-1, Swarn Jayanti Nagar,
                Aligarh, Uttar Pradesh, India
              </a>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE – FORM */}
        <div
          className={`flex md:justify-center transition-all duration-700 ease-out transform ${
            visible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-50 -translate-y-10"
          }`}
          style={{
            transitionDelay: "0.4s",
            transitionProperty: "opacity, transform",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <form className="w-full max-w-md space-y-4 md:space-y-5 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-5 md:p-7 shadow-xl">

            <input
              className="w-full bg-transparent border border-white/30 px-4 py-2 text-base md:text-lg text-white placeholder-white/60 focus:outline-none focus:border-white"
              placeholder="Name"
            />

            <input
              className="w-full bg-transparent border border-white/30 px-4 py-2 text-base md:text-lg text-white placeholder-white/60 focus:outline-none focus:border-white"
              placeholder="Email"
            />

            <textarea
              className="w-full bg-transparent border border-white/30 px-4 py-2 text-base md:text-lg text-white placeholder-white/60 focus:outline-none focus:border-white"
              placeholder="Message"
              rows="3"
            />

            <button
              type="submit"
              className="px-6 py-2 text-base md:text-lg border border-white hover:bg-white hover:text-black transition font-['Poppins']"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
