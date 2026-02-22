import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Maximize2, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CinematicLightbox } from "@/components/CinematicLightbox";
import { getCategoryImages, categoryImages } from "@/data/portfolio";
import { CinematicFrame } from "@/components/CinematicFrame";
import { usePortfolioBySlug } from "@/hooks/usePortfolio";

const Album = () => {
    const { slug } = useParams();
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]); // Parallax for hero

    // Fetch portfolio from API by slug
    const { data: portfolio } = usePortfolioBySlug(slug);

    // Determine category from slug (for static fallback)
    let categoryKey = "wedding";
    if (slug) {
        const keys = Object.keys(categoryImages);
        const sortedKeys = keys.sort((a, b) => b.length - a.length);
        const match = sortedKeys.find(key => slug.toLowerCase().includes(key));
        if (match) categoryKey = match;
    }

    const baseImages = getCategoryImages(categoryKey);

    // Use API images when available, otherwise fall back to static data
    const apiImages = portfolio?.images ?? [];
    const sourceImages = apiImages.length > 0 ? apiImages : baseImages;
    const images = Array.from({ length: Math.max(15, sourceImages.length) }).map((_, i) => ({
        id: i,
        src: sourceImages[i % sourceImages.length],
        alt: `${portfolio?.title ?? categoryKey} Photo ${i + 1}`,
        aspect: i % 3 === 0 ? "aspect-[4/3]" : i % 2 === 0 ? "aspect-[3/4]" : "aspect-square"
    }));

    const albumTitle = portfolio?.title ?? slug?.replace(/-/g, " ") ?? "Album Title";
    const albumLocation = portfolio?.clientName ?? "India";
    const albumDate = portfolio?.eventDate
        ? new Date(portfolio.eventDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
        : "2025";

    // Keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (selectedImage === null) return;
        if (e.key === "Escape") setSelectedImage(null);
        if (e.key === "ArrowRight") setSelectedImage((prev) => (prev! + 1) % images.length);
        if (e.key === "ArrowLeft") setSelectedImage((prev) => (prev! - 1 + images.length) % images.length);
    }, [selectedImage, images.length]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
        <main className="min-h-screen bg-[#0B0B0E] relative text-foreground">
            <Navigation />

            {/* Back Button */}
            <div className="fixed top-24 left-6 md:left-12 z-40 mix-blend-difference text-white">
                <Link to="/portfolio" className="flex items-center gap-2 text-xs tracking-editorial uppercase hover:text-[#C6A15B] transition-colors duration-300">
                    <ChevronLeft size={16} /> Back to Portfolio
                </Link>
            </div>

            {/* Album Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-end justify-center pb-20">
                <motion.div
                    ref={heroRef}
                    style={{ y }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={images[0].src}
                        alt="Hero"
                        className="w-full h-[120%] object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/40 to-transparent" />
                </motion.div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <p className="text-[#C6A15B] text-xs font-medium tracking-editorial uppercase mb-6">
                            Est. 2025
                        </p>
                        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 capitalize leading-none">
                            {albumTitle}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-white/60 text-sm tracking-widest font-light uppercase">
                            <span>{albumLocation}</span>
                            <span className="w-1 h-1 bg-[#C6A15B] rounded-full" />
                            <span>{albumDate}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Masonry Image Gallery */}
            <section className="px-4 md:px-12 lg:px-24 pb-32 -mt-10 relative z-10">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((img, index) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px" }}
                            transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                            className="break-inside-avoid relative mb-8"
                            onClick={() => setSelectedImage(index)}
                        >
                            <CinematicFrame className="group cursor-zoom-in">
                                <motion.div
                                    layoutId={`image-${img.id}`}
                                    className="w-full h-full"
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                        loading="lazy"
                                    />
                                </motion.div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white ring-1 ring-white/30">
                                        <Maximize2 size={24} strokeWidth={1.5} />
                                    </span>
                                </div>
                            </CinematicFrame>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <CinematicLightbox
                        isOpen={selectedImage !== null}
                        imageSrc={images[selectedImage].src}
                        altText={images[selectedImage].alt}
                        onClose={() => setSelectedImage(null)}
                        hasNavigation={true}
                        onNext={() => setSelectedImage((prev) => (prev! + 1) % images.length)}
                        onPrev={() => setSelectedImage((prev) => (prev! - 1 + images.length) % images.length)}
                        currentIndex={selectedImage}
                        totalImages={images.length}
                        layoutId={`image-${images[selectedImage].id}`}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
};

export default Album;
