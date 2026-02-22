import { useMutation } from "@tanstack/react-query";
import { submitQuotation, type QuotationPayload, type Quotation } from "@/lib/api";

/** React Query mutation to POST a quotation to the backend */
export function useSubmitQuotation() {
  return useMutation<Quotation, Error, QuotationPayload>({
    mutationFn: submitQuotation,
  });
}
