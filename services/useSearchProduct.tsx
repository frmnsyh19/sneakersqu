import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  kategori: string;
  image: string;
  brand: string;
  createdAt: string;
  gender: string;
};

export function useSearchProducts(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Tunggu 400ms setelah user berhenti ngetik, baru update debouncedQuery
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(timer); // reset timer tiap kali query berubah (user masih ngetik)
  }, [query]);

  return useQuery({
    queryKey: ["SearchProducts", debouncedQuery],
    queryFn: async (): Promise<Product[]> => {
      const res = await axios.get(`/api/product/search?q=${debouncedQuery}`);
      return res.data;
    },
    enabled: debouncedQuery.trim().length > 0, // gak fetch kalau query kosong
  });
}
