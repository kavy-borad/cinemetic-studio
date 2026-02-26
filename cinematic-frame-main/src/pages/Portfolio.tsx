import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioCategories } from "@/data/portfolio";
import { useRef } from "react";
import { CinematicFrame } from "@/components/CinematicFrame";

// Editorial Category Card Component
const CategoryCard = ({
  title,
  slug,
  image,
  index,
  isFullWidth
}: {
  title: string;
  slug: string;
  image: string;
  index: number;
  isFullWidth: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.27,
        ease: [0.215, 0.61, 0.355, 1.0],
        delay: isFullWidth ? 0 : (index % 2) * 0.15
      }}
      className={`relative ${isFullWidth ? "col-span-1 md:col-span-2 h-[70vh]" : "col-span-1 h-[60vh] md:h-[70vh]"}`}
    >
      <CinematicFrame className="h-full w-full group shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_40px_120px_rgba(0,0,0,0.7)] transition-all duration-700 hover:scale-[1.03]">
        <Link to={`/portfolio/${slug}`} className="block w-full h-full relative overflow-hidden">
          {/* Parallax Image Container */}
          <motion.div
            className="w-full h-[120%] -y-[10%]"
            style={{ y }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out"
            />
          </motion.div>

          {/* Cinematic Overlay - Dark Gradient Bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

          {/* Content - Bottom Left */}
          <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full z-10">
            <div className="overflow-hidden">
              <h3 className="font-heading text-4xl md:text-6xl text-white italic tracking-wide">
                {title}
              </h3>
            </div>

            {/* Gold Underline Animation */}
            <div className="h-[2px] bg-[#C6A15B] mt-6 w-16 group-hover:w-32 transition-all duration-700 ease-in-out" />

            <div className="mt-4 overflow-hidden">
              <p className="text-[#C6A15B] text-xs tracking-editorial uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-100">
                Explore Collection
              </p>
            </div>
          </div>
        </Link>
      </CinematicFrame>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <main className="min-h-screen bg-[#0B0B0E] relative overflow-x-hidden">
      {/* Background Atmosphere */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at top, rgba(198,161,91,0.05), transparent 50%), #0B0B0E"
        }}
      />

      <Navigation />

      <section className="min-h-[60vh] flex flex-col justify-center pt-40 pb-20 px-6 md:px-12 lg:px-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{duration: 0.1, ease: "easeOut" }}
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          <span className="text-[#C6A15B] text-sm md:text-base font-medium tracking-editorial uppercase mb-6 inline-block">
            Our Work
          </span>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight leading-none">
            Portfolio
          </h1>
          <p className="text-white/60 font-body font-light text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Cinematic stories crafted for every celebration.
          </p>

          {/* Thin Gold Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{duration: 0.1, delay: 0.15, ease: "circOut" }}
            className="h-px bg-[#C6A15B] opacity-60"
          />
        </motion.div>
      </section>

      {/* Editorial Category Grid */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 md:pb-48 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1800px] mx-auto">
          {portfolioCategories.map((cat, i) => {
            // Pattern: Full (0) -> Split (1,2) -> Full (3) -> Split (4,5)...
            // logic: if index % 3 === 0 then full width
            const isFullWidth = i % 3 === 0;

            return (
              <CategoryCard
                key={cat.slug}
                {...cat}
                index={i}
                isFullWidth={isFullWidth}
              />
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Portfolio;
