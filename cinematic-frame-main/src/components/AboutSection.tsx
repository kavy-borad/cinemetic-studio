
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Camera, Clock, Heart } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";

const AboutSection = () => {
    const { ref, isVisible } = useScrollReveal(0.2);

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Side: Image */}
                    <div
                        ref={ref}
                        className={`relative opacity-0 ${isVisible ? "animate-cinematic-fade-in" : ""}`}
                        style={{ transitionDelay: "0.2s" }}
                    >
                        <div className="relative overflow-hidden rounded-xl group">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2787&auto=format&fit=crop"
                                alt="Cinematic Portrait"
                                className="w-full h-[600px] object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                            />
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div
                        className={`space-y-8 opacity-0 ${isVisible ? "animate-cinematic-reveal-up" : ""}`}
                        style={{ animationDelay: "0.4s" }}
                    >
                        <div className="space-y-4">

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground leading-tight">
                                About Us
                            </h2>
                        </div>

                        <div className="space-y-6 text-muted-foreground font-body leading-relaxed font-light">
                            <p>
                                We believe that photography is more than just taking pictures; it’s about freezing time and preserving the raw emotions that define your most special moments. With a passion for cinematic storytelling, we craft visual narratives that transcend the ordinary.
                            </p>
                            <p>
                                Our approach is rooted in the art of observation. We don't just document events; we look for the subtle glances, the tearful smiles, and the unscripted joy that truly tell your story. Every frame is composed with an artist's eye and a storyteller's heart.
                            </p>
                            <p>
                                With years of experience documenting love stories and grand celebrations, we bring a calm, professional presence to every event, ensuring you feel comfortable and authentic in front of the lens.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link
                                to="/quote"
                                className="inline-block bg-transparent border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-black font-body text-sm font-medium tracking-widest uppercase px-12 py-4 rounded-[10px] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(198,161,91,0.3)] hover:scale-[1.02]"
                            >
                                Get Your Quote
                            </Link>
                        </div>

                        {/* Highlights */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                            {[
                                { label: "Total Weddings", value: "150+", icon: Heart },
                                { label: "Happy Clients", value: "500+", icon: Camera },
                                { label: "Years Experience", value: "10+", icon: Clock }
                            ].map((item, idx) => (
                                <div key={idx} className="group cursor-default text-center md:text-left">
                                    <item.icon className="w-5 h-5 text-primary mb-2 mx-auto md:mx-0 opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <h4 className="text-xl md:text-2xl font-heading text-foreground group-hover:text-primary transition-colors duration-300">
                                        {item.value}
                                    </h4>
                                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mt-1">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
