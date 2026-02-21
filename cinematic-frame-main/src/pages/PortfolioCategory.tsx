import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCategoryImages } from "@/data/portfolio";
import { useRef } from "react";
import { CinematicFrame } from "@/components/CinematicFrame";
import PlaceholderImage from "@/components/PlaceholderImage";

// Album Card for Masonry Grid
const AlbumCard = ({
    title,
    slug,
    image,
    index,
    date,
    location
}: {
    title: string;
    slug: string;
    image: string;
    index: number;
    date: string;
    location: string;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
            className="mb-10 break-inside-avoid relative pointer-events-none md:pointer-events-auto"
        >
            <CinematicFrame className="group cursor-pointer">
                <Link to={`/album/${slug}`} className="block relative overflow-hidden">
                    <div className="overflow-hidden rounded-xl">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>

                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-xl">
                        <span className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium tracking-editorial text-xs uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            View Story
                        </span>
                    </div>
                </Link>
            </CinematicFrame>

            <div className="mt-6 text-center">
                <h3 className="font-heading text-2xl text-white group-hover:text-[#C6A15B] transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-white/50 text-xs tracking-editorial uppercase mt-2 font-light">
                    {location} • {date}
                </p>
            </div>
        </motion.div>
    );
};

const PortfolioCategory = () => {
    const { category } = useParams();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const displayCategory = category?.replace(/-/g, " ") || "Category";
    const selectedImages = getCategoryImages(category);

    // Mock Album Data (using category images)
    const albums = Array.from({ length: 9 }).map((_, i) => ({
        id: i,
        src: selectedImages[i % selectedImages.length],
        slug: `${category}-album-${i}`,
        title: `${displayCategory} Collection ${i + 1}`,
        location: ["Paris, France", "Santorini, Greece", "Kyoto, Japan", "Lake Como, Italy"][i % 4],
        date: ["Oct 2025", "Sep 2025", "Aug 2025", "July 2025"][i % 4]
    }));

    return (
        <main className="min-h-screen bg-[#0B0B0E] relative">
            <Navigation />

            {/* Cinematic Banner */}
            <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
                <motion.div
                    ref={ref}
                    style={{ y }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={selectedImages[0]}
                        alt="Header"
                        className="w-full h-[120%] object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0E]/30 via-[#0B0B0E]/60 to-[#0B0B0E]" />
                </motion.div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="font-heading text-5xl md:text-7xl text-white mb-4 shadow-black drop-shadow-lg capitalize">
                            {displayCategory} Stories
                        </h1>
                        <p className="text-white/80 font-body text-lg italic tracking-wide max-w-xl mx-auto">
                            "Timeless moments, beautifully captured."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Editorial Masonry Grid */}
            <section className="px-6 md:px-12 lg:px-24 pb-32 relative z-10 -mt-10">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
                    {albums.map((album, index) => (
                        <AlbumCard
                            key={album.id}
                            title={album.title}
                            slug={album.slug}
                            image={album.src}
                            index={index}
                            location={album.location}
                            date={album.date}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default PortfolioCategory;
