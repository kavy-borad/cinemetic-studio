import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] text-white pt-16 pb-8 overflow-hidden border-t border-white/5">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B]/50 to-transparent opacity-50" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">

          {/* Brand Column - Wider */}
          <div className="md:col-span-4 lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block group">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight text-white group-hover:text-[#C6A15B] transition-colors duration-500">
                PIXCEL STUDIO
              </h2>
            </Link>
            <p className="text-white/40 font-body font-light text-base leading-relaxed max-w-md">
              Crafting cinematic visual narratives that capture the essence of your most precious moments with timeless elegance and artistic precision.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1 lg:col-span-1" />

          {/* Navigation Columns */}
          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-12">

            {/* Explore */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C6A15B] mb-8">Explore</h4>
              <ul className="space-y-4">
                {[
                  { label: "Portfolio", path: "/portfolio" },
                  { label: "Services", path: "/services" },
                  { label: "About Us", path: "/about" },
                  { label: "Journal", path: "/journal" },
                  { label: "Contact", path: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm font-body font-light block w-fit"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C6A15B] mb-8">Services</h4>
              <ul className="space-y-4">
                {[
                  "Wedding Photography",
                  "Cinematic Films",
                  "Pre-Wedding",
                  "Editorials",
                  "Destination",
                ].map((service) => (
                  <li key={service}>
                    <span className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-body font-light cursor-default">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials & Newsletter */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C6A15B] mb-8">Social</h4>
              <ul className="space-y-4">
                {[
                  { label: "Instagram", icon: Instagram },
                  { label: "Facebook", icon: Facebook },
                  { label: "Youtube", icon: Youtube },
                  { label: "Twitter", icon: Twitter },
                ].map((social) => (
                  <li key={social.label}>
                    <a
                      href="#"
                      className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm font-body font-light"
                    >
                      <social.icon size={16} className="group-hover:text-[#C6A15B] transition-colors" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>



        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-[10px] md:text-xs text-white/30 font-body uppercase tracking-wider font-light border-t border-white/5">
          <p>© {currentYear} PIXCEL STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
