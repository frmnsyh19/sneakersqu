import { Discover } from "@/app/components/Discover";
import FilterProduct from "@/app/components/FilterProduct";
import { NavbarSneckers } from "@/app/components/NavbarSneckers";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <div className="w-full flex flex-col">
      <NavbarSneckers />
      <div className="w-full flex flex-row gap-2">
        <Discover query={category} />
      </div>
    </div>
  );
}
