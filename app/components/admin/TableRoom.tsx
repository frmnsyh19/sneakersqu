"use client";

import { useGetRooms } from "@/services/useGetRooms";
import { useMemo, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Room = {
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
};

const columnHelper = createColumnHelper<Room>();

const columns = [
  columnHelper.display({
    id: "no",
    header: "No",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <span className="font-medium text-gray-900">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor((row) => row.description, {
    id: "description",
    header: "Description",
    cell: (info) => (
      <span className="text-gray-500 line-clamp-2">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => (
      <span className="font-medium">
        Rp{info.getValue().toLocaleString("id-ID")}
      </span>
    ),
  }),
  columnHelper.accessor("capacity", {
    header: "Capacity",
    cell: (info) => `${info.getValue()} orang`,
  }),
  columnHelper.accessor("image", {
    header: "Image",
    cell: (info) => (
      <img
        src={info.getValue()}
        alt="room"
        className="h-12 w-16 rounded-md object-cover"
      />
    ),
  }),
];

const TableRoom = () => {
  const { data: rooms, isLoading, isError } = useGetRooms();
  const [globalFilter, setGlobalFilter] = useState("");

  const data = useMemo(() => rooms ?? [], [rooms]);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-gray-500">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-red-500">
        Gagal memuat data kamar.
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4">
      {/* Search bar */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Cari kamar..."
          className="max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* <span className="text-sm text-gray-500">
          {table.getRowModel().rows.length} hasil
        </span> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-400">
                  Tidak ada kamar yang cocok.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRoom;
