import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCustomer = () => {
  return useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const res = await axios.get("/api/customer");

      if (res.status !== 200) {
        throw new Error("Error fetching profile data");
      }

      return res.data;
    },
  });
};
