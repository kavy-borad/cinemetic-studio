import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Lumière didn't just photograph our wedding — they captured the very soul of our love story. Every image feels like a frame from a beautiful film.",
    author: "Sarah & James",
    event: "Tuscany Wedding",
  },
  {
    quote: "Working with them was effortless. They have an incredible ability to make you feel comfortable while creating art that takes your breath away.",
    author: "Priya & Arjun",
    event: "Mumbai Celebration",
  },
  {
    quote: "The level of artistry and attention to detail is unmatched. These photographs are our most treasured possessions.",
    author: "Elena & Marco",
    event: "Lake Como Wedding",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center opacity-0 ${isVisible ? "animate-cinematic-fade-in" : ""}`}
      >
        <p className="text-xs tracking-luxury uppercase text-primary font-body mb-16">
          Testimonials
        </p>

        <div className="relative min-h-[250px] cursor-grab active:cursor-grabbing">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }} // Slide from right
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} // Slide to left
              transition={{duration: 0.1, ease: "circOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x; // width of swipe
                if (swipe < -50) {
                  next();
                } else if (swipe > 50) {
                  prev();
                }
              }}
              className="bg-neutral-900/30 border border-white/5 p-8 md:p-12 rounded-2xl backdrop-blur-sm shadow-xl"
            >
              <blockquote className="font-heading text-xl md:text-2xl lg:text-3xl text-foreground italic leading-relaxed mb-8">
                "{testimonials[current].quote}"
              </blockquote>
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm tracking-luxury uppercase font-body text-primary font-semibold">
                  {testimonials[current].author}
                </p>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <p className="text-xs font-body text-muted-foreground/80 tracking-widest uppercase">
                  {testimonials[current].event}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="text-muted-foreground hover:text-primary transition-colors duration-500"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs font-body text-muted-foreground">
            {current + 1} / {testimonials.length}
          </span>
          <button
            onClick={next}
            className="text-muted-foreground hover:text-primary transition-colors duration-500"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
