import { WrapperDetailBelanja } from "@/app/components/WrapperDetailBelanja";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full lg:h-dvh flex flex-col">
      <WrapperDetailBelanja id={id} />
    </div>
  );
}
