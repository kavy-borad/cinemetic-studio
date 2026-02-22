import { useNavigate } from "react-router-dom";
import { Camera, Video, Plane } from "lucide-react";

const services = [
    {
        title: "Wedding Photography",
        description: "Timeless visual storytelling.",
        icon: Camera
    },
    {
        title: "Cinematic Films",
        description: "Motion that moves hearts.",
        icon: Video
    },
    {
        title: "Drone Coverage",
        description: "Aerial perspectives.",
        icon: Plane
    }
];

const ServicesSection = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/services");
        window.scrollTo(0, 0);
    };

    return (
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-surface/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground mb-4">
                        Our services
                    </h2>
                    <p className="text-white/60 font-body text-base md:text-lg mb-6">
                        We provide complete visual coverage for every special moment.
                    </p>
                    <div className="w-12 h-[1px] bg-[#C6A15B]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                onClick={handleNavigation}
                                className="group relative bg-[#121218] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-[#C6A15B]/50 hover:bg-white/[0.02] cursor-pointer"
                            >
                                <div className="mb-6 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-[#C6A15B]/70 group-hover:text-[#C6A15B] group-hover:border-[#C6A15B]/60 transition-all duration-500">
                                    <Icon size={22} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-heading text-foreground/90 mb-3 group-hover:text-white transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-white/50 font-body text-sm font-light">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12 md:mt-16">
                    <button
                        onClick={handleNavigation}
                        className="inline-flex items-center gap-3 px-8 py-3 bg-transparent border border-[#C6A15B] text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#C6A15B] hover:text-[#050505] transition-all duration-300"
                    >
                        View All Services
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
