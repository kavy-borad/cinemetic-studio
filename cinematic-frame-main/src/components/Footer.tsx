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

  const columnVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1], 
        delay 
      }
    })
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-32 pb-12 overflow-hidden border-t border-white/[0.05]">
      {/* Massive Cinematic Background Highlight / Light Leak */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)_/_0.15),transparent_70%)] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)_/_0.05),transparent_70%)] pointer-events-none z-0" />
      
      {/* Unique Background Marquee Layer */}
      <div className="absolute top-20 left-0 w-full pointer-events-none z-0 opacity-[0.02] select-none">
        <h2 className="text-[12vw] font-heading font-black whitespace-nowrap leading-none uppercase tracking-tighter animate-[marquee_60s_linear_infinite]">
          Cinematic Excellence • Timeless Storytelling • Editorial Vision • Cinematic Excellence • Timeless Storytelling
        </h2>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          
          {/* Brand Card - Luxury 3D Look */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={columnVariants}
            className="lg:col-span-5 p-10 md:p-14 bg-[#0A0A0F]/80 backdrop-blur-3xl border border-white/[0.05] rounded-[3rem] relative overflow-hidden group hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_50px_hsl(var(--primary)_/_0.15)] transition-all duration-700 ease-out cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-all duration-700 ease-out" />
            
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-4 mb-8 group/logo">
                <h2 className="font-heading text-3xl md:text-3xl lg:text-3xl tracking-[0.2em] text-white group-hover/logo:text-primary transition-colors duration-500 whitespace-nowrap">
                  PIXCEL STUDIO
                </h2>
                {/* Unit Red Cinematic Dot */}
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </div>
              </Link>

              <div className="space-y-4 max-w-lg">
                <p className="text-white/70 font-body font-light text-base leading-relaxed">
                  Transforming fleeting moments into <span className="italic text-white font-medium">Eternal Cinematic Masterpieces</span>.
                </p>
                <p className="text-white/40 font-body font-light text-sm leading-relaxed">
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
                links: [
                  { label: "Our Portfolio", path: "/portfolio" },
                  { label: "Elite Services", path: "/services" },
                  { label: "Our Legacy", path: "/about" },
                  { label: "Book a Session", path: "/contact" },
                ]
              },
              {
                title: "Cinematics",
                links: [
                  { label: "Wedding Stories", path: "/services" },
                  { label: "Cinematic Films", path: "/services" },
                  { label: "Drone Majesty", path: "/services" },
                  { label: "Editorial Shoots", path: "/services" },
                ]
              },
              {
                title: "Connect",
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
                custom={0.2 + idx * 0.15}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={columnVariants}
                className="p-8 md:p-10 bg-[#0A0A0F]/60 backdrop-blur-2xl border border-white/[0.03] rounded-[2.5rem] hover:-translate-y-2 hover:bg-[#0A0A0F]/90 hover:border-primary/30 hover:shadow-[0_15px_40px_hsl(var(--primary)_/_0.1)] transition-all duration-700 ease-out group cursor-pointer relative overflow-hidden"
              >
                {/* Glimmer Reveal Animation */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "200%" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12 pointer-events-none"
                />

                <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-10 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  {col.title}
                </h4>
                <ul className="space-y-5">
                  {col.links.map((link: any) => (
                    <li key={link.label}>
                      <a
                        href={link.path}
                        style={{ '--hover-color': link.color } as any}
                        className="text-white/40 hover:text-white hover:translate-x-2 transition-all duration-500 ease-out text-sm font-body font-light flex items-center gap-3 w-fit group/link"
                      >
                        {link.icon && (
                          <link.icon 
                            size={16} 
                            strokeWidth={1.5} 
                            className="text-primary/60 group-hover/link:text-[var(--hover-color)] transition-colors duration-500 flex-shrink-0" 
                          />
                        )}
                        <span className="relative">
                          {link.label}
                        </span>
                      </a>
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
          <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] font-bold text-white/40 uppercase">
            <p>© {currentYear} PIXCEL STUDIO</p>
            <div className="w-1.5 h-1.5 rounded-full bg-red-600/80 animate-pulse" />
            <p className="text-primary/80">Mastering The Craft</p>
          </div>
          
          <div className="flex gap-12 text-[10px] tracking-[0.2em] text-white/30 uppercase font-medium">
            <a href="#" className="hover:text-primary transition-colors duration-500">Digital Integrity</a>
            <a href="#" className="hover:text-primary transition-colors duration-500">Crafting Guidelines</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
