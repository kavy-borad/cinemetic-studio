import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

interface NavigationProps {
  activePath?: string;
}

const Navigation = ({ activePath }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const currentPath = activePath || location.pathname;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? "bg-background/90 backdrop-blur-md border-b border-border"
        : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-5">
        <Link to="/" className="font-heading text-xl md:text-2xl tracking-editorial text-foreground drop-shadow-md">
          PIXCEL STUDIO
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs tracking-luxury uppercase font-body font-light transition-colors duration-500 drop-shadow-sm ${currentPath === link.path
                ? "text-primary font-medium"
                : isScrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/90 hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/quote"
            className={`text-xs tracking-luxury uppercase font-body font-light border px-6 py-2.5 rounded-lg transition-all duration-500 backdrop-blur-sm shadow-sm ${isScrolled
              ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              : "border-white/30 text-white bg-white/5 hover:bg-white/20 hover:border-white"
              }`}
          >
            Get Your Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-foreground"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-luxury uppercase font-body font-light transition-colors duration-500 ${currentPath === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
