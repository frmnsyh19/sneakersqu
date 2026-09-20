import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// interface CreateRoomBody {
//   name: string;
//   description: string;
//   price: number;
//   capacity: number;
//   image: File;
// }

export const useCreateRooms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createRoom"],
    mutationFn: async (body: FormData) => {
      try {
        const store = await axios.post("/api/room", body);
        return store.data;
      } catch (error) {
        console.log("Error creating room", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
  });
};
