
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useQuoteStore } from "@/store/quoteStore";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Clock, Users, Star } from "lucide-react";
import { z } from "zod";
import { useSubmitQuotation } from "@/hooks/useQuotation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const eventTypes = ["Wedding", "Pre-Wedding", "Engagement", "Reception", "Baby Shower", "Birthday", "Corporate", "Other"];
const serviceOptions = [
  "Photography", "Cinematic Video", "Drone", "Album", "Live Streaming"
];
const budgetRanges = ["< ₹50,000", "₹50,000 - ₹1,00,000", "₹1,00,000 - ₹3,00,000", "₹3,00,000 - ₹5,00,000", "₹5,00,000+"];
const weddingFunctionsList = [
  "Engagement", "Mandvo", "Pithi / Haldi", "Mehendi", "Garba / Sangeet", "Wedding Ceremony", "Reception", "Vana Rasam"
];

// ─── Country Code Options (for dropdown) ─────────────────────
const COUNTRY_OPTIONS = [
  { code: "+91", abbr: "IN", flag: "🇮🇳", label: "India" },
  { code: "+1", abbr: "US", flag: "🇺🇸", label: "USA/Canada" },
  { code: "+44", abbr: "GB", flag: "🇬🇧", label: "UK" },
  { code: "+61", abbr: "AU", flag: "🇦🇺", label: "Australia" },
  { code: "+971", abbr: "AE", flag: "🇦🇪", label: "UAE" },
  { code: "+966", abbr: "SA", flag: "🇸🇦", label: "Saudi Arabia" },
  { code: "+974", abbr: "QA", flag: "🇶🇦", label: "Qatar" },
  { code: "+965", abbr: "KW", flag: "🇰🇼", label: "Kuwait" },
  { code: "+92", abbr: "PK", flag: "🇵🇰", label: "Pakistan" },
  { code: "+880", abbr: "BD", flag: "🇧🇩", label: "Bangladesh" },
];

// ─── Country-specific phone rules ────────────────────────────
const COUNTRY_PHONE_RULES: Record<string, { digits: number; startsWith: RegExp; name: string }> = {
  "+91": { digits: 10, startsWith: /^[6-9]/, name: "India" },
  "+1": { digits: 10, startsWith: /^[2-9]/, name: "USA/Canada" },
  "+44": { digits: 10, startsWith: /^[1-9]/, name: "UK" },
  "+61": { digits: 9, startsWith: /^[2-9]/, name: "Australia" },
  "+971": { digits: 9, startsWith: /^[1-9]/, name: "UAE" },
  "+966": { digits: 9, startsWith: /^[1-9]/, name: "Saudi Arabia" },
  "+974": { digits: 8, startsWith: /^[1-9]/, name: "Qatar" },
  "+965": { digits: 8, startsWith: /^[1-9]/, name: "Kuwait" },
  "+92": { digits: 10, startsWith: /^[3-9]/, name: "Pakistan" },
  "+880": { digits: 10, startsWith: /^[1-9]/, name: "Bangladesh" },
};

