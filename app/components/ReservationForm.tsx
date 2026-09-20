import useCreateReservation from "@/services/useCreateReservation";
import { useSession } from "next-auth/react";
import React from "react";

interface RoomBody {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
}

const ReservationForm = ({ Room }: { Room: RoomBody }) => {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const { data: session } = useSession();

  const nights =
    startDate && endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const totalPrice = nights * Room.price;

  const { mutate, isPending: loading } = useCreateReservation({
    roomId: Room.id,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.id) {
      // handle user belum login, misal redirect ke /signin
      return;
    }

    if (nights > 0) {
      mutate({
        roomId: Room.id,
        userId: session.user.id,
        startDate,
        endDate,
      });
    }
  };

  return <></>;
};

export default ReservationForm;

// {/* <form
//         onSubmit={handleSubmit}
//         className="w-screen  md:max-w-sm rounded-lg p-5 border border-gray-200 shadow-xl space-y-4">
//         <div>
//           <h3 className="font-semibold text-lg">{Room.name}</h3>
//           <p className="text-sm text-gray-500">
//             Rp {Room.price.toLocaleString("id-ID")} / malam
//           </p>
//         </div>

//         {/* {error && (
//           <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md">
//             {error}
//           </div>
//         )} */}

//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="block text-sm font-medium mb-1">Check-in</label>
//             <input
//               type="date"
//               required
//               value={startDate}
//               min={new Date().toISOString().split("T")[0]}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Check-out</label>
//             <input
//               type="date"
//               required
//               value={endDate}
//               min={startDate || new Date().toISOString().split("T")[0]}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Nama</label>
//           <input
//             type="text"
//             required
//             readOnly
//             value={session?.user.name}
//             className="w-full border rounded-md px-3 py-2 text-sm"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="text"
//             required
//             readOnly
//             value={session?.user.email}
//             className="w-full border rounded-md px-3 py-2 text-sm"
//           />
//         </div>

//         {nights > 0 && (
//           <div className="bg-gray-50 rounded-md px-3 py-2 text-sm">
//             <div className="flex justify-between">
//               <span>{nights} malam</span>
//               <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
//             </div>
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={nights <= 0}
//           className="w-full bg-orange-400 text-white py-2.5 rounded-md hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
//           Rservasi Sekarang
//         </button>
//       </form> */ //
