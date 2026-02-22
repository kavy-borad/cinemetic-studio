import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, AnimatePresence } from "framer-motion";
import { Camera, Video, Plane, BookOpen, Radio, Sparkles, ArrowRight, Clock, Film, Smartphone, HardDrive, Mic, RefreshCw } from "lucide-react";

const mainServices = [
  {
    title: "Wedding Photography",
    description: "Timeless visual storytelling.",
    icon: Camera,
    bgImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Cinematic Films",
    description: "Motion that moves hearts.",
    icon: Video,
    bgImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Drone Coverage",
    description: "Aerial perspectives.",
    icon: Plane,
    bgImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Photo Albums",
    description: "Handcrafted heirlooms.",
    icon: BookOpen,
    bgImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Live Streaming",
    description: "Share moments globally.",
    icon: Radio,
    bgImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Pre-Wedding Shoots",
    description: "Capture the romance.",
    icon: Sparkles,
    bgImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
  }
];

const signatureEnhancements = [
  {
    title: "Same Day Edit (SDE)",
    description: "Wedding highlights edited and presented on the same day.",
    icon: Clock,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Cinematic Trailer",
    description: "1–2 minute dramatic wedding teaser with cinematic storytelling.",
    icon: Film,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Instagram Reels Pack",
    description: "3–5 vertical reels optimized for social media sharing.",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Full Raw Footage",
    description: "Complete unedited photos and videos in high quality.",
    icon: HardDrive,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Couple Interview Film",
    description: "A beautifully shot love story interview with cinematic visuals.",
    icon: Mic,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "360° Video Booth",
    description: "Dynamic rotating slow-motion booth for fun wedding moments.",
    icon: RefreshCw,
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=800&q=80"
  }
];

const coverageFeatures = [
  {
    title: "Artistic Vision",
    description: "Crafting visually stunning and emotionally resonant narratives.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "Multi-Camera Setup",
    description: "Comprehensive coverage from multiple dynamic angles.",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "High-End Equipment",
    description: "Utilizing industry-leading gear for cinematic quality.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "Creative Direction",
    description: "Guided posing and scenario planning for perfect shots.",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "Seamless Editing Workflow",
    description: "Meticulous post-production for flawless final delivery.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "Timely Delivery",
    description: "Prompt and reliable turnover of your precious memories.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=2000&q=80"
  }
];

// Custom Cursor Component
const CustomCursor = ({ isVisible, position }: { isVisible: boolean; position: { x: number; y: number } }) => {
  return (
    <motion.div
      animate={{
        x: position.x - 60,
        y: position.y - 60,
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5
      }}
      transition={{ type: "spring", damping: 40, stiffness: 200 }}
      className="fixed w-[120px] h-[120px] pointer-events-none z-50 rounded-full"
      style={{
        left: 0,
        top: 0,
        background: 'radial-gradient(circle, rgba(198,161,91,0.5) 0%, rgba(198,161,91,0.1) 50%, transparent 70%)',
        filter: 'blur(10px)',
        mixBlendMode: 'plus-lighter'
      }}
    />
  );
};

