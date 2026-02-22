import React, { useState, useEffect, useCallback } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

import ServicesSection from "@/components/ServicesSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const [activePath, setActivePath] = useState("/");

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    // Find the entry that is mostly intersecting
    let maxVisible = null;
    let maxRatio = 0;

    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        maxVisible = entry.target.id;
      }
    }

    if (maxVisible) {
      if (maxVisible === "section-contact") setActivePath("/quote");
      else if (maxVisible === "section-services") setActivePath("/services");
      else if (maxVisible === "section-portfolio") setActivePath("/portfolio");
      else setActivePath("/"); // hero or about
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: [0.3, 0.6] // Notify when 30% or 60% of element is visible
    });

    const sections = ["section-hero", "section-about", "section-portfolio", "section-services", "section-contact"];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [handleIntersection]);

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
