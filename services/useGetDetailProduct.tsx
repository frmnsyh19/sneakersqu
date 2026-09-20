import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const useGetDetailProduct = (id: string) => {
  return useQuery({
    queryKey: ["DetailProduct"],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/product/detail/${id}`);

        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