// Counter Animation Component
const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Service Card Component
const ServiceCard = ({ service, index, onHover, onLeave }: any) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative bg-[#121218] border border-[#1E1E26] rounded-[14px] p-8 text-center transition-all duration-500 hover:border-[rgba(198,161,91,0.6)] group overflow-hidden cursor-none z-0 hover:z-20"
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
      }}
    >
      {/* Background Image on Hover */}
      <div
        className="absolute inset-0 transition-all duration-700 opacity-0 group-hover:opacity-15 group-hover:scale-110"
        style={{
          backgroundImage: `url(${service.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B]/60 transition-all duration-400"
          whileHover={{ scale: 1.2 }}
        >
          <Icon size={28} strokeWidth={1.5} className="group-hover:text-[#C6A15B] transition-colors duration-400" />
        </motion.div>
        <h3 className="font-heading text-2xl text-foreground mb-3 tracking-tight">
          {service.title}
        </h3>
        <p className="text-white/50 font-body text-sm font-light">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

// 3D Tilt Card with Halogen Glare Effect
const TiltCard = ({ addon, index }: { addon: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex-shrink-0 w-72 rounded-[14px] cursor-pointer group snap-center perspective-1000"
    >
      <motion.div
        style={{
          filter: `brightness(${brightness})`,
          transform: "translateZ(20px)"
        }}
        className="relative h-64 overflow-hidden rounded-[13px] border border-[#1E1E26] group-hover:border-[#C6A15B]/50 transition-colors duration-300 shadow-2xl"
      >
        <motion.img
          src={addon.image}
          alt={addon.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Halogen Glare Effect */}
        <motion.div
          style={{
            background: useTransform(
              mouseX,
              [-0.5, 0.5],
              [
                "linear-gradient(to right, transparent 0%, rgba(255,255,255,0) 0%, transparent 100%)",
                "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)"
              ]
            ),
            x: useTransform(mouseX, [-0.5, 0.5], ["-100%", "100%"]),
            opacity: useTransform(mouseY, [-0.5, 0.5], [0, 0.6])
          }}
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay w-[200%] h-full -left-1/2"
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-z-10">
          <h3 className="font-heading text-2xl text-white drop-shadow-md">{addon.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const parallaxRef = useRef<HTMLElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Global mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at top, rgba(198,161,91,0.06), transparent 50%), #0B0B0E'
      }}
    >
      <CustomCursor isVisible={cursorVisible} position={cursorPosition} />
      <Navigation />

      {/* SECTION 1 – MODERN INTRO */}
      <section className="pt-40 pb-20 md:pb-32 px-6 md:px-12 lg:px-24 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.span
            initial={{ letterSpacing: "0.3em" }}
            animate={{ letterSpacing: "0.2em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[#C6A15B] text-xs font-medium uppercase block font-body"
          >
            What We Offer
          </motion.span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-foreground tracking-tight">
            Our Services
          </h1>
          <p className="text-white/60 font-body font-light text-lg max-w-2xl mx-auto leading-relaxed">
            We provide complete visual coverage for every special moment.
          </p>

          {/* Thin gold divider */}
          <div className="h-px w-24 bg-[#C6A15B]/40 mx-auto mt-8" />
        </motion.div>
      </section>

      {/* SECTION 2 – FEATURE GRID */}
      <section className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                onHover={() => setCursorVisible(true)}
                onLeave={() => setCursorVisible(false)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 – PREMIUM INTERACTIVE VISUAL EXPERIENCE */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
        {/* Dynamic Background */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={coverageFeatures[activeFeature].image}
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[#C6A15B] font-body text-sm tracking-[0.3em] uppercase mb-4">
                The Pixel Experience
              </h2>
              <h3 className="font-heading text-6xl md:text-8xl text-white leading-[0.9] mb-6">
                The Pixel <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A15B] to-[#E5D5A6]">
                  Experience.
                </span>
              </h3>
              <p className="text-white/70 font-body font-light text-xl max-w-md leading-relaxed">
                We don't just capture moments; we curate memories. Experience a seamless blend of technical precision and artistic vision that ensures every detail of your event is preserved elegantly.
              </p>
            </motion.div>
          </div>

          {/* Right Interactive List */}
          <div className="flex flex-col space-y-4">
            {coverageFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveFeature(index)}
                className={`group relative p-6 cursor-pointer border-l-2 transition-all duration-500 ${activeFeature === index
                  ? "border-[#C6A15B] bg-white/5"
                  : "border-white/10 hover:border-white/30"
                  }`}
              >
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <h4
                      className={`font-heading text-3xl transition-colors duration-300 ${activeFeature === index ? "text-white" : "text-white/40 group-hover:text-white/80"
                        }`}
                    >
                      {feature.title}
                    </h4>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeFeature === index ? "auto" : 0,
                        opacity: activeFeature === index ? 1 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#C6A15B] font-body font-light text-sm mt-2">
                        {feature.description}
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    animate={{
                      rotate: activeFeature === index ? 0 : -45,
                      opacity: activeFeature === index ? 1 : 0.2
                    }}
                  >
                    <ArrowRight className="text-[#C6A15B]" size={24} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 – SIGNATURE ENHANCEMENTS */}
      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-4">
              Signature Enhancements
            </h2>
            <p className="text-white/60 font-body text-lg max-w-2xl mx-auto">
              Elevate your wedding experience with exclusive add-on services.
            </p>
          </motion.div>

          {/* 2 Column Grid for Enhancements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {signatureEnhancements.map((enhancement, index) => {
              const Icon = enhancement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative h-80 md:h-[350px] border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_20px_60px_rgba(198,161,91,0.2)] hover:-translate-y-2 hover:border-[#C6A15B]/50 cursor-pointer"
                >
                  <img
                    src={enhancement.image}
                    alt={enhancement.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  />

                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10 transition-transform duration-500 transform group-hover:-translate-y-2">
                    <div className="bg-black/30 backdrop-blur-md w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6 group-hover:border-[#C6A15B]/80 group-hover:bg-[#C6A15B]/20 transition-all duration-500">
                      <Icon className="text-white group-hover:text-[#C6A15B] transition-colors duration-500" size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-heading text-white mb-3 group-hover:text-[#C6A15B] transition-colors duration-400">
                        {enhancement.title}
                      </h3>
                      <p className="text-white/70 font-body text-base font-light leading-relaxed group-hover:text-white transition-colors duration-400">
                        {enhancement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 – TRUST BLOCK with Counter */}
      <section className="px-6 md:px-12 lg:px-24 pb-24 bg-[#050505]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto border-t border-white/5 pt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-heading text-[#C6A15B] mb-2">
                <Counter end={500} suffix="+" />
              </div>
              <p className="text-white/50 font-body text-sm uppercase tracking-wide">Events Covered</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-heading text-[#C6A15B] mb-2">
                <Counter end={10} suffix="+" />
              </div>
              <p className="text-white/50 font-body text-sm uppercase tracking-wide">Years Experience</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-heading text-[#C6A15B] mb-2">
                <Counter end={24} suffix="h" />
              </div>
              <p className="text-white/50 font-body text-sm uppercase tracking-wide">Response Time</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 6 – CONVERSION CTA */}
      <section className="px-6 md:px-12 lg:px-24 py-32">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.01 }}
          className="max-w-4xl mx-auto rounded-2xl p-16 md:p-20 text-center border border-[#1E1E26]"
          style={{
            background: 'linear-gradient(180deg, #121218, #0B0B0E)',
            boxShadow: '0 60px 150px rgba(0,0,0,0.8)'
          }}
        >
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8 tracking-tight">
            Let's Plan Your Event
          </h2>
          <p className="text-white/60 font-body text-lg mb-10 max-w-2xl mx-auto">
            Share your vision with us and get a personalized quote within 24 hours.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/quote"
              className="inline-block bg-transparent border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-black font-body text-sm font-medium tracking-widest uppercase px-12 py-4 rounded-[10px] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(198,161,91,0.3)] hover:scale-[1.02]"
            >
              Get Your Quote
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
