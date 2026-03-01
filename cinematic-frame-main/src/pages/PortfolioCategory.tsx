import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCategoryImages } from "@/data/portfolio";
import { useRef } from "react";
import { CinematicFrame } from "@/components/CinematicFrame";
import PlaceholderImage from "@/components/PlaceholderImage";
import { usePortfolios } from "@/hooks/usePortfolio";
//hello
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
            initial={{ opacity: 0, y: 80, scale: 0.9, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Cinematic custom bezier curve
                delay: (index % 3) * 0.15
            }}
            className="mb-10 break-inside-avoid relative pointer-events-none md:pointer-events-auto"
        >
            <CinematicFrame className="group cursor-pointer rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-500">
                <Link to={`/album/${slug}`} className="block relative overflow-hidden">
                    <div className="overflow-hidden bg-gray-900 aspect-[3/4] sm:aspect-auto">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                        />
                    </div>

                    {/* Premium Glassmorphic Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-md">
                        <span className="px-8 py-4 bg-transparent border border-[#C6A15B] text-[#C6A15B] tracking-[0.3em] font-medium text-xs uppercase transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 delay-100 hover:bg-[#C6A15B] hover:text-black hover:drop-shadow-[0_0_20px_rgba(198,161,91,0.5)]">
                            View Story
                        </span>
                    </div>
                </Link>
            </CinematicFrame>

            <div className="mt-6 text-center transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-heading text-2xl md:text-3xl text-white group-hover:text-[#C6A15B] transition-colors duration-500 tracking-wide drop-shadow-md">
                    {title}
                </h3>
                <p className="text-white/50 text-[10px] md:text-xs tracking-[0.3em] uppercase mt-3 font-light">
                    {location} • {date}
                </p>
                <div className="h-[1px] w-0 group-hover:w-16 bg-[#C6A15B] mx-auto mt-4 transition-all duration-500 ease-out" />
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
    const { data: apiPortfolios } = usePortfolios(category);

    // Use API data when available, otherwise fall back to mock albums
    const albums = (apiPortfolios && apiPortfolios.length > 0)
        ? apiPortfolios.map((p, i) => ({
            id: p.id,
            src: p.coverImage || selectedImages[i % selectedImages.length],
            slug: p.slug,
            title: p.title,
            location: p.clientName || "Ahmedabad, India",
            date: p.eventDate
                ? new Date(p.eventDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
                : "2025",
        }))
        : Array.from({ length: 9 }).map((_, i) => ({
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
            <section className="relative min-h-[60vh] flex flex-col justify-center pt-40 pb-20 px-6 md:px-12 lg:px-24 text-center z-10 overflow-hidden">
                <motion.div
                    ref={ref}
                    style={{ y }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={selectedImages[0]}
                        alt="Header"
                        className="w-full h-full object-cover opacity-30 blur-[2px] scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0E] via-[#0B0B0E]/60 to-[#0B0B0E]" />
                </motion.div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="flex flex-col items-center w-full"
                    >
                        <span className="text-[#C6A15B] text-sm md:text-base font-medium tracking-editorial uppercase mb-6 inline-block">
                            Portfolio
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight leading-none text-center w-full capitalize">
                            {displayCategory} Stories
                        </h1>
                        <p className="text-white/60 font-body font-light text-xl md:text-2xl w-full max-w-5xl text-center mx-auto mb-12 leading-relaxed">
                            Timeless moments, beautifully captured.
                        </p>

                        {/* Thin Gold Divider */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100px" }}
                            transition={{ duration: 0.1, delay: 0.15, ease: "circOut" }}
                            className="h-px bg-[#C6A15B] opacity-60"
                        />
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
