import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Maximize2, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CinematicLightbox } from "@/components/CinematicLightbox";
import { CinematicFrame } from "@/components/CinematicFrame";
import { usePortfolioBySlug } from "@/hooks/usePortfolio";
import { toImageUrl } from "@/lib/api";

const Album = () => {
    const { slug } = useParams();
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]); // Parallax for hero

    // Fetch portfolio from API by slug
    const { data: portfolio, isLoading: portfolioLoading, isError: portfolioError } = usePortfolioBySlug(slug);

    // ── Safe image parser ──────────────────────────────────────────────────────
    // MySQL JSON field can sometimes return as a string instead of parsed array.
    // This helper handles both cases to prevent TypeError crash (black screen).
    const parseImages = (raw: any): string[] => {
        if (!raw) return [];
        if (Array.isArray(raw)) return raw;                       // ✅ already array
        if (typeof raw === "string") {
            try { return JSON.parse(raw); } catch { return []; }  // ✅ parse JSON string
        }
        return [];
    };

    const apiImages = parseImages(portfolio?.images).map((src) => toImageUrl(src));
    const images = apiImages.map((src, i) => ({
        id: i,
        src,
        alt: `${portfolio?.title ?? "Album"} Photo ${i + 1}`,
        aspect: i % 3 === 0 ? "aspect-[4/3]" : i % 2 === 0 ? "aspect-[3/4]" : "aspect-square"
    }));

    // Hero image: prefer the coverImage from API, fallback to first gallery image
    const heroSrc = toImageUrl(portfolio?.coverImage) || (images[0]?.src ?? "");


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
                        src={heroSrc}
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

                {/* API Loading */}
                {portfolioLoading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-8 h-8 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin" />
                        <p className="text-white/40 text-xs tracking-editorial uppercase">Loading album from API...</p>
                    </div>
                )}

                {/* API Error */}
                {portfolioError && (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <p className="text-red-400/60 text-xs tracking-editorial uppercase">
                            ⚠ Could not load this album
                        </p>
                        <p className="text-white/30 text-xs">Please try again later</p>
                    </div>
                )}

                {/* Empty State */}
                {!portfolioLoading && !portfolioError && images.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <p className="text-white/40 text-sm tracking-editorial uppercase">No photos in this album</p>
                        <p className="text-white/20 text-xs">Upload photos in the admin panel</p>
                    </div>
                )}

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {!portfolioLoading && images.map((img, index) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px" }}
                            transition={{ duration: 0.1, delay: (index % 3) * 0.1 }}
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
