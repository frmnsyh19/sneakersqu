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
export const useGetProduct = () => {
  return useQuery({
    queryKey: ["GetProduct"],
    queryFn: async (): Promise<Product[]> => {
      const res = await axios.get("/api/product");
      return res.data;
    },
  });
};
