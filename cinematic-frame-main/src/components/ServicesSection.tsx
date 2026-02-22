import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useServices } from "@/hooks/useServices";

const FALLBACK_SERVICES = [
    "Wedding Photography",
    "Engagement",
    "Cinematic Films",
    "Corporate Events",
];

const ServicesSection = () => {
    const { ref, isVisible } = useScrollReveal();
    const navigate = useNavigate();
    const { data: apiServices } = useServices();

    const services = (apiServices && apiServices.length > 0)
        ? apiServices.slice(0, 4).map((s) => s.name)
        : FALLBACK_SERVICES;

    return (
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-surface/30">
            <div
                ref={ref}
                className={`max-w-7xl mx-auto opacity-0 ${isVisible ? "animate-cinematic-reveal-up" : ""}`}
            >
                <div className="text-center mb-16">
                    <span className="text-primary text-xs font-medium tracking-editorial uppercase block mb-4">
                        Our Expertise
                    </span>
                    <h2 className="text-3xl md:text-5xl font-heading text-foreground">
                        Curated Services
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            onClick={() => navigate("/services")}
                            className="group relative bg-[#121218] border border-white/5 rounded-[12px] p-10 flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-primary/50 hover:bg-white/[0.02] cursor-pointer"
                        >
                            <h3 className="text-xl font-heading text-foreground/90 group-hover:text-primary transition-colors duration-300">
                                {service}
                            </h3>
                            <div className="w-0 h-[1px] bg-primary mt-4 group-hover:w-12 transition-all duration-500 ease-out" />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate("/services")}
                        className="text-xs tracking-editorial uppercase border-b border-white/20 text-muted-foreground pb-1 hover:text-primary hover:border-primary transition-all duration-300"
                    >
                        View All Services
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
