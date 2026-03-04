import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

// Reduced to exactly 3 premium cinematic images
const slides = [
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=80",
    alt: "Moody Cinematic Couple Photography",
    position: "object-center"
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
    alt: "Dramatic Silhouette at Sunset",
    position: "object-center"
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80",
    alt: "Beautiful Dark Cinematic Wedding Detail",
    position: "object-center"
  }
];

const HeroSection = React.memo(() => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-black overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.9]),
          borderRadius: useTransform(scrollYProgress, [0, 1], ["0px", "40px"]),
        }}
        className="w-full h-full relative overflow-hidden origin-top"
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 h-[120%] w-full">
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              initial={{ scale: 1.02, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.02, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={slides[current].src}
                alt={slides[current].alt}
                className={`w-full h-full object-cover ${slides[current].position}`}
                loading={current === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              {/* Premium dark vignette exactly behind where text is */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Cinematic noise overlay */}
        <div className="absolute inset-0 cinematic-overlay pointer-events-none mix-blend-overlay opacity-30" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-start justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-24 pointer-events-none z-10 text-balance">
          <motion.div
            key={`text-${current}`} // triggers re-animation on slide change
            style={{ y: textY }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
            className="text-left pointer-events-auto max-w-3xl"
          >
            <p className="text-xs tracking-luxury uppercase font-body mb-4 font-semibold drop-shadow-md text-[#C6A15B]">
              Cinematic Wedding Photography
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight text-white drop-shadow-xl">
              Your Love Story,
              <br />
              <span className="italic text-white/90">Timeless & Cinematic</span>
            </h1>
            <p className="font-body font-light text-sm md:text-base mb-10 max-w-lg text-white/80 drop-shadow-md">
              We craft cinematic visual narratives that capture the essence of your most precious moments.
            </p>
            <Link
              to="/quote"
              className="inline-block border font-body text-sm font-medium tracking-widest uppercase px-12 py-4 rounded-[10px] transition-all duration-300 hover:scale-[1.02] bg-transparent border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-black"
            >
              Get Your Quote
            </Link>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-8 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[2px] transition-all duration-300 rounded-full ${i === current ? "w-12 bg-primary" : "w-6 bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>

        {/* Premium Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-10 right-12 z-20 hidden md:flex flex-col items-center gap-4 cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-medium text-white/50 group-hover:text-[#C6A15B] transition-colors duration-500">
            Scroll
          </span>
          <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden flex justify-center">
            <motion.div
              className="absolute top-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-[#C6A15B] to-[#C6A15B] blur-[0.5px]"
              animate={{
                y: ["-100%", "300%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default HeroSection;
