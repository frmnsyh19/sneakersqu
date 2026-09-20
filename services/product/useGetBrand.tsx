import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface BrandType {
  brand: string;
}

export const useGetBrand = () => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: async () => {
      const res = await axios.get("/api/product/brand");

      return res.data;
    },
  });
};
