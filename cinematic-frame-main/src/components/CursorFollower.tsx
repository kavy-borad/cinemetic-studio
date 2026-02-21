import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CursorFollowerProps {
    isHovering: boolean;
}

export const CursorFollower = ({ isHovering }: CursorFollowerProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY]);

    if (isMobile) return null;

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 w-20 h-20 rounded-full border border-[#C6A15B] pointer-events-none z-50 flex items-center justify-center mix-blend-difference",
                "transition-opacity duration-300"
            )}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                x: "-50%",
                y: "-50%",
                opacity: isHovering ? 1 : 0,
                scale: isHovering ? 1 : 0.5,
            }}
        >
            <span className="text-[#C6A15B] text-xs font-medium tracking-widest uppercase">
                View
            </span>
        </motion.div>
    );
};
