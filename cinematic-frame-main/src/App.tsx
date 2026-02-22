
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";
import PortfolioCategory from "./pages/PortfolioCategory";
import Album from "./pages/Album";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Index />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:category" element={<PortfolioCategory />} />
      <Route path="/album/:slug" element={<Album />} />
      <Route path="/services" element={<Services />} />
      <Route path="/quote" element={<Quote />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MotionConfig>
        <BrowserRouter>
          <SmoothScroll>
            <AppRoutes />
          </SmoothScroll>
        </BrowserRouter>
      </MotionConfig>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
