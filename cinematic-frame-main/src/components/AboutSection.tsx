import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Camera, Clock, Heart } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import aboutMeImage from "@/assets/about-me.png";

const Counter = ({ value, duration = 3 }: { value: number; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, value, {
                duration,
                ease: [0.22, 1, 0.36, 1], // Professional smooth ease
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
    return (
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
            {/* Background decorative element - static to prevent scroll lag */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Side: Professional Image Reveal */}
                    <div className="relative group">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative overflow-hidden rounded-[2rem] shadow-2xl z-20"
                        >
                            <img
                                src={aboutMeImage}
                                alt="Cinematic Portrait"
                                className="w-full h-[550px] md:h-[750px] object-cover transition-all duration-1000 ease-out brightness-[0.95] group-hover:brightness-100 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10 pointer-events-none opacity-60" />
                        </motion.div>

                        {/* Elegant Border Accents */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute -bottom-6 -left-6 w-full h-full border border-primary/30 rounded-[2rem] -z-10 transition-transform duration-700 group-hover:-translate-x-2 group-hover:translate-y-2"
                        />
                    </div>

                    {/* Right Side: Content */}
                    <div className="space-y-10">
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-6"
                        >
                            <span className="text-xs tracking-[0.4em] uppercase text-primary font-medium">
                                Our Story
                            </span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading text-foreground mb-10 leading-tight tracking-[0.02em]">
                                About Us
                            </h2>
                            <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-transparent" />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-8 text-muted-foreground font-body leading-relaxed font-light text-base md:text-lg"
                        >
                            <p className="hover:text-foreground transition-colors duration-500">
                                We believe that photography is more than just taking pictures; it’s about freezing time and preserving the raw emotions that define your most special moments. With a passion for cinematic storytelling, we craft visual narratives that transcend the ordinary.
                            </p>
                            <p className="hover:text-foreground transition-colors duration-500">
                                Our approach is rooted in the art of observation. We don't just document events; we look for the subtle glances, the tearful smiles, and the unscripted joy that truly tell your story. Every frame is composed with an artist's eye and a storyteller's heart.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="pt-6"
                        >
                            <Link
                                to="/quote"
                                className="inline-block border font-body text-sm font-medium tracking-widest uppercase px-12 py-4 rounded-[8px] transition-all duration-500 ease-out hover:scale-105 bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                Get Your Quote
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-8 pt-10 border-t border-border">
                            {[
                                { label: "Total Weddings", value: 1000, delay: 0.4, icon: Heart },
                                { label: "Happy Clients", value: 1500, delay: 0.5, icon: Camera },
                                { label: "Years Experience", value: 15, delay: 0.6, icon: Clock }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
                                    className="group cursor-default"
                                >
                                    <div className="mb-4">
                                        <item.icon className="w-6 h-6 text-primary opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                                    </div>
                                    <h4 className="text-2xl md:text-3xl lg:text-4xl font-heading text-foreground group-hover:text-primary transition-colors duration-500">
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
