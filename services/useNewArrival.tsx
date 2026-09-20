import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  gender: string;
  kategori: string;
  brand: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const useNewArrival = () => {
  return useQuery({
    queryKey: ["ProductNewArrival"],
    queryFn: async (): Promise<Product[]> => {
      const res = await axios.get("/api/product/newarrival");
      return res.data;
    },
  });
};
