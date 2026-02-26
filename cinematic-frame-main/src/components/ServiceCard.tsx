import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CinematicFrame } from "@/components/CinematicFrame";

interface ServiceCardProps {
    title: string;
    description: string;
    index: number;
    onHoverStart: () => void;
    onHoverEnd: () => void;
    isBlurred: boolean;
}

export const ServiceCard = ({
    title,
    description,
    index,
    onHoverStart,
    onHoverEnd,
    isBlurred,
}: ServiceCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["4deg", "-4deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-4deg", "4deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;

        const xPct = (mouseXRel / width) - 0.5;
        const yPct = (mouseYRel / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        onHoverEnd();
    };

    return (
        <motion.div
            style={{
                perspective: 1000,
                filter: isBlurred ? "blur(2px)" : "blur(0px)",
                opacity: isBlurred ? 0.4 : 1,
                transition: "all 0.4s ease-out",
            }}
            className="h-full"
            onMouseEnter={onHoverStart}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                ref={ref}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                variants={{
                    hover: { scale: 1.02 }
                }}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="h-full"
            >
                <CinematicFrame className="h-full relative overflow-hidden group border border-[#1E1E26] hover:border-[#C6A15B]/50 transition-all duration-500 bg-[#121218] hover:shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
                    {/* Radial Glow on Hover */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="p-12 h-full flex flex-col items-center justify-center text-center relative z-10">
                        <motion.h3
                            variants={{
                                hover: { y: -10 }
                            }}
                            transition={{ duration: 0.1 }}
                            className="text-2xl md:text-3xl font-heading text-foreground group-hover:text-primary transition-colors duration-300 mb-2"
                        >
                            {title}
                        </motion.h3>

                        {/* Reveal Content */}
                        <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                            <motion.div
                                variants={{
                                    initial: { opacity: 0, y: 20 },
                                    hover: { opacity: 1, y: 0 }
                                }}
                                initial="initial"
                                whileHover="hover"
                                transition={{ duration: 0.1, delay: 0.05 }}
                                className="pt-4 flex flex-col items-center gap-4"
                            >
                                <p className="text-sm text-muted-foreground font-light max-w-[200px] font-body">
                                    {description}
                                </p>
                                <ArrowUpRight className="text-[#C6A15B] w-5 h-5" />
                            </motion.div>
                        </div>
                    </div>
                </CinematicFrame>
            </motion.div>
        </motion.div>
    );
};