// ─── Phone Validator (mirrors backend logic) ──────────────────
function validatePhone(countryCode: string, phoneNumber: string): string | null {
  const digits = phoneNumber.replace(/[\s\-\(\)\.]/g, "");

  if (!digits) return "Mobile number is required.";
  if (!/^\d+$/.test(digits)) return "Only numbers are allowed.";

  // Block all-same / all-zero fake numbers
  if (/^(\d)\1+$/.test(digits)) return "Phone number is not valid. Enter a real number.";
  if (/^0+\d*$/.test(digits)) return "Phone number is not valid. Enter a real number.";
  if (/^(\d)\1{7,}/.test(digits)) return "Phone number looks fake. Enter a real number.";

  const rule = COUNTRY_PHONE_RULES[countryCode];
  if (rule) {
    if (digits.length !== rule.digits)
      return `${rule.name} number must be exactly ${rule.digits} digits.`;
    if (!rule.startsWith.test(digits))
      return `${rule.name} number starts with an invalid digit.`;
  } else {
    if (digits.length < 7 || digits.length > 15)
      return "Phone number must be between 7 and 15 digits.";
  }

  return null; // ✅ Valid
}

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
  const { mutateAsync: postQuotation, isPending: isSubmitting } = useSubmitQuotation();

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!data.name) newErrors.name = "Name is required";

      // ── Country-aware phone validation ──
      const phoneErr = validatePhone(data.countryCode || "+91", data.phone || "");
      if (phoneErr) newErrors.phone = phoneErr;

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
    // ── Build the dynamic payload from form data ──
    const payload = {
      name: data.name,
      email: data.email || undefined,
      // Backend expects: +919876543210 (no space, keep the + prefix)
      phone: `${data.countryCode || "+91"}${data.phone}`,
      city: data.city || undefined,
      eventType: data.eventType || undefined,
      eventDate:
        data.eventType === "Wedding" && data.eventEndDate
          ? `${data.eventDate} to ${data.eventEndDate}`
          : data.eventDate || undefined,
      venue: data.venue || undefined,
      guestCount: data.guestCount || undefined,
      functions:
        data.eventType === "Wedding"
          ? data.weddingFunctions?.join(", ")
          : undefined,
      servicesRequested:
        data.services.length > 0 ? data.services : undefined,
      budget: data.budget || undefined,
      requirements: data.requirements || undefined,
    };

    // ── Log: outgoing request for backend tracing ──
    console.log("[Quotation] ➤ Submitting to backend:", JSON.stringify(payload, null, 2));

    // ── POST to backend — only proceed to success screen if API confirms ──
    try {
      const response = await postQuotation(payload);
      console.log("[Quotation] ✔ Backend response (201):", response);
      toast.success("Consultation request received!", {
        description: `We'll contact you at ${data.phone} within 24 hours.`,
        duration: 3000,
        className: "bg-background border-primary text-foreground",
      });
    } catch (err: any) {
      const msg = err?.message || "Could not submit your request. Please try again.";
      console.error("[Quotation] ✘ Backend error:", msg);
      // Show real backend validation/error message
      toast.error("Submission Failed", {
        description: msg,
        duration: 5000,
      });
      // Stop here — don't show success screen or generate PDF on failure
      return;
    }

    // Only reaches here on backend success
    setIsSubmitted(true);

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
                        <div className="group w-full">
                          <label className="block text-xs tracking-editorial uppercase font-body text-muted-foreground/60 mb-3 transition-colors group-focus-within:text-primary">
                            Mobile Number <span className="text-primary">*</span>
                          </label>
                          <div className="flex relative">
                            <Select
                              value={data.countryCode || "+91"}
                              onValueChange={(value) => {
                                setField("countryCode", value);
                                // Reset phone so stale digits from another country don't persist
                                setField("phone", "");
                              }}
                            >
                              <SelectTrigger className="bg-[#0F0F14] border border-[#1E1E26] border-r-0 rounded-l-[10px] rounded-r-none h-[56px] w-[90px] min-w-[90px] px-0 text-foreground font-body text-sm outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary focus:z-10 transition-all duration-300 cursor-pointer [&>svg]:hidden flex justify-center items-center text-center [&>span]:line-clamp-none [&>span]:flex [&>span]:justify-center [&>span]:w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0F0F14] border-[#1E1E26] text-foreground min-w-[90px] w-[90px] rounded-lg shadow-xl">
                                {COUNTRY_OPTIONS.map((c) => (
                                  <SelectItem
                                    key={c.code}
                                    value={c.code}
                                    className="cursor-pointer focus:bg-[#1E1E26] focus:text-white transition-colors py-3 pl-[30px] pr-2 flex justify-start items-center rounded-md"
                                  >
                                    <div className="flex flex-col items-center justify-center gap-[4px] w-full -ml-[2px]">
                                      <span className="text-[12px] font-bold text-white tracking-widest leading-none">{c.abbr}</span>
                                      <span className="text-[13px] text-white/80 leading-none">{c.code}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <input
                              type="tel"
                              value={data.phone}
                              onChange={(e) => {
                                const rule = COUNTRY_PHONE_RULES[data.countryCode || "+91"];
                                const maxLen = rule ? rule.digits : 15;
                                const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, maxLen);
                                setField("phone", digitsOnly);
                              }}
                              placeholder={`Enter ${COUNTRY_PHONE_RULES[data.countryCode || "+91"]?.digits ?? ""}-digit number`}
                              maxLength={COUNTRY_PHONE_RULES[data.countryCode || "+91"]?.digits ?? 15}
                              className="w-full bg-[#0F0F14] border border-[#1E1E26] rounded-r-[10px] h-[56px] px-6 text-foreground font-body text-base outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(198,161,91,0.15)] transition-all duration-300 placeholder:text-[#6B6B76]"
                            />
                          </div>
                          {errors.phone && <p className="text-destructive text-xs mt-2 font-light tracking-wide">{errors.phone}</p>}
                        </div>
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
                disabled={step === totalSteps && isSubmitting}
                className={`bg-transparent border border-[#C6A15B] text-[#C6A15B] font-body text-sm font-medium tracking-widest uppercase px-12 py-4 rounded-[10px] transition-all duration-300 flex items-center gap-3 ${step === totalSteps && isSubmitting
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-[#C6A15B] hover:text-black hover:shadow-[0_10px_30px_rgba(198,161,91,0.3)] hover:scale-[1.02]"
                  }`}
              >
                {step === totalSteps && isSubmitting ? (
                  <>
                    {/* Spinner */}
                    <svg className="animate-spin h-4 w-4 text-[#C6A15B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Submitting...
                  </>
                ) : step < totalSteps ? "Next Step" : "Request Consultation"}
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
