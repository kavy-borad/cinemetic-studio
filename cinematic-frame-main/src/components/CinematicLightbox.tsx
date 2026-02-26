
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PlaceholderImage from "./PlaceholderImage";

interface CinematicLightboxProps {
    isOpen: boolean;
    imageSrc: string;
    altText?: string;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    hasNavigation?: boolean;
    currentIndex?: number;
    totalImages?: number;
    layoutId?: string;
}

export const CinematicLightbox: React.FC<CinematicLightboxProps> = ({
    isOpen,
    imageSrc,
    altText = "Gallery Image",
    onClose,
    onNext,
    onPrev,
    hasNavigation = true,
    currentIndex,
    totalImages,
    layoutId,
}) => {
    // Mobile detection for disabling 3D effects
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight" && onNext) onNext();
            if (e.key === "ArrowLeft" && onPrev) onPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

    // Rotate range: ±3deg as requested
    const rotateX = useTransform(mouseY, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["3deg", "-3deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-3deg", "3deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;

        const xPct = (mouseXRel / width) - 0.5;
        const yPct = (mouseYRel / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-[20px]"
                    onClick={onClose}
                >
                    {/* Navigation Controls */}
                    {hasNavigation && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onPrev?.();
                                }}
                                className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors duration-300 p-2 z-50 focus:outline-none"
                            >
                                <ChevronLeft size={48} strokeWidth={1} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onNext?.();
                                }}
                                className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors duration-300 p-2 z-50 focus:outline-none"
                            >
                                <ChevronRight size={48} strokeWidth={1} />
                            </button>
                        </>
                    )}

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white/60 hover:text-white transition-opacity duration-300 p-2 z-50"
                    >
                        <X size={32} strokeWidth={1} />
                    </button>

                    {/* Floating Frame Container */}
                    <div
                        className="perspective-1200 relative p-4 md:p-10 w-full max-w-7xl h-full max-h-screen flex items-center justify-center"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onClick={(e) => e.stopPropagation()} // Prevent close when clicking image area
                    >
                        <motion.div
                            layoutId={layoutId}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                            initial={layoutId ? { borderRadius: "12px" } : { scale: 0.95, opacity: 0, filter: "blur(10px)" }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                filter: "blur(0px)",
                                borderRadius: "16px",
                            }}
                            exit={layoutId ? { opacity: 1, borderRadius: "12px" } : { scale: 0.95, opacity: 0, filter: "blur(10px)" }}
                            transition={{
                                duration: 0.14,
                                ease: "easeInOut",
                                layout: { duration: 0.14, ease: "easeInOut" }
                            }}
                            className={cn(
                                "relative max-w-full max-h-[85vh] overflow-hidden rounded-2xl shadow-[0_60px_150px_rgba(0,0,0,0.8)]",
                            )}
                        >
                            {imageSrc.startsWith("http") || imageSrc.startsWith("/") ? (
                                <img
                                    src={imageSrc}
                                    alt={altText}
                                    className="w-auto h-auto max-w-full max-h-[85vh] object-contain block"
                                />
                            ) : (
                                <div className="w-[80vw] h-[80vh] max-w-7xl max-h-[85vh]">
                                    <PlaceholderImage category={imageSrc} text={altText} className="w-full h-full" />
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div >
            )}
        </AnimatePresence >
    );
};
