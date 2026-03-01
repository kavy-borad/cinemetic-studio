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
            <section className="relative min-h-[60vh] flex flex-col justify-center pt-40 pb-20 px-6 md:px-12 lg:px-24 text-center z-10 overflow-hidden">
                <motion.div
                    ref={heroRef}
                    style={{ y }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={images[0].src}
                        alt="Hero"
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
                            Est. {albumDate.split(' ').pop()}
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight leading-none text-center w-full capitalize">
                            {albumTitle}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-white/60 text-sm tracking-widest font-light uppercase mb-12">
                            <span>{albumLocation}</span>
                            <span className="w-1 h-1 bg-[#C6A15B] rounded-full" />
                            <span>{albumDate}</span>
                        </div>

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

            {/* Masonry Image Gallery */}
            <section className="px-4 md:px-12 lg:px-24 pb-32 -mt-10 relative z-10">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((img, index) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(20px)" }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1], // Cinematic ease out
                                delay: (index % 3) * 0.15
                            }}
                            className="break-inside-avoid relative mb-8"
                            onClick={() => setSelectedImage(index)}
                        >
                            <CinematicFrame className="group cursor-zoom-in rounded-xl overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-shadow duration-700">
                                <motion.div
                                    layoutId={`image-${img.id}`}
                                    className="w-full h-full overflow-hidden"
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                                        loading="lazy"
                                    />
                                </motion.div>

                                {/* Premium Golden Glassmorphism Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-[2px]">
                                    <span className="bg-[#C6A15B]/20 backdrop-blur-md p-4 rounded-full text-white ring-1 ring-[#C6A15B]/60 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-out shadow-[0_0_20px_rgba(198,161,91,0.4)]">
                                        <Maximize2 size={24} strokeWidth={1.5} className="text-white drop-shadow-md" />
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
