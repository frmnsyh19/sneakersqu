import ModalCreateRoom from "@/app/components/admin/Modalcreateroom";
import TableRoom from "@/app/components/admin/TableRoom";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex justify-end p-2">
          <ModalCreateRoom />
        </div>
        <TableRoom />
      </div>
    </div>
  );
}
