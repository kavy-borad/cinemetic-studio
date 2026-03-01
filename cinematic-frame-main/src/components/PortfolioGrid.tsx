import PlaceholderImage from "@/components/PlaceholderImage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { portfolioCategories } from "@/data/portfolio";

const CategoryCard = ({ title, slug, image, index }: { title: string; slug: string; image: string; index: number }) => {
  // Determine if card comes from left, center (bottom), or right
  const isLeft = index % 3 === 0;
  const isRight = index % 3 === 2;
  const initialX = isLeft ? -120 : isRight ? 120 : 0;
  const initialY = (!isLeft && !isRight) ? 120 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0], // Cinematic ease-out 
        delay: (index % 3) * 0.1, // Stagger left-to-right
      }}
    >
      <Link to={`/portfolio/${slug}`} className="group block relative overflow-visible rounded-xl h-full cursor-pointer">
        {/* Container for the zoom effect */}
        <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-square w-full shadow-lg group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
          />

          {/* Overlay Gradient causing the children to be on top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none z-10" />

          <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none z-20">
            <p className="text-sm md:text-base tracking-editorial font-medium uppercase font-body text-white/90 group-hover:text-white transition-colors duration-300 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 filter drop-shadow-md">
              {title}
            </p>
            <div className="h-[2px] w-0 group-hover:w-16 bg-[#C6A15B] mt-4 transition-all duration-300 ease-out shadow-[0_0_10px_#C6A15B]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const PortfolioGrid = () => {
  return (
    <section className="section-padding bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Portfolio
          </h2>
          <p className="text-white/60 font-body text-base md:text-lg mb-6">
            Where Memories Become Timeless
          </p>
          <div className="w-12 h-[1px] bg-[#C6A15B]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {portfolioCategories.map((cat, i) => (
            <CategoryCard key={cat.title} {...cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
