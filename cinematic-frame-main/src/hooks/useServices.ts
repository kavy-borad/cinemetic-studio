import { useQuery } from "@tanstack/react-query";
import { fetchServices, type Service } from "@/lib/api";

/** Fetch all services from the backend */
export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 10 * 60 * 1000, // 10 min
  });
}
