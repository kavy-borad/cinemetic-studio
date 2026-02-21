import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CinematicFrameProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

export const CinematicFrame = ({ children, className, ...props }: CinematicFrameProps) => {
    return (
        <div
            className={cn(
                // MANDATORY GLOBAL STYLES (The "Global Radius System")
                "relative rounded-xl overflow-hidden bg-[#121218]",

                // Default border optimization for dark mode
                "border border-white/5",

                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
