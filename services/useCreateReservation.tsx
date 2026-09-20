import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface createReservation {
  roomId: string;
  userId: string;
  startDate: string;
  endDate: string;
}

export default function useCreateReservation({ roomId }: { roomId: string }) {
  return useMutation({
    mutationKey: ["CreateReservation"],
    mutationFn: async (body: createReservation) => {
      try {
        const store = await axios.post(`/api/reservation?id=${roomId}`, body);

        console.log(store, "this store");
        return store.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
}
