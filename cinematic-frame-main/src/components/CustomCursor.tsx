import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
    const [cursorVariant, setCursorVariant] = useState("default");
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleHoverStart = () => setCursorVariant("text");
        const handleHoverEnd = () => setCursorVariant("default");

        window.addEventListener("mousemove", moveCursor);

        const textElements = document.querySelectorAll("p, h1, h2, h3, span, li");
        const interactiveElements = document.querySelectorAll("a, button, input, textarea, .cursor-pointer");

        textElements.forEach((el) => {
            el.addEventListener("mouseenter", handleHoverStart);
            el.addEventListener("mouseleave", handleHoverEnd);
        });

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => setCursorVariant("hover"));
            el.addEventListener("mouseleave", () => setCursorVariant("default"));
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            textElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleHoverStart);
                el.removeEventListener("mouseleave", handleHoverEnd);
            });
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", () => setCursorVariant("hover"));
                el.removeEventListener("mouseleave", () => setCursorVariant("default"));
            });
        };
    }, []);

    const variants = {
        default: {
            height: 32,
            width: 32,
            backgroundColor: "rgba(198, 161, 91, 0.2)",
            border: "1px solid rgba(198, 161, 91, 0.5)",
            x: 0,
            y: 0,
        },
        text: {
            height: 64,
            width: 64,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            mixBlendMode: "difference" as const,
            x: -16,
            y: -16,
        },
        hover: {
            height: 64,
            width: 64,
            backgroundColor: "rgba(198, 161, 91, 0.4)", // Stronger gold
            border: "none",
            mixBlendMode: "difference" as const,
            x: -16,
            y: -16,
        },
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] backdrop-blur-[1px] hidden md:block" // Hidden on mobile
            style={{
                translateX: cursorX,
                translateY: cursorY,
            }}
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[#C6A15B] rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
};

export default CustomCursor;
