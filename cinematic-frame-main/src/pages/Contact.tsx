
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight, Instagram, Youtube, Facebook, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="bg-[#0B0B0E] min-h-screen text-white selection:bg-[#C6A15B]/30 flex flex-col overflow-hidden">
            <Navigation />

            {/* SECTION 1 – HERO */}
            <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 flex flex-col items-center justify-center text-center">
                {/* Visual Atmosphere */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#C6A15B]/5 blur-[150px] rounded-full" />
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="relative z-10 max-w-4xl mx-auto space-y-8"
                >
                    <motion.div variants={fadeInUp}>
                        <span className="inline-block text-[#C6A15B] text-xs font-bold tracking-[0.3em] uppercase mb-4">
                            Get In Touch
                        </span>
                        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6">
                            Let’s Create Something <br /> <span className="italic text-white/90">Beautiful Together</span>
                        </h1>
                        <p className="text-white/60 font-body text-lg md:text-xl font-light max-w-xl mx-auto">
                            Tell us about your event or visit our studio. We’d love to discuss your vision.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="flex flex-col items-center gap-8">
                        {/* Animated Divider */}
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent opacity-50" />

                        <Link
                            to="/quote"
                            className="group relative inline-flex items-center gap-3 px-10 py-4 border border-[#C6A15B] rounded-[10px] overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,161,91,0.2)]"
                        >
                            <span className="absolute inset-0 bg-[#C6A15B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <span className="relative z-10 font-body text-sm font-medium tracking-[0.2em] uppercase text-[#C6A15B] group-hover:text-[#0B0B0E] transition-colors duration-300">
                                Get Your Quote
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* SECTION 2 – CONTACT INFORMATION */}
            <section className="px-6 py-12 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="max-w-6xl mx-auto backdrop-blur-2xl bg-white/[0.02] border border-white/[0.06] rounded-[24px] p-8 md:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Email */}
                        <div className="group text-center space-y-4 hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-16 h-16 mx-auto rounded-full border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-[#0B0B0E] transition-all duration-500 shadow-[0_0_20px_rgba(198,161,91,0)] group-hover:shadow-[0_0_30px_rgba(198,161,91,0.3)]">
                                <Mail size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl text-white mb-2">Email Us</h3>
                                <a href="mailto:hello@pixcelstudio.com" className="text-white/60 hover:text-[#C6A15B] transition-colors font-body font-light">
                                    hello@pixcelstudio.com
                                </a>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="group text-center space-y-4 hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-16 h-16 mx-auto rounded-full border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-[#0B0B0E] transition-all duration-500 shadow-[0_0_20px_rgba(198,161,91,0)] group-hover:shadow-[0_0_30px_rgba(198,161,91,0.3)]">
                                <Phone size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl text-white mb-2">Call Us</h3>
                                <a href="tel:+919876543210" className="text-white/60 hover:text-[#C6A15B] transition-colors font-body font-light">
                                    +91 98765 43210
                                </a>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="group text-center space-y-4 hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-16 h-16 mx-auto rounded-full border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-[#0B0B0E] transition-all duration-500 shadow-[0_0_20px_rgba(198,161,91,0)] group-hover:shadow-[0_0_30px_rgba(198,161,91,0.3)]">
                                <MapPin size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl text-white mb-2">Visit Us</h3>
                                <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                                    PIXCEL STUDIO<br />
                                    101, Luxury Plaza,<br />
                                    Sindhu Bhavan Road,<br />
                                    Ahmedabad, Gujarat – 380054
                                </p>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="group text-center space-y-4 hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-16 h-16 mx-auto rounded-full border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-[#0B0B0E] transition-all duration-500 shadow-[0_0_20px_rgba(198,161,91,0)] group-hover:shadow-[0_0_30px_rgba(198,161,91,0.3)]">
                                <Clock size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl text-white mb-2">Working Hours</h3>
                                <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                                    Mon – Sat: 10:00 AM – 7:00 PM<br />
                                    <span className="text-[#C6A15B]">Sunday: By Appointment</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* SECTION 3 – LOCATION MAP */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10"
                        >
                            <MapPin size={14} className="text-[#C6A15B]" />
                            <span className="text-xs uppercase tracking-widest text-white/80">Visit Our Studio</span>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-[500px] rounded-[16px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 group"
                    >
                        {/* Embed Google Map or Placeholder */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117498.05603706362!2d72.48483984666355!3d23.03076162391696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1709665547630!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, opacity: 0.8 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        />
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0B0B0E] border border-[#C6A15B] text-[#C6A15B] uppercase text-xs font-bold tracking-widest rounded-full hover:bg-[#C6A15B] hover:text-[#0B0B0E] transition-all duration-300"
                            >
                                Get Directions <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4 – SOCIAL & TRUST */}
            <section className="py-20 border-t border-white/5 bg-[#0B0B0E]">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C6A15B]">Follow Us</h4>
                        <div className="flex justify-center gap-8">
                            {[
                                { icon: Instagram, label: "Instagram" },
                                { icon: Youtube, label: "Youtube" },
                                { icon: Facebook, label: "Facebook" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="group flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
                                >
                                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C6A15B] group-hover:text-[#C6A15B] transition-all duration-300 group-hover:scale-110">
                                        <social.icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {social.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/30 text-xs uppercase tracking-widest font-light"
                    >
                        <span>Response within 24 hours</span>
                        <span className="hidden md:inline text-[#C6A15B]">•</span>
                        <span>Serving clients across India</span>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 5 – FINAL CTA */}
            <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#0B0B0E] to-[#121218]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C6A15B]/5 blur-[100px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8"
                >
                    <h2 className="font-heading text-4xl md:text-6xl text-white">Ready to Book Your Date?</h2>
                    <p className="text-white/60 text-lg font-light max-w-lg mx-auto">
                        Let’s discuss your event and create a personalized experience tailored just for you.
                    </p>

                    <div className="pt-4">
                        <Link
                            to="/quote"
                            className="inline-flex items-center gap-3 px-12 py-5 bg-[#C6A15B] text-[#0B0B0E] font-bold tracking-[0.2em] uppercase rounded-[12px] hover:scale-105 hover:bg-white transition-all duration-300 shadow-[0_20px_40px_rgba(198,161,91,0.2)]"
                        >
                            Get Your Quote
                        </Link>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
