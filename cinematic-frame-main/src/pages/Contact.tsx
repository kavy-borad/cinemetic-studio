import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight, Instagram, Youtube, ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 1. Hero Parallax Setup
    const heroRef = useRef(null);
    const { scrollYProgress: heroScrollY } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroBgY = useTransform(heroScrollY, [0, 1], ["0%", "20%"]);

    // Faster Easing
    const fastEase = "easeOut";

    return (
        <div className="bg-[#050505] min-h-screen text-white selection:bg-[#C6A15B]/30 flex flex-col font-body overflow-x-hidden">
            <Navigation />

            {/* SECTION 1 – Cinematic Hero */}
            <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center text-center overflow-hidden w-full">
                <motion.div
                    style={{ y: heroBgY }}
                    className="absolute -top-[20%] left-0 w-full h-[140%] pointer-events-none origin-center"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=2000&q=80"
                        alt="Cinematic Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505] z-10" />

                <div className="relative z-20 max-w-4xl mx-auto px-6 mt-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: fastEase }}
                        className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight"
                    >
                        Let’s Create <br /> <span className="italic text-white/90">Your Story</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.05, ease: fastEase }}
                        className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10"
                    >
                        Connect with us for weddings, premium events, and exclusive creative collaborations.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1, ease: fastEase }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link
                            to="/quote"
                            className="bg-[#C6A15B] text-[#050505] font-bold tracking-[0.2em] uppercase text-xs px-10 py-4 rounded-full transition-all duration-300 hover:bg-white hover:scale-[1.03] shadow-[0_0_20px_rgba(198,161,91,0.2)]"
                        >
                            Get Your Quote
                        </Link>
                        <a
                            href="https://wa.me/919876543210"
                            className="bg-transparent border border-white/20 text-white font-bold tracking-[0.2em] uppercase text-xs px-10 py-4 rounded-full transition-all duration-300 hover:border-[#C6A15B] hover:text-[#C6A15B] hover:scale-[1.03]"
                        >
                            WhatsApp / Call Now
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2 – Quick Contact (Luxury Cards) */}
            <section className="px-6 md:px-12 lg:px-24 pb-20 relative z-20 w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24">
                    {[
                        { title: "Call Now", desc: "+91 98765 43210", icon: Phone, link: "tel:+919876543210", delay: 0 },
                        { title: "WhatsApp Chat", desc: "Message us instantly", icon: MessageCircle, link: "https://wa.me/919876543210", delay: 0.1 },
                        { title: "Email", desc: "hello@pixcelstudio.com", icon: Mail, link: "mailto:hello@pixcelstudio.com", delay: 0.2 },
                        { title: "Studio Address", desc: "Ahmedabad, Gujarat", icon: MapPin, link: "#map", delay: 0.3 }
                    ].map((card, idx) => (
                        <motion.a
                            key={idx}
                            href={card.link}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: card.delay, ease: fastEase }}
                            className="group relative bg-[#121218] border border-[#1E1E26] rounded-[20px] p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-[#C6A15B] hover:shadow-[0_0_20px_rgba(198,161,91,0.2)] hover:-translate-y-[5px]"
                        >
                            <div className="w-16 h-16 rounded-full border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] mb-6 group-hover:border-[#C6A15B] group-hover:bg-[#C6A15B]/10 transition-all duration-300">
                                <card.icon size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-heading text-white mb-2 group-hover:text-[#C6A15B] transition-colors duration-300">{card.title}</h3>
                            <p className="text-white/50 text-sm font-light">{card.desc}</p>
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* SECTION 3 – Studio Experience (Map Section) */}
            <section id="map" className="py-20 px-6 md:px-12 lg:px-24 w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, ease: fastEase }}
                            className="font-heading text-4xl md:text-5xl text-foreground"
                        >
                            The Minimal Studio
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: 0.15, ease: fastEase }}
                            className="space-y-6 text-white/70 font-light text-lg"
                        >
                            <p>
                                101, Luxury Commerce Plaza,<br />
                                Sindhu Bhavan Road, Thaltej,<br />
                                Ahmedabad, Gujarat – 380054
                            </p>
                            <p className="text-sm border-l-2 border-[#C6A15B] pl-4 italic text-white/50">
                                Valet parking available. We recommend arriving 10 minutes prior to your scheduled consultation.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: 0.25, ease: fastEase }}
                        >
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-3 bg-transparent border border-[#C6A15B] text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#C6A15B] hover:text-[#050505] transition-all duration-300 hover:scale-[1.03]"
                            >
                                Get Directions <ArrowUpRight size={16} />
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, ease: fastEase }}
                        className="w-full h-[400px] md:h-[500px] rounded-[20px] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#121218]"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117498.05603706362!2d72.48483984666355!3d23.03076162391696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1709665547630!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4 – Visit Experience Block */}
            <section className="pt-8 pb-16 px-6 md:px-12 lg:px-24 w-full">
                <div className="max-w-7xl mx-auto w-full relative rounded-[20px] overflow-hidden group bg-[#121218] border border-white/5 shadow-2xl">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=80"
                            alt="Studio Environment"
                            className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent mix-blend-multiply" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, ease: fastEase }}
                        className="relative z-10 p-12 md:p-20 max-w-2xl"
                    >
                        <h2 className="font-heading text-3xl md:text-5xl text-white mb-6">
                            Visit our studio for a personalized consultation
                        </h2>
                        <div className="space-y-4 mb-10 text-white/50 font-light">
                            <p className="flex items-center gap-3"><Clock size={16} className="text-[#C6A15B]" /> Mon – Sat: 10:00 AM – 7:00 PM</p>
                            <p className="flex items-center gap-3"><span className="w-4 h-4 rounded-full border border-[#C6A15B] flex items-center justify-center text-[10px] pb-px text-[#C6A15B]"> i </span> Sunday available by exclusive appointment only.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
