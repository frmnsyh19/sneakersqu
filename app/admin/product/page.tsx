import { ModalCreateProduct } from "@/app/components/admin/ModalCreateProduct";
import TableRoom from "@/app/components/admin/TableRoom";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex justify-end p-2">
          <ModalCreateProduct />
        </div>

        {/* <TableRoom /> */}
      </div>
    </div>
  );
}
