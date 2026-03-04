import { useQuery } from "@tanstack/react-query";
import {
  fetchPortfolios,
  fetchPortfolioBySlug,
  API_BASE_URL,
  type PortfolioItem,
} from "@/lib/api";

/** Fetch all portfolios, optionally filtered by category */
export function usePortfolios(category?: string) {
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolios", category ?? "all"],
    queryFn: async () => {
      const url = `${API_BASE_URL}/portfolio${category ? `?category=${category}` : ""}`;
      console.log(`[API] GET ${url}`);
      const data = await fetchPortfolios(category ? { category } : undefined);
      console.log(`[API] Response → ${data.length} portfolios`, data);
      return data;
    },
    staleTime: 0,         // Always re-fetch on mount (good for dev)
    retry: 1,
  });
}

/** Fetch a single portfolio by its slug */
export function usePortfolioBySlug(slug: string | undefined) {
  return useQuery<PortfolioItem>({
    queryKey: ["portfolio", slug],
    queryFn: async () => {
      const url = `${API_BASE_URL}/portfolio/slug/${slug}`;
      console.log(`[API] GET ${url}`);
      const data = await fetchPortfolioBySlug(slug!);
      console.log(`[API] Response → portfolio:`, data);
      return data;
    },
    enabled: !!slug && slug !== "null" && slug !== "undefined",
    staleTime: 0,
    retry: 1,
  });
}
