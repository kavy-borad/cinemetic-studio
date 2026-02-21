
import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
    useScroll,
    AnimatePresence
} from "framer-motion";
import { cn } from "@/lib/utils";
import PlaceholderImage from "./PlaceholderImage";

interface CinematicPhotoProps {
    src: string;
    alt: string;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    priority?: boolean;
    layoutId?: string;
}

export const CinematicPhoto: React.FC<CinematicPhotoProps> = ({
    src,
    alt,
    className,
    children,
    onClick,
    priority = false,
    layoutId,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile to disable tilt
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Set loaded immediately for placeholders
    useEffect(() => {
        if (!src.startsWith("http") && !src.startsWith("/")) {
            setIsLoaded(true);
        }
    }, [src]);

    // 1. IMAGE PARALLAX DEPTH: translateY 0 -> -40px on scroll
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    // Only apply parallax on non-mobile
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    // Mouse position relative to element (in pixels) for the glare
    const mouseXPx = useMotionValue(0);
    const mouseYPx = useMotionValue(0);

    // Mouse position relative to center (normalized -0.5 to 0.5) for rotation
    const xPct = useMotionValue(0);
    const yPct = useMotionValue(0);

    // Smooth rotation spring
    const rotateXSpring = useSpring(yPct, { stiffness: 300, damping: 30 });
    const rotateYSpring = useSpring(xPct, { stiffness: 300, damping: 30 });

    // 3. 3D DEPTH (SUBTLE): rotateX/Y ±4deg
    // Disable tilt on mobile by returning 0
    const rotateX = useTransform(rotateXSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["4deg", "-4deg"]);
    const rotateY = useTransform(rotateYSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-4deg", "4deg"]);

    // Opacity for the glare
    const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || isMobile) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;

        mouseXPx.set(mouseXRel);
        mouseYPx.set(mouseYRel);

        xPct.set((mouseXRel / width) - 0.5);
        yPct.set((mouseYRel / height) - 0.5);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (!isMobile) glareOpacity.set(1);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        glareOpacity.set(0);
        xPct.set(0);
        yPct.set(0);
    };

    // Glare gradient
    const glareBackground = useMotionTemplate`radial-gradient(
    circle at ${mouseXPx}px ${mouseYPx}px,
    rgba(255, 255, 255, 0.15),
    transparent 40%
  )`;

    return (
        <div
            ref={ref}
            className={cn("relative perspective-1000 group cursor-pointer", className)}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                layoutId={layoutId}
                className="w-full h-full relative preserve-3d rounded-xl bg-surface"
                style={{
                    rotateX,
                    rotateY,
                    y: isMobile ? 0 : parallaxY,
                    transformStyle: "preserve-3d",
                }}
                animate={{
                    // 4. DEPTH SHADOW SYSTEM
                    boxShadow: isHovered
                        ? "0 30px 60px rgba(0,0,0,0.55)"
                        : "0 10px 30px rgba(0,0,0,0.35)",
                }}
                transition={{
                    boxShadow: { duration: 0.5, ease: "easeOut" }
                }}
            >
                {/* Image Load Effect Wrapper */}
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <motion.div
                        className="w-full h-full bg-surface"
                        initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                        animate={{
                            opacity: isLoaded ? 1 : 0,
                            scale: isLoaded ? (isHovered ? 1.04 : 1) : 1.05,
                            filter: isLoaded ? "blur(0px)" : "blur(20px)",
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {src.startsWith("http") || src.startsWith("/") ? (
                            <img
                                src={src}
                                alt={alt}
                                className="block w-full h-full object-cover"
                                loading={priority ? "eager" : "lazy"}
                                onLoad={() => setIsLoaded(true)}
                            />
                        ) : (
                            <PlaceholderImage category={src} text={alt} className="w-full h-full" />
                        )}
                    </motion.div>
                </div>

                {/* 2. LIGHT SWEEP ON HOVER (Very Premium) */}
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-10">
                    <motion.div
                        className="absolute top-0 left-0 w-[200%] h-full"
                        style={{
                            background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                            x: "-100%"
                        }}
                        animate={{
                            x: isHovered ? "100%" : "-100%"
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* 5. PREMIUM HOVER OVERLAY: Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

                {/* Content Overlay (Rotates with image) */}
                {children && (
                    <div className="absolute inset-0 z-20 pointer-events-none rounded-xl overflow-hidden">
                        {children}
                    </div>
                )}

                {/* 6. GOLD ACCENT INTERACTION: Border glow */}
                <div className="absolute inset-0 rounded-xl border border-[#C6A15B] opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

                {/* Glare Overlay */}
                <motion.div
                    className="absolute inset-0 z-30 pointer-events-none rounded-xl mix-blend-overlay"
                    style={{
                        background: glareBackground,
                        opacity: glareOpacity,
                    }}
                />
            </motion.div>
        </div>
    );
};
