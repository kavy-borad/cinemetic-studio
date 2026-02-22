
import PlaceholderImage from "@/components/PlaceholderImage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { portfolioCategories } from "@/data/portfolio";

const CategoryCard = ({ title, slug, image, index }: { title: string; slug: string; image: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
       duration: 0.3,
        ease: "easeOut",
        delay: index * 0.15,
      }}
    >
      <Link to={`/portfolio/${slug}`} className="group block relative overflow-visible rounded-xl h-full">
        {/* Container for the zoom effect */}
        <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-square w-full">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform opacity-90 group-hover:opacity-100"
          />

          {/* Overlay Gradient causing the children to be on top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none z-10" />

          <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none z-20">
            <p className="text-sm tracking-editorial font-medium uppercase font-body text-white/90 group-hover:text-white transition-colors duration-300 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              {title}
            </p>
            <div className="h-[1px] w-0 group-hover:w-full bg-[#C6A15B] mt-4 transition-all duration-700 ease-out" />
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
