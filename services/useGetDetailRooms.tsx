import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const useGetDetailRooms = (id: string) => {
  return useQuery({
    queryKey: ["detailRoom"],
    queryFn: async () => {
      const res = await axios.get(`/api/room/detail/${id}`);

      if (res.status !== 200) {
        throw new Error("Error fetching profile data");
      }

      return res.data;
    },
  });
};
