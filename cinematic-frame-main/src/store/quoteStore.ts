import { create } from "zustand";

interface QuoteState {
  step: number;
  data: {
    name: string;
    email: string;
    phone: string;
    city: string;
    venue: string;
    eventDate: string;
    eventEndDate?: string;
    eventType: string;
    guestCount: string;
    functions: string;
    weddingFunctions?: string[];
    services: string[];
    budget: string;
    setting: string;
    days: string;
    requirements: string;
  };
  setStep: (step: number) => void;
  setField: (field: string, value: any) => void;
  reset: () => void;
}

const initialData = {
  name: "",
  email: "",
  phone: "",
  city: "",
  venue: "",
  eventDate: "",
  eventType: "",
  guestCount: "",
  functions: "",
  services: [],
  budget: "",
  setting: "",
  days: "",
  requirements: "",
};

export const useQuoteStore = create<QuoteState>((set) => ({
  step: 1,
  data: initialData,
  setStep: (step) => set({ step }),
  setField: (field, value) =>
    set((state) => ({ data: { ...state.data, [field]: value } })),
  reset: () => set({ step: 1, data: initialData }),
}));
