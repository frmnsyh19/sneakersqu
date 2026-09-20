"use client";

import React, { useState } from "react";

interface Product {
  name: string;
  price: number;
  qty: number;
  satuan: string;
}

const Headerproduct = () => {
  const [items, setItems] = useState<Product[]>([]);

  const Products: Product[] = [
    {
      name: "daging slice",
      price: 400000,
      qty: 1,
      satuan: "kg",
    },
    {
      name: "Ceker",
      price: 300000,
      qty: 1,
      satuan: "kg",
    },
    {
      name: "Paha Pentung",
      price: 500000,
      qty: 1,
      satuan: "kg",
    },
  ];

  function handleAddItems(item: Product) {
    setItems([...items, item]);

    console.log(items, "ini itemsnya");
  }

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        {Products
          ? Products.map((items: Product, i) => {
              return (
                <div
                  key={i}
                  className="w-52 bg-white flex flex-col gap-1 text-zinc-950"
                  onClick={() => handleAddItems(items)}>
                  <b>{items.name}</b>
                  <span>{items.price}</span>
                  <span>
                    {items.qty}
                    {items.satuan}
                  </span>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Headerproduct;
