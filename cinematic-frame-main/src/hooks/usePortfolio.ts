import { useQuery } from "@tanstack/react-query";
import {
  fetchPortfolios,
  fetchPortfolioBySlug,
  type PortfolioItem,
} from "@/lib/api";

/** Fetch all portfolios, optionally filtered by category */
export function usePortfolios(category?: string) {
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolios", category ?? "all"],
    queryFn: () => fetchPortfolios(category ? { category } : undefined),
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

/** Fetch a single portfolio by its slug */
export function usePortfolioBySlug(slug: string | undefined) {
  return useQuery<PortfolioItem>({
    queryKey: ["portfolio", slug],
    queryFn: () => fetchPortfolioBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}
