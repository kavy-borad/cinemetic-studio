
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useQuoteStore } from "@/store/quoteStore";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Clock, Users, Star } from "lucide-react";
import { z } from "zod";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSubmitQuotation } from "@/hooks/useQuotation";

const eventTypes = ["Wedding", "Pre-Wedding", "Engagement", "Reception", "Baby Shower", "Birthday", "Corporate", "Other"];
const serviceOptions = [
  "Photography", "Cinematic Video", "Drone", "Album", "Live Streaming"
];
const budgetRanges = ["< ₹50,000", "₹50,000 - ₹1,00,000", "₹1,00,000 - ₹3,00,000", "₹3,00,000 - ₹5,00,000", "₹5,00,000+"];
const weddingFunctionsList = [
  "Engagement", "Mandvo", "Pithi / Haldi", "Mehendi", "Garba / Sangeet", "Wedding Ceremony", "Reception", "Vana Rasam"
];

// Input Field Component - Redesigned
const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required = false,
  maxLength
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
}) => (
  <div className="group w-full">
    <label className="block text-xs tracking-editorial uppercase font-body text-muted-foreground/60 mb-3 transition-colors group-focus-within:text-primary">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full bg-[#0F0F14] border border-[#1E1E26] rounded-[10px] h-[56px] px-6 text-foreground font-body text-base outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(198,161,91,0.15)] transition-all duration-300 placeholder:text-[#6B6B76]`}
      />
    </div>
    {error && <p className="text-destructive text-xs mt-2 font-light tracking-wide">{error}</p>}
  </div>
);

// Select Field Component - Redesigned
const SelectField = ({
  label,
  value,
  onChange,
  options,
  error
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
}) => (
  <div className="w-full">
    <label className="block text-xs tracking-editorial uppercase font-body text-muted-foreground/60 mb-4 transition-colors">
      {label}
    </label>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`h-[56px] flex items-center justify-center text-center text-sm tracking-wide font-body px-4 rounded-[10px] border transition-all duration-300 ${value === opt
            ? "border-primary text-primary bg-[rgba(198,161,91,0.08)] shadow-[0_0_20px_rgba(198,161,91,0.15)]"
            : "border-[#1E1E26] bg-[#0F0F14] text-muted-foreground/70 hover:border-white/20 hover:text-white hover:bg-[#121218]"
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
    {error && <p className="text-destructive text-xs mt-2">{error}</p>}
  </div>
);

const Quote = () => {
  const { step, data, setStep, setField, reset } = useQuoteStore();
  const { ref, isVisible } = useScrollReveal();
  const totalSteps = 4;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutateAsync: postQuotation } = useSubmitQuotation();

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!data.name) newErrors.name = "Name is required";

      if (!data.phone) {
        newErrors.phone = "Mobile number is required";
      } else if (data.phone.length !== 10) {
        newErrors.phone = "Mobile number must be exactly 10 digits";
      }

      if (!data.email) {
        newErrors.email = "Email address is required";
      } else if (!data.email.includes("@") || !data.email.includes(".")) {
        newErrors.email = "Please enter a valid email address with @ and .";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 400, behavior: 'auto' });
    }
  };

  const handleSubmit = async () => {
    // POST to backend (non-blocking - PDF still generates on error)
    try {
      await postQuotation({
        name: data.name,
        email: data.email || undefined,
        phone: data.phone,
        city: data.city || undefined,
        eventType: data.eventType || undefined,
        eventDate: data.eventType === "Wedding" && data.eventEndDate ? `${data.eventDate} to ${data.eventEndDate}` : data.eventDate || undefined,
        venue: data.venue || undefined,
        guestCount: data.guestCount || undefined,
        functions: data.eventType === "Wedding" ? data.weddingFunctions?.join(", ") : undefined,
        servicesRequested: data.services.length > 0 ? data.services : undefined,
        budget: data.budget || undefined,
        requirements: data.requirements || undefined,
      });
      toast.success("Consultation request received.", {
        duration: 1500,
        className: "bg-background border-primary text-foreground"
      });
    } catch {
      toast.error("Could not save your request online, but your PDF quote is ready.", {
        duration: 1500,
      });
    }

    setIsSubmitted(true);

    // --------------------------------------------------------------------------
    // GENERATE ENTERPRISE LEVEL PDF QUOTATION (PIXEL STUDIO)
    // --------------------------------------------------------------------------
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const primaryDark: [number, number, number] = [17, 17, 17]; // #111111
    const accentGold: [number, number, number] = [200, 162, 77]; // #C8A24D
    const bgLightGray: [number, number, number] = [247, 247, 247]; // #F7F7F7
    const textGray: [number, number, number] = [100, 100, 100];
    const textLightGray: [number, number, number] = [160, 160, 160];

    // Margins (20mm Left/Right, 25mm Top/Bottom)
    const marginX = 20;
    let yPos = 25;

    // --- 1. HEADER SECTION ---

    // Background Strip
    doc.setFillColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.rect(0, 0, pageWidth, 45, "F");

    // Left: Company Name
    doc.setTextColor(accentGold[0], accentGold[1], accentGold[2]);
    doc.setFont("times", "bold"); // Using 'times' as elegant serif fallback
    doc.setFontSize(26);
    doc.text("PIXEL STUDIO", marginX, 22);

    // Subtitle
    doc.setTextColor(220, 220, 220);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Cinematic Stories Crafted for Every Celebration", marginX, 30);

    // Right: Document Info
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("QUOTATION ESTIMATE", pageWidth - marginX, 20, { align: "right", charSpace: 1 });

    const currentDate = new Date().toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' });
    const refId = `PXC-${Math.floor(10000 + Math.random() * 90000)}`;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(180, 180, 180);
    doc.text(`DATE: ${currentDate.toUpperCase()}`, pageWidth - marginX, 28, { align: "right" });
    doc.text(`REF ID: ${refId}`, pageWidth - marginX, 33, { align: "right" });

    // Separation Line
    doc.setDrawColor(accentGold[0], accentGold[1], accentGold[2]);
    doc.setLineWidth(0.5);
    doc.line(0, 45, pageWidth, 45);

    yPos = 60;

    // --- 2. CLIENT & EVENT DETAILS (Two-Column Grid) ---

    const colWidth = (pageWidth - (marginX * 2) - 10) / 2; // 10mm gap between columns

    // Left Card: BILL TO / CLIENT INFO
    doc.setFillColor(bgLightGray[0], bgLightGray[1], bgLightGray[2]);
    doc.rect(marginX, yPos, colWidth, 42, "F");

    // Top Gold Accent Border
    doc.setDrawColor(accentGold[0], accentGold[1], accentGold[2]);
    doc.setLineWidth(1);
    doc.line(marginX, yPos, marginX + colWidth, yPos);

    // Client Title
    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("BILL TO / CLIENT INFO", marginX + 6, yPos + 8, { charSpace: 0.5 });

    // Client Content
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textLightGray[0], textLightGray[1], textLightGray[2]);
    doc.text("Name:", marginX + 6, yPos + 16);
    doc.text("Email:", marginX + 6, yPos + 23);
    doc.text("Phone:", marginX + 6, yPos + 30);
    doc.text("City:", marginX + 6, yPos + 37);

    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.setFont("helvetica", "bold");
    doc.text(data.name || "N/A", marginX + 22, yPos + 16);
    doc.text(data.email || "N/A", marginX + 22, yPos + 23);
    doc.text(data.phone || "N/A", marginX + 22, yPos + 30);
    doc.text(data.city || "N/A", marginX + 22, yPos + 37);

    // Right Card: EVENT DETAILS
    const col2X = marginX + colWidth + 10;
    doc.setFillColor(bgLightGray[0], bgLightGray[1], bgLightGray[2]);
    doc.rect(col2X, yPos, colWidth, 42, "F");

    // Top Gold Accent Border
    doc.setDrawColor(accentGold[0], accentGold[1], accentGold[2]);
    doc.setLineWidth(1);
    doc.line(col2X, yPos, col2X + colWidth, yPos);

    // Event Title
    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("EVENT DETAILS", col2X + 6, yPos + 8, { charSpace: 0.5 });

    // Event Content
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textLightGray[0], textLightGray[1], textLightGray[2]);
    doc.text("Event Type:", col2X + 6, yPos + 16);
    doc.text("Event Date:", col2X + 6, yPos + 23);
    doc.text("Guests:", col2X + 6, yPos + 30);
    doc.text("Venue:", col2X + 6, yPos + 37);

    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.setFont("helvetica", "bold");
    doc.text(data.eventType || "N/A", col2X + 30, yPos + 16);

    // Add logic to display single date or date range gracefully
    const displayDate = data.eventType === "Wedding" && data.eventEndDate
      ? `${data.eventDate} - ${data.eventEndDate}`
      : (data.eventDate || "TBD");
    doc.text(displayDate.length > 20 ? displayDate.substring(0, 18) + ".." : displayDate, col2X + 30, yPos + 23);

    doc.text(data.guestCount || "TBD", col2X + 30, yPos + 30);

    const venueStr = data.venue || "N/A";
    const truncVenue = venueStr.length > 25 ? venueStr.substring(0, 22) + "..." : venueStr;
    doc.text(truncVenue, col2X + 30, yPos + 37);

    yPos += 58;

    // Optional: Print wedding functions on PDF if wedding selected
    if (data.eventType === "Wedding" && data.weddingFunctions && data.weddingFunctions.length > 0) {
      doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Functions Covered:", marginX, yPos - 8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(textGray[0], textGray[1], textGray[2]);
      doc.text(data.weddingFunctions.join(", "), marginX + 35, yPos - 8);
      yPos += 5;
    }

    // --- 3. REQUESTED SERVICES TABLE ---

    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("REQUESTED SERVICES", marginX, yPos, { charSpace: 0.5 });
    yPos += 6;

    const tableRows = data.services.length > 0
      ? data.services.map((svc, i) => [`0${i + 1}`.slice(-2), svc, "Premium Coverage"])
      : [["01", "No specific services selected", "-"]];

    autoTable(doc, {
      startY: yPos,
      margin: { left: marginX, right: marginX, bottom: 25 }, // Pagination setup
      head: [["#", "SERVICE DESCRIPTION", "STATUS"]],
      body: tableRows,
      theme: "plain",
      headStyles: {
        fillColor: accentGold,
        textColor: 255,
        fontStyle: "bold",
        fontSize: 10,
        cellPadding: 6,
        halign: "left"
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: primaryDark,
        fontSize: 10,
        cellPadding: 6,
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250] // Subtle zebra stripes
      },
      columnStyles: {
        0: { cellWidth: 15, fontStyle: "bold", textColor: accentGold },
        1: { cellWidth: 'auto', fontStyle: "bold" },
        2: { cellWidth: 45, halign: "right", textColor: textGray }
      },
      didDrawCell: (data) => {
        // Add subtle bottom border to rows
        if (data.row.section === 'body') {
          doc.setDrawColor(230, 230, 230);
          doc.setLineWidth(0.1);
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
        }
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Handle Page Break before Budget block if needed
    if (yPos > pageHeight - 80) {
      doc.addPage();
      yPos = 25;
    }

    // --- 4. BUDGET SUMMARY BLOCK ---

    // Additional Features/Vision text (Left side of Budget)
    if (data.requirements) {
      doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Special Requirements / Vision:", marginX, yPos + 6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(textGray[0], textGray[1], textGray[2]);
      const splitReqs = doc.splitTextToSize(data.requirements, colWidth);
      doc.text(splitReqs, marginX, yPos + 12);
    }

    // Budget Card (Right Aligned)
    const budgetBoxW = 75;
    const budgetBoxX = pageWidth - marginX - budgetBoxW;

    doc.setFillColor(bgLightGray[0], bgLightGray[1], bgLightGray[2]);
    doc.rect(budgetBoxX, yPos, budgetBoxW, 28, "F");

    // Left Gold Border for Budget Box
    doc.setDrawColor(accentGold[0], accentGold[1], accentGold[2]);
    doc.setLineWidth(1.5);
    doc.line(budgetBoxX, yPos, budgetBoxX, yPos + 28);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text("ESTIMATED BUDGET RANGE", budgetBoxX + 8, yPos + 10, { charSpace: 0.5 });

    doc.setFontSize(16);
    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.text(data.budget || "To Be Discussed", budgetBoxX + 8, yPos + 20);

    yPos += 45;

    // --- 5. TERMS & CONDITIONS (FOOTER) ---

    // Footer will stick to the bottom if possible, or print where it is.
    let footerY = yPos > pageHeight - 50 ? yPos + 10 : pageHeight - 35;

    if (footerY > pageHeight - 15) {
      doc.addPage();
      footerY = 25;
    }

    // Thin separator line
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(marginX, footerY - 5, pageWidth - marginX, footerY - 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.text("TERMS & CONDITIONS", marginX, footerY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);

    const terms = [
      "1. This is a preliminary estimate strictly based on the provided requirements. The final quotation may vary after consultation.",
      "2. Please mention Quote Ref ID in all future correspondence. Prices are valid for 15 days from the date of issue.",
      "3. Travel, accommodation, and venue-specific shooting fees (if applicable) are not included unless explicitly stated."
    ];

    terms.forEach((term, idx) => {
      doc.text(term, marginX, footerY + 6 + (idx * 5));
    });

    // --------------------------------------------------------------------------
    // SAVE THE FILE
    // --------------------------------------------------------------------------
    doc.save(`PIXEL_STUDIO_Quote_${data.name.replace(/\s+/g, '_') || "Summary"}.pdf`);

    // Simulate Reset
    setTimeout(() => {
      reset();
      setStep(1);
      setIsSubmitted(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.15),transparent_70%)] animate-pulse-slow" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center px-6"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary ring-1 ring-primary/30">
            <Check size={40} strokeWidth={1.5} />
          </div>
          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
            Request Received
          </h1>
          <p className="font-body text-xl text-muted-foreground/80 max-w-lg mx-auto leading-relaxed">
            Thank you, {data.name.split(' ')[0]}.<br />
            Our team will review your vision and contact you within 24 hours.
          </p>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050505] text-foreground selection:bg-primary/30 relative">
      <Navigation />

      {/* 1. HERO CONSULTATION INTRO */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-center pt-40 pb-32 text-center z-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511285560982-1351c4f63525?auto=format&fit=crop&q=80"
            alt="Cinematic Wedding"
            className="w-full h-full object-cover opacity-40 blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center px-6"
        >
          <span className="text-[#C6A15B] text-sm md:text-base font-medium tracking-editorial uppercase mb-6 inline-block">
            Start Your Journey
          </span>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight leading-none text-center w-full">
            Request a Quotation
          </h1>
          <p className="text-white/60 font-body font-light text-xl md:text-2xl w-full max-w-5xl text-center mx-auto mb-12 leading-relaxed">
            Tell us about your vision. We'll craft a personalized experience for your special day.
          </p>

          {/* Thin Gold Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.1, delay: 0.15, ease: "circOut" }}
            className="h-px bg-[#C6A15B] opacity-60"
          />
        </motion.div>
      </section>

      {/* 2. GLASS CARD FORM CONTAINER */}
      <section className="px-4 md:px-6 lg:px-12 pb-32 -mt-20 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.27, delay: 0.06 }}
          className="max-w-[900px] mx-auto bg-[#121218]/80 backdrop-blur-xl border border-[#1E1E26] rounded-2xl shadow-[0_60px_150px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="w-full bg-[#1E1E26] h-1 flex">
            <div
              className="bg-[#C6A15B] h-full transition-all duration-700 ease-out shadow-[0_0_10px_#C6A15B]"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>

          <div className="p-8 md:p-12 lg:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.1, ease: "circOut" }}
              >
                {/* STEP 1: PERSONAL DETAILS */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="text-center mb-10">
                      <h3 className="font-heading text-3xl text-foreground mb-2">Personal Details</h3>
                      <p className="text-muted-foreground text-sm font-body">Let's get to know you.</p>
                    </div>
                    <div className="space-y-8">
                      <InputField
                        label="Full Name"
                        value={data.name}
                        onChange={(v) => setField("name", v)}
                        placeholder="Enter your full name"
                        error={errors.name}
                        required
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputField
                          label="Mobile Number"
                          value={data.phone}
                          onChange={(v) => {
                            const digitsOnly = v.replace(/\D/g, '').slice(0, 10);
                            setField("phone", digitsOnly);
                          }}
                          type="tel"
                          placeholder="Enter your mobile number"
                          error={errors.phone}
                          maxLength={10}
                          required
                        />
                        <InputField
                          label="Email Address"
                          value={data.email}
                          onChange={(v) => setField("email", v)}
                          type="email"
                          placeholder="hello@example.com"
                          error={errors.email}
                          required
                        />
                      </div>
                      <InputField label="City" value={data.city} onChange={(v) => setField("city", v)} placeholder="Where do you live?" />
                    </div>
                  </div>
                )}

                {/* STEP 2: EVENT DETAILS */}
                {step === 2 && (
                  <div className="space-y-8">
                    <div className="text-center mb-10">
                      <h3 className="font-heading text-3xl text-foreground mb-2">Event Details</h3>
                      <p className="text-muted-foreground text-sm font-body">Tell us about your celebration.</p>
                    </div>

                    <SelectField label="Type of Event" value={data.eventType} onChange={(v) => setField("eventType", v)} options={eventTypes} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputField label={data.eventType === "Wedding" ? "Start Date" : "Event Date"} value={data.eventDate} onChange={(v) => setField("eventDate", v)} type="date" />
                      {data.eventType === "Wedding" ? (
                        <InputField label="End Date" value={data.eventEndDate || ""} onChange={(v) => setField("eventEndDate", v)} type="date" />
                      ) : (
                        <InputField label="Venue Name & City" value={data.venue} onChange={(v) => setField("venue", v)} placeholder="Where is it happening?" />
                      )}
                    </div>

                    {data.eventType === "Wedding" && (
                      <InputField label="Venue Name & City" value={data.venue} onChange={(v) => setField("venue", v)} placeholder="Where is it happening?" />
                    )}

                    <InputField label="Expected Guests" value={data.guestCount} onChange={(v) => setField("guestCount", v)} placeholder="e.g. 50-100" />

                    {data.eventType === "Wedding" && (
                      <div className="w-full">
                        <label className="block text-xs tracking-editorial uppercase font-body text-muted-foreground/60 mb-4">
                          Wedding Functions <span className="text-primary">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                          {weddingFunctionsList.map((func) => {
                            const isSelected = data.weddingFunctions?.includes(func) || false;
                            return (
                              <button
                                key={func}
                                type="button"
                                onClick={() => {
                                  const current = data.weddingFunctions || [];
                                  const updated = isSelected
                                    ? current.filter(f => f !== func)
                                    : [...current, func];
                                  setField("weddingFunctions", updated);
                                }}
                                className={`h-[56px] flex items-center justify-center text-center text-sm tracking-wide font-body px-4 rounded-[10px] border transition-all duration-300 gap-2 ${isSelected
                                  ? "border-primary text-primary bg-[rgba(198,161,91,0.08)] shadow-[0_0_20px_rgba(198,161,91,0.15)]"
                                  : "border-[#1E1E26] bg-[#0F0F14] text-muted-foreground/70 hover:border-white/20 hover:text-white hover:bg-[#121218]"
                                  }`}
                              >
                                {isSelected && <Check size={14} />}
                                {func}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: SERVICE SELECTION */}
                {step === 3 && (
                  <div className="space-y-8">
                    <div className="text-center mb-10">
                      <h3 className="font-heading text-3xl text-foreground mb-2">Services</h3>
                      <p className="text-muted-foreground text-sm font-body">Choose what you need for your event.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {serviceOptions.map((service) => {
                        const isSelected = data.services.includes(service);
                        return (
                          <button
                            key={service}
                            onClick={() => {
                              const newServices = isSelected
                                ? data.services.filter(s => s !== service)
                                : [...data.services, service];
                              setField("services", newServices);
                            }}
                            className={`relative h-[120px] rounded-[10px] border transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${isSelected
                              ? "bg-[rgba(198,161,91,0.08)] border-[#C6A15B] shadow-[0_0_20px_rgba(198,161,91,0.1)]"
                              : "bg-[#0F0F14] border-[#1E1E26] hover:border-white/30"
                              }`}
                          >
                            <span className={`text-base font-medium font-body tracking-wide transition-colors ${isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                              }`}>
                              {service}
                            </span>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${isSelected ? "border-primary bg-primary text-black" : "border-white/20"
                              }`}>
                              {isSelected && <Check size={14} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: FINAL TOUCHES */}
                {step === 4 && (
                  <div className="space-y-8">
                    <div className="text-center mb-10">
                      <h3 className="font-heading text-3xl text-foreground mb-2">Final Details</h3>
                      <p className="text-muted-foreground text-sm font-body">Almost there.</p>
                    </div>

                    <SelectField label="Budget Range" value={data.budget} onChange={(v) => setField("budget", v)} options={budgetRanges} />

                    <div className="mb-8">
                      <label className="block text-xs tracking-editorial uppercase font-body text-muted-foreground/60 mb-2">
                        Requirements / Vision
                      </label>
                      <textarea
                        value={data.requirements}
                        onChange={(e) => setField("requirements", e.target.value)}
                        placeholder="Any specific vision, references, or requirements..."
                        rows={4}
                        className="w-full bg-[#0F0F14] border border-[#1E1E26] rounded-[10px] p-6 text-foreground font-body text-base outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(198,161,91,0.15)] transition-all duration-300 placeholder:text-[#6B6B76] resize-none"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#1E1E26]">
              <button
                onClick={() => {
                  if (step > 1) {
                    setStep(step - 1);
                    window.scrollTo({ top: 400, behavior: 'auto' });
                  }
                }}
                className={`text-sm tracking-editorial uppercase font-body text-muted-foreground hover:text-white transition-colors duration-300 flex items-center gap-2 ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
              >
                <ArrowLeft size={16} /> Previous
              </button>

              <button
                onClick={step < totalSteps ? handleNext : handleSubmit}
                className="bg-transparent border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-black font-body text-sm font-medium tracking-widest uppercase px-12 py-4 rounded-[10px] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(198,161,91,0.3)] hover:scale-[1.02]"
              >
                {step < totalSteps ? "Next Step" : "Request Consultation"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* 6. TRUST SECTION */}
        <div className="max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1E1E26] flex items-center justify-center text-[#C6A15B]">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="text-white font-medium font-body mb-1">Fast Response</h4>
              <p className="text-white/40 text-sm">Within 24 hours</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1E1E26] flex items-center justify-center text-[#C6A15B]">
              <Users size={20} />
            </div>
            <div>
              <h4 className="text-white font-medium font-body mb-1">500+ Happy Clients</h4>
              <p className="text-white/40 text-sm">Trusted by many</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1E1E26] flex items-center justify-center text-[#C6A15B]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-white font-medium font-body mb-1">Secure & Private</h4>
              <p className="text-white/40 text-sm">Your data is safe</p>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </main >
  );
};

export default Quote;
