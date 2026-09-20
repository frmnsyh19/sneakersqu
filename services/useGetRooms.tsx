import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetRooms = () => {
  return useQuery({
    queryKey: ["Rooms"],
    queryFn: async () => {
      const data = await axios.get("/api/room");

      if (data.status !== 200) {
        throw new Error("Error fetching profile data");
      }

      return data.data;
    },
  });
};
