import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import hero1 from "@/assets/hero-1.jpg";

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <img
        src={hero1}
        alt="Cinematic wedding"
        className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-background/70" />
      <div
        ref={ref}
        className={`relative h-full flex flex-col items-center justify-center text-center px-6 opacity-0 ${isVisible ? "animate-cinematic-fade-in" : ""
          }`}
      >
        <p className="text-xs tracking-luxury uppercase text-primary font-body mb-6">
          Begin Your Story
        </p>
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
          Let's Create Something
          <br />
          <span className="italic">Extraordinary</span>
        </h2>
        <Link
          to="/quote"
          className="inline-block bg-transparent border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-black font-body text-sm font-medium tracking-widest uppercase px-12 py-4 rounded-[10px] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(198,161,91,0.3)] hover:scale-[1.02]"
        >
          Get Your Quote
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
