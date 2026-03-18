import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Camera, Clock, Heart } from "lucide-react";
import { motion, useInView, animate, useScroll, useTransform, useSpring } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import aboutMeImage from "@/assets/about-me.png";

const Counter = ({ value, duration = 3 }: { value: number; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, value, {
                duration,
                ease: [0.25, 1, 0.5, 1], // Ease out expo
                onUpdate(value) {
                    if (ref.current) {
                        ref.current.textContent = Math.round(value).toLocaleString() + "+";
                    }
                },
            });

            return () => controls.stop();
        }
    }, [value, duration, isInView]);

    return <span ref={ref} className="tabular-nums">0+</span>;
};

const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { ref: revealRef, isVisible } = useScrollReveal(0.2);
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.15]);
    const imageRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

    // Spring for smooth hover movement
    const x = useSpring(0, { stiffness: 100, damping: 30 });
    const y = useSpring(0, { stiffness: 100, damping: 30 });

    const rotateX = useTransform(y, [-10, 10], [5, -5]);
    const rotateY = useTransform(x, [-10, 10], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / rect.width - 0.5) * 20;
        const yPct = (mouseY / rect.height - 0.5) * 20;
        x.set(xPct);
        y.set(yPct);
    };

    return (
        <section ref={sectionRef} className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50" />

            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Side: Unique Reveal Image */}
                    <div className="relative group perspective-[2000px]">
                        <motion.div
                            ref={revealRef}
                            initial={{ opacity: 0, x: -100, clipPath: "inset(0 100% 0 0)" }}
                            whileInView={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { x.set(0); y.set(0); }}
                            style={{ x, y, rotateX, rotateY }}
                            className="relative overflow-hidden rounded-[2rem] shadow-2xl z-20 cursor-crosshair"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 z-10 pointer-events-none" />
                            
                            {/* Rare Animated Border */}
                            <motion.div 
                                className="absolute inset-0 border-[1px] border-white/20 rounded-[2rem] z-20 pointer-events-none" 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />

                            <motion.img
                                style={{ scale: imageScale, y: imageY, rotate: imageRotate }}
                                src={aboutMeImage}
                                alt="Cinematic Portrait"
                                className="w-full h-[550px] md:h-[750px] object-cover transition-all duration-700 ease-out brightness-[0.9] group-hover:brightness-[1.1] grayscale-[0.3] group-hover:grayscale-0"
                            />

                            {/* Shutter Effect Fade */}
                            <motion.div 
                                initial={{ scaleX: 1 }}
                                whileInView={{ scaleX: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
                                className="absolute inset-0 bg-[#C6A15B] z-30 origin-right mix-blend-overlay opacity-30"
                            />
                        </motion.div>

                        {/* Rare Floating Frames Behind */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 2, delay: 0.5 }}
                            className="absolute -bottom-10 -left-10 w-full h-full border border-primary/20 rounded-[2rem] -z-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-1000"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, x: -20 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 2, delay: 0.8 }}
                            className="absolute -top-10 -right-10 w-full h-full border border-white/5 rounded-[2rem] -z-20 group-hover:-translate-x-5 group-hover:-translate-y-5 transition-transform duration-1000"
                        />

                        {/* Floating Decorative Lens Detail */}
                        <motion.div 
                            animate={{ 
                                y: [0, -20, 0],
                                rotate: [0, 5, 0],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 -right-16 w-32 h-32 bg-[radial-gradient(circle,rgba(198,161,91,0.2)_0%,transparent_70%)] rounded-full blur-xl z-30"
                        />
                    </div>

                    {/* Right Side: Content */}
                    <div
                        className={`space-y-10 opacity-0 ${isVisible ? "animate-cinematic-reveal-up" : ""}`}
                        style={{ animationDelay: "0.4s" }}
                    >
                        <div className="space-y-6">
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-xs tracking-[0.4em] uppercase text-[#C6A15B] font-medium"
                            >
                                Our Story
                            </motion.span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading text-foreground mb-10 leading-tight tracking-[0.02em]">
                                About Us
                            </h2>
                            <div className="w-12 h-[1px] bg-[#C6A15B]" />
                        </div>

                        <div className="space-y-8 text-muted-foreground font-body leading-relaxed font-light text-base md:text-lg">
                            <p className="hover:text-foreground transition-colors duration-500">
                                We believe that photography is more than just taking pictures; it’s about freezing time and preserving the raw emotions that define your most special moments. With a passion for cinematic storytelling, we craft visual narratives that transcend the ordinary.
                            </p>
                            <p className="hover:text-foreground transition-colors duration-500">
                                Our approach is rooted in the art of observation. We don't just document events; we look for the subtle glances, the tearful smiles, and the unscripted joy that truly tell your story. Every frame is composed with an artist's eye and a storyteller's heart.
                            </p>
                            <p className="hover:text-foreground transition-colors duration-500">
                                With years of experience documenting love stories and grand celebrations, we bring a calm, professional presence to every event, ensuring you feel comfortable and authentic in front of the lens.
                            </p>
                        </div>

                        <div className="pt-6">
                            <Link
                                to="/quote"
                                className="group relative inline-flex items-center gap-4 bg-transparent border border-[#C6A15B]/30 text-[#C6A15B] hover:text-black font-body text-xs font-bold tracking-widest uppercase px-12 py-5 rounded-[12px] transition-all duration-500 overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-[#C6A15B] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10 transition-colors duration-500">Get Your Quote</span>
                                <motion.div 
                                    className="relative z-10"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <Heart className="w-4 h-4 fill-current" />
                                </motion.div>
                            </Link>
                        </div>

                        {/* Highlights */}
                        <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
                            {[
                                { label: "Total Weddings", value: 1000, delay: 0.6, icon: Heart },
                                { label: "Happy Clients", value: 1500, delay: 0.7, icon: Camera },
                                { label: "Years Experience", value: 15, delay: 0.8, icon: Clock }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
                                    className="group cursor-default"
                                >
                                    <div className="mb-4">
                                        <item.icon className="w-6 h-6 text-[#C6A15B] opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                                    </div>
                                    <h4 className="text-2xl md:text-3xl lg:text-4xl font-heading text-foreground group-hover:text-[#C6A15B] transition-colors duration-500">
                                        <Counter value={item.value} />
                                    </h4>
                                    <p className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium mt-2">
                                        {item.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
