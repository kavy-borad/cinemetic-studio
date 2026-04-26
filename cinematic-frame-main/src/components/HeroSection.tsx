import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

// Reduced to exactly 3 premium cinematic images
const slides = [
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=80",
    alt: "Moody Cinematic Couple Photography",
    position: "object-center",
    title: "Your Love Story,",
    highlight: "Timeless & Cinematic",
    description: "We craft cinematic visual narratives that capture the essence of your most precious moments."
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
    alt: "Dramatic Silhouette at Sunset",
    position: "object-center",
    title: "Artistic Elegance,",
    highlight: "Captured with Grace",
    description: "Every frame is meticulously composed to reflect the raw and authentic emotions of your day."
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80",
    alt: "Beautiful Dark Cinematic Wedding Detail",
    position: "object-center",
    title: "Unforgettable Moments,",
    highlight: "A Masterpiece",
    description: "Turning fleeting seconds into a lasting legacy of beautiful memories you can cherish forever."
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

  // Use simple, hardware-accelerated parallax for a professional feel without lag
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-background overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ y, opacity }}
        className="w-full h-full relative overflow-hidden origin-top"
      >
        <div className="absolute inset-0 h-[110%] w-full">
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                src={slides[current].src}
                alt={slides[current].alt}
                className={`w-full h-full object-cover ${slides[current].position}`}
                loading={current === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              {/* Premium dark vignette exactly behind where text is */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cinematic noise overlay */}
        <div className="absolute inset-0 cinematic-overlay pointer-events-none mix-blend-overlay opacity-20" />

        {/* Hero content */}
        <div className="absolute inset-0 pointer-events-none z-10 text-balance overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-24 md:bottom-32 left-6 md:left-12 lg:left-24 pr-6 md:pr-12 lg:pr-24 text-left pointer-events-auto max-w-3xl"
            >
              <p className="text-xs tracking-luxury uppercase font-body mb-4 font-semibold text-primary drop-shadow-md">
                Cinematic Wedding Photography
              </p>
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight text-foreground drop-shadow-xl">
                {slides[current].title}
                <br />
                <span className="italic text-white/90">{slides[current].highlight}</span>
              </h1>
              <p className="font-body font-light text-sm md:text-base mb-10 max-w-lg text-white/80 drop-shadow-md">
                {slides[current].description}
              </p>
              <Link
                to="/quote"
                className="inline-block border font-body text-sm font-medium tracking-widest uppercase px-12 py-4 rounded-[8px] transition-all duration-500 ease-out hover:scale-105 bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Get Your Quote
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Slide indicators - Moved outside scaling container to prevent artifacts */}
      <div className="absolute bottom-10 left-8 flex gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[2px] transition-all duration-500 rounded-full ${i === current ? "w-12 bg-primary shadow-[0_0_12px_hsl(var(--primary))]" : "w-6 bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>

      {/* Premium Scroll Indicator - Moved outside scaling container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 right-12 z-30 hidden md:flex flex-col items-center gap-4 cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-medium text-muted-foreground group-hover:text-primary transition-colors duration-500">
          Scroll
        </span>
        <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden flex justify-center">
          <motion.div
            className="absolute top-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-primary to-primary blur-[0.5px]"
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
    </section>
  );
});

export default HeroSection;
