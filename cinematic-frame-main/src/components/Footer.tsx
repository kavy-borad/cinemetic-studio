import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WhatsAppIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const columnVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1], 
        delay 
      }
    })
  };

  return (
    <footer ref={footerRef} className="relative bg-[#050505] text-white pt-24 pb-12 overflow-hidden border-t border-white/[0.02]">
      {/* Unique Background Marquee Layer */}
      <div className="absolute top-1/4 left-0 w-full pointer-events-none z-0 opacity-[0.03] select-none">
        <motion.h2 
          style={{ x: marqueeX }}
          className="text-[20vw] font-heading font-black whitespace-nowrap leading-none uppercase tracking-tighter"
        >
          Cinematic Excellence • Timeless Storytelling • Editorial Vision •
        </motion.h2>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          
          {/* Brand Card - Luxury 3D Look */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -10, scale: 1.01 }}
            viewport={{ once: true, margin: "-100px" }}
            variants={columnVariants}
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
            className="lg:col-span-5 p-10 md:p-14 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700" />
            
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-4 mb-8 group/logo">
                <h2 className="font-heading text-3xl md:text-3xl lg:text-3xl tracking-[0.2em] text-white group-hover/logo:text-primary transition-all duration-500 whitespace-nowrap">
                  PIXCEL STUDIO
                </h2>
                {/* Unit Red Cinematic Dot */}
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </div>
              </Link>

              <div className="space-y-4 max-w-lg">
                <p className="text-white/50 font-body font-light text-base leading-relaxed">
                  Transforming fleeting moments into <span className="italic text-white/80 font-medium">Eternal Cinematic Masterpieces</span>.
                </p>
                <p className="text-white/30 font-body font-light text-sm leading-relaxed">
                  We don't just record; we curate your unique legacy with unmatched editorial precision and artistic soul.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Grid - Floating Style */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Explore",
                parallax: -50,
                links: [
                  { label: "Our Portfolio", path: "/portfolio" },
                  { label: "Elite Services", path: "/services" },
                  { label: "Our Legacy", path: "/about" },
                  { label: "Book a Session", path: "/contact" },
                ]
              },
              {
                title: "Cinemetics",
                parallax: -80,
                links: [
                  { label: "Wedding Stories", path: "/services" },
                  { label: "Cinematic Films", path: "/services" },
                  { label: "Drone Majesty", path: "/services" },
                  { label: "Editorial Shoots", path: "/services" },
                ]
              },
              {
                title: "Connect",
                parallax: -30,
                links: [
                  { label: "Instagram", path: "#", icon: Instagram, color: "#E4405F" },
                  { label: "Facebook", path: "#", icon: Facebook, color: "#1877F2" },
                  { label: "Youtube", path: "#", icon: Youtube, color: "#FF0000" },
                  { label: "WhatsApp", path: "#", icon: WhatsAppIcon, color: "#25D366" },
                ]
              }
            ].map((col, idx) => (
              <motion.div
                key={col.title}
                custom={0.1 + idx * 0.1}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true, margin: "-100px" }}
                variants={columnVariants}
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, col.parallax]) }}
                className="p-8 md:p-10 bg-white/[0.01] backdrop-blur-xl border border-white/[0.03] rounded-[2.5rem] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-500 group shadow-lg cursor-pointer relative overflow-hidden"
              >
                {/* Glimmer Reveal Animation */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "200%" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 pointer-events-none"
                />

                <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-10 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  {col.title}
                </h4>
                <ul className="space-y-5">
                  {col.links.map((link: any) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.path}
                        initial={{ opacity: 0.4 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ margin: "-50px" }}
                        style={{ '--hover-color': link.color } as any}
                        className="text-white/40 hover:text-white hover:translate-x-2 transition-all duration-500 text-sm font-body font-light flex items-center gap-3 w-fit group"
                      >
                        {link.icon && (
                          <link.icon 
                            size={16} 
                            strokeWidth={1.5} 
                            className="text-primary/60 group-hover:text-[var(--hover-color)] transition-all duration-500 flex-shrink-0" 
                          />
                        )}
                        <span className="relative">
                          {link.label}
                        </span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Ultra Clean */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/[0.05]"
        >
          <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] font-bold text-white/20 uppercase">
            <p>© {currentYear} PIXCEL STUDIO</p>
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <p>Mastering The Craft</p>
          </div>
          
          <div className="flex gap-12 text-[10px] tracking-[0.2em] text-white/20 uppercase font-medium">
            <a href="#" className="hover:text-primary transition-colors">Digital Integrity</a>
            <a href="#" className="hover:text-primary transition-colors">Crafting Guidelines</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
