import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (formData: FormData) => {
      try {
        const store = await axios.post("/api/product", formData);

        if (store.status !== 200) {
          console.log("ada yang salah");

          return;
        }

        return store.data;
      } catch (error) {
        console.log(error, "error create product");
      }
    },
  });
};
