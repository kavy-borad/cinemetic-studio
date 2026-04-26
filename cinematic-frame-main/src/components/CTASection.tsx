import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";
import hero1 from "@/assets/hero-1.jpg";

const CTASection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Mouse Tracking for "Unique" 3D Hover Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [0, 500], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, 1000], [-5, 5]), springConfig);
    const imageShiftX = useSpring(useTransform(mouseX, [0, 1000], [-20, 20]), springConfig);
    const imageShiftY = useSpring(useTransform(mouseY, [0, 500], [-20, 20]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!sectionRef.current) return;
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const handleMouseLeave = () => {
        mouseX.set(500); // Reset to center
        mouseY.set(250);
    };

    // Advanced Cinematic Parallax
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.4]);
    const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const flareX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);
    const blurEffect = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(0px)", "blur(4px)", "blur(0px)"]);
    const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <motion.section 
            ref={sectionRef} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "2000px" }}
            className="relative h-[80vh] overflow-hidden bg-black group"
        >
            {/* 3D Background Layer - Moves with Mouse for Depth */}
            <motion.div 
                style={{ 
                    scale: imageScale, 
                    y: imageY, 
                    x: imageShiftX,
                    translateY: imageShiftY,
                    filter: blurEffect,
                    rotateX,
                    rotateY
                }}
                className="absolute inset-0 w-full h-full transition-all duration-700 ease-out group-hover:scale-[1.15]"
            >
                <img
                    src={hero1}
                    alt="Cinematic background"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                />
            </motion.div>

            {/* Interactive Spotlight Overlay - Follows Cursor */}
            <motion.div 
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, hsl(var(--primary) / 0.15) 0%, transparent 60%)`
                    )
                }}
            />

            {/* Cinematic Lens Flare Overlay */}
            <motion.div 
                style={{ left: flareX }}
                className="absolute top-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-[45deg] pointer-events-none blur-[100px] z-10"
            />

            {/* Luxury Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-0" />

            <motion.div
                style={{ y: textY, rotateX, rotateY }}
                className="relative h-full flex flex-col items-center justify-center text-center px-6 z-20"
            >
                <motion.p 
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    whileInView={{ opacity: 1, letterSpacing: "1em" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-[10px] md:text-xs tracking-[1em] uppercase text-primary font-body mb-8 md:mb-12 font-bold"
                >
                    Begin Your Story
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="font-heading text-4xl md:text-6xl lg:text-8xl text-foreground mb-12 leading-[1.1] tracking-tighter">
                        Let's Create Something
                        <br />
                        <span className="italic font-light opacity-80 decoration-primary/30 underline-offset-8">Extraordinary</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Link
                        to="/quote"
                        className="group/btn relative inline-flex items-center gap-4 bg-transparent border border-primary/40 text-primary hover:text-black font-body text-xs font-bold tracking-[0.3em] uppercase px-16 py-6 rounded-[12px] transition-all duration-700 overflow-hidden shadow-2xl shadow-primary/5"
                    >
                        <span className="absolute inset-0 bg-primary translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-700 ease-out" />
                        <span className="relative z-10">Get Your Quote</span>
                    </Link>
                </motion.div>

                {/* Floating Golden Dust Particles */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                y: [-20, 20, -20],
                                x: [-10, 10, -10],
                                opacity: [0.2, 0.5, 0.2]
                            }}
                            transition={{ 
                                duration: 3 + Math.random() * 5, 
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                            className="absolute bg-primary/20 rounded-full blur-[2px]"
                            style={{
                                width: Math.random() * 4 + 1,
                                height: Math.random() * 4 + 1,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.section>
    );
};

export default CTASection;
