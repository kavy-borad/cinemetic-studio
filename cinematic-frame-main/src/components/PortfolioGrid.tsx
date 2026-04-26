
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePortfolios } from "@/hooks/usePortfolio";
import { toImageUrl } from "@/lib/api";

const CategoryCard = ({ title, slug, image, index }: { title: string; slug: string; image: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
       duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
      }}
      whileHover={{ 
        y: -15, 
        scale: 1.03, 
        rotateX: 5, 
        rotateY: -5,
        z: 50
      }}
      whileTap={{ scale: 0.95 }}
      style={{ transformStyle: "preserve-3d" }}
      className="perspective-[1000px] z-10 hover:z-50 relative"
    >
      <Link to={`/portfolio/${slug}`} className="group block relative overflow-visible rounded-xl h-full shadow-lg transition-shadow duration-500 hover:shadow-[0_30px_60px_-15px_hsl(var(--primary) / 0.3)]">
        {/* Container for the zoom effect */}
        <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-square w-full" style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}>
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.15] will-change-transform opacity-80 group-hover:opacity-100"
          />

          {/* Overlay Gradient causing the children to be on top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none z-10" />

          <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none z-20" style={{ transform: "translateZ(30px)" }}>
            <p className="text-sm tracking-editorial font-medium uppercase font-body text-white/90 group-hover:text-white transition-colors duration-300 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              {title}
            </p>
            <div className="h-[2px] w-0 group-hover:w-full bg-primary mt-4 transition-all duration-700 ease-out shadow-[0_0_10px_hsl(var(--primary) / 0.8)]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const PortfolioGrid = () => {
  const { data: allPortfolios, isLoading, isError } = usePortfolios();

  // Derive unique categories from API data
  const categories = (() => {
    if (!allPortfolios || allPortfolios.length === 0) return [];
    const seen = new Map<string, { title: string; slug: string; image: string }>();
    for (const p of allPortfolios) {
      const slug = p.category?.toLowerCase().replace(/\s+/g, "-") || "uncategorized";
      if (!seen.has(slug)) {
        seen.set(slug, {
          title: p.category || "Uncategorized",
          slug,
          image: toImageUrl(p.coverImage),
        });
      }
    }
    return Array.from(seen.values());
  })();

  return (
    <section className="section-padding bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <h2 className="font-heading italic text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 drop-shadow-lg tracking-wider">
            Portfolio
          </h2>
          <p className="text-white/60 font-body text-base md:text-lg mb-6">
            Where Memories Become Timeless
          </p>
          <div className="w-12 h-[1px] bg-primary" />
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <p className="text-center text-red-400/60 text-xs tracking-editorial uppercase py-10">
            ⚠ Could not load portfolio
          </p>
        )}

        {/* Empty */}
        {!isLoading && !isError && categories.length === 0 && (
          <p className="text-center text-white/30 text-sm py-10">No portfolio categories yet</p>
        )}

        {/* Dynamic Category Grid */}
        {!isLoading && categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.slug} {...cat} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGrid;
