import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Video, Plane, Plus } from "lucide-react";
import { motion } from "framer-motion";

const services = [
    {
        title: "Wedding Photography",
        description: "Timeless visual storytelling.",
        icon: Camera,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000"
    },
    {
        title: "Cinematic Films",
        description: "Motion that moves hearts.",
        icon: Video,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000"
    },
    {
        title: "Drone Coverage",
        description: "Aerial perspectives.",
        icon: Plane,
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=2000"
    }
];

const ServicesSection = () => {
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleNavigation = () => {
        navigate("/services");
        window.scrollTo(0, 0);
    };

    return (
        <section className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-[#050505] relative overflow-hidden">
            {/* Unique Background Marquee / "Cool Message" - Made simpler to avoid recalculation */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none z-0 overflow-hidden select-none">
                <h2 className="text-[15vw] md:text-[12vw] font-heading font-black text-white/[0.03] whitespace-nowrap leading-none uppercase tracking-tighter text-center">
                    Cinematic Experience • Premium Visuals
                </h2>
            </div>

            {/* Decorative Floating Particles - Removed scroll parallax to fix lag */}
            <div className="absolute top-20 right-[10%] w-32 h-32 bg-primary/10 rounded-[2rem] blur-[80px] pointer-events-none rotate-45" />
            <div className="absolute bottom-20 left-[5%] w-48 h-48 bg-primary/5 rounded-[3rem] blur-[100px] pointer-events-none -rotate-45" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-24 flex flex-col items-center"
                >
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
                        transition={{ duration: 1.2 }}
                        className="text-xs tracking-[0.4em] uppercase text-primary font-medium mb-6"
                    >
                        Mastering the Craft
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading text-foreground mb-10 leading-tight tracking-[0.02em]">
                        Our Services
                    </h2>
                    <div className="w-12 h-[1px] bg-primary mb-8" />
                    <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl font-light leading-relaxed">
                        We provide complete visual coverage for every special moment.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-20">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        const variants = {
                            initial: {
                                opacity: 0,
                                y: 40,
                            },
                            animate: (i: number) => ({
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.8,
                                    delay: i * 0.15,
                                    ease: [0.22, 1, 0.36, 1]
                                }
                            })
                        };

                        return (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={variants}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true, margin: "-50px" }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={handleNavigation}
                                className="group relative h-[450px] md:h-[500px] lg:h-[550px] bg-[#0A0A0F]/60 backdrop-blur-xl border border-white/[0.03] rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-primary/40 flex flex-col items-center justify-center p-10 text-center cursor-pointer"
                            >
                                {/* Luxury Animated Inner Border */}
                                <div className="absolute inset-4 border border-white/[0.02] rounded-[2rem] pointer-events-none group-hover:border-primary/10 transition-all duration-700" />

                                {/* Animated Gradient Glow */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary) / 0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="mb-10 w-24 h-24 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_20px_40px_hsl(var(--primary)_/_0.2)] transition-all duration-500">
                                        <Icon size={36} strokeWidth={1} />
                                    </div>

                                    <h3 className="text-3xl lg:text-4xl font-heading text-white mb-6 tracking-tight leading-tight italic group-hover:text-primary transition-colors duration-500">
                                        {service.title}
                                    </h3>

                                    <div className="h-[1px] w-8 bg-primary/30 mb-8 group-hover:w-16 group-hover:bg-primary transition-all duration-700" />

                                    <p className="text-white/40 font-body text-lg group-hover:text-white/80 transition-colors duration-500 leading-relaxed font-light">
                                        {service.description}
                                    </p>

                                    <div className="mt-10 flex items-center gap-3 text-primary text-xs uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        Explore <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <button
                        onClick={handleNavigation}
                        className="group relative inline-flex items-center gap-6 bg-transparent border border-primary/30 text-primary font-body text-xs font-bold tracking-[0.4em] uppercase px-16 py-6 rounded-[12px] transition-all duration-700 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-primary translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                        <span className="relative z-10 group-hover:text-black transition-colors duration-700">Discover our world</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
