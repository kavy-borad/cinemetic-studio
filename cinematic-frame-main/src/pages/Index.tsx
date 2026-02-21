import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

import ServicesSection from "@/components/ServicesSection";
import PortfolioGrid from "@/components/PortfolioGrid";

import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const [activePath, setActivePath] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const bottomPosition = window.innerHeight + window.scrollY;

      const heroSection = document.getElementById("section-hero");
      const aboutSection = document.getElementById("section-about");
      const servicesSection = document.getElementById("section-services");
      const portfolioSection = document.getElementById("section-portfolio");
      const contactSection = document.getElementById("section-contact");

      if ((contactSection && scrollPosition >= contactSection.offsetTop) || (bottomPosition >= document.body.offsetHeight - 50)) {
        setActivePath("/quote");
      } else if (servicesSection && scrollPosition >= servicesSection.offsetTop) {
        setActivePath("/services");
      } else if (portfolioSection && scrollPosition >= portfolioSection.offsetTop) {
        setActivePath("/portfolio");
      } else if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActivePath("/"); // effectively home/about
      } else {
        setActivePath("/");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <Navigation activePath={activePath} />
      <div id="section-hero">
        <HeroSection />
      </div>
      <div id="section-about">
        <AboutSection />
      </div>

      <div id="section-portfolio">
        <PortfolioGrid />
      </div>
      <div id="section-services">
        <ServicesSection />
      </div>

      <div id="section-contact">
        <CTASection />
      </div>
      <Footer />
    </main>
  );
};

export default Index;
