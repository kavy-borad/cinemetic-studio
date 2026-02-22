// ─── API Base URL ─────────────────────────────────────────────────────────────
// In development the Vite dev-server proxy forwards /api/* → http://localhost:5000
// so we use a relative path to avoid CORS issues.
export const API_BASE_URL = "/api";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  images: string[];
  clientName?: string;
  eventDate?: string;
  description?: string;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  startingPrice: number;
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface QuotationPayload {
  name: string;
  email?: string;
  phone: string;
  city?: string;
  eventType?: string;
  eventDate?: string;
  venue?: string;
  guestCount?: string;
  functions?: string;
  servicesRequested?: string[];
  budget?: string;
  requirements?: string;
}

export interface Quotation extends QuotationPayload {
  id: number;
  status: "New" | "Contacted" | "Closed";
  createdAt: string;
  updatedAt: string;
}

// ─── Generic fetch wrapper ────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message || `API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Portfolio API ─────────────────────────────────────────────────────────────

/** Fetch all portfolios, optionally filtered by category */
export function fetchPortfolios(params?: {
  category?: string;
  featured?: boolean;
}): Promise<PortfolioItem[]> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.featured !== undefined) query.set("featured", String(params.featured));
  const qs = query.toString();
  return apiFetch<PortfolioItem[]>(`/portfolio${qs ? `?${qs}` : ""}`);
}

/** Fetch a single portfolio by ID */
export function fetchPortfolioById(id: number): Promise<PortfolioItem> {
  return apiFetch<PortfolioItem>(`/portfolio/${id}`);
}

/** Fetch a single portfolio by slug */
export function fetchPortfolioBySlug(slug: string): Promise<PortfolioItem> {
  return apiFetch<PortfolioItem>(`/portfolio/slug/${slug}`);
}

// ─── Services API ──────────────────────────────────────────────────────────────

/** Fetch all services */
export function fetchServices(): Promise<Service[]> {
  return apiFetch<Service[]>("/services");
}

/** Fetch a single service by ID */
export function fetchServiceById(id: number): Promise<Service> {
  return apiFetch<Service>(`/services/${id}`);
}

// ─── Quotations API ────────────────────────────────────────────────────────────

/** Submit a new quotation (public) */
export function submitQuotation(payload: QuotationPayload): Promise<Quotation> {
  return apiFetch<Quotation>("/quotations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
