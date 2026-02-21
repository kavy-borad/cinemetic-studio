
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
    className?: string;
    category?: string;
    text?: string;
}

const gradients: Record<string, string> = {
    wedding: "bg-gradient-to-br from-rose-900/50 via-slate-900 to-amber-900/50",
    "pre-wedding": "bg-gradient-to-br from-blue-900/50 via-slate-900 to-teal-900/50",
    engagement: "bg-gradient-to-br from-purple-900/50 via-slate-900 to-pink-900/50",
    "baby-shower": "bg-gradient-to-br from-emerald-900/50 via-slate-900 to-yellow-900/50",
    birthday: "bg-gradient-to-br from-orange-900/50 via-slate-900 to-red-900/50",
    corporate: "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800",
    product: "bg-gradient-to-br from-neutral-800 via-neutral-900 to-stone-800",
    default: "bg-gradient-to-br from-neutral-800 via-neutral-900 to-stone-800",
};

const PlaceholderImage = ({ className, category = "default", text }: PlaceholderImageProps) => {
    const gradientClass = gradients[category.toLowerCase()] || gradients.default;

    return (
        <div className={cn("w-full h-full flex items-center justify-center p-4 relative overflow-hidden", gradientClass, className)}>
            {/* Noise overlay for texture */}
            <div className="absolute inset-0 opacity-20 mixed-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Content */}
            <div className="text-center z-10 relative">
                <span className="text-white/20 font-heading text-4xl sm:text-6xl md:text-8xl select-none uppercase tracking-widest block opacity-50 mix-blend-overlay">
                    {text || category}
                </span>
                <div className="w-12 h-1 bg-white/10 mx-auto mt-4 rounded-full" />
            </div>

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 pointer-events-none" />
        </div>
    );
};

export default PlaceholderImage;
