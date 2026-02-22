import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1621621667387-fe60d2e8ecde?auto=format&fit=crop&w=2000&q=80",
    alt: "Cinematic High Fashion Wedding Portrait",
    position: "object-[50%_15%]"
  },
  {
    src: "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=2000&q=80",
    alt: "Timeless Black and White Elegance",
    position: "object-[50%_20%]"
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=80",
    alt: "Moody Cinematic Couple Photography",
    position: "object-center"
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
    alt: "Dramatic Silhouette at Sunset",
    position: "object-center"
  },
  {
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=2000&q=80",
    alt: "Grand Epic Wedding Landscape",
    position: "object-center"
  },
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
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0"
            >
              <img
                src={slides[current].src}
                alt={slides[current].alt}
                className={`w-full h-full object-cover ${slides[current].position}`}
                loading={current === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              {/* Vignette for cinematic look */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Cinematic overlay */}
        <div className="absolute inset-0 cinematic-overlay pointer-events-none mix-blend-overlay opacity-30" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-start justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-24 pointer-events-none z-10">
          <motion.div
            key={`text-${current}`}
            style={{ y: textY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
            className="text-left pointer-events-auto max-w-3xl"
          >
            <p className="text-xs tracking-luxury uppercase text-primary font-body mb-4 drop-shadow-lg">
              Cinematic Wedding Photography
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight drop-shadow-xl text-balance">
              Your Love Story,
              <br />
              <span className="italic text-primary-foreground/90">Timeless & Cinematic</span>
            </h1>
            <p className="text-muted-foreground font-body font-light text-sm md:text-base mb-10 drop-shadow-md max-w-lg">
              We craft cinematic visual narratives that capture the essence of your most precious moments.
            </p>
            <Link
              to="/quote"
              className="inline-block bg-transparent border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-black font-body text-sm font-medium tracking-widest uppercase px-12 py-4 rounded-[10px] transition-all duration-300 hover:scale-[1.02]"
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
              className={`h-[2px] transition-all duration-500 rounded-full ${i === current ? "w-12 bg-primary" : "w-6 bg-white/30 hover:bg-white/50"
                }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 right-10 z-20 hidden md:flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-light">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 relative flex items-end justify-center"
          >
            <div className="w-1 h-1 bg-primary rounded-full absolute bottom-0 shadow-[0_0_10px_#C6A15B]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default HeroSection;
