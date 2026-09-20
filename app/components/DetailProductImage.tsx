import React, { useState } from "react";

interface GalleryItems {
  id: string;
  url: string;
}

export const DetailProductImage = ({
  image,
  gallery,
}: {
  image: string;
  gallery: GalleryItems[]; // 👈 pakai interface yang udah kamu buat
}) => {
  const [itemsImage, setItemsImage] = useState<string>();

  return (
    <div className="w-full h-full  flex flex-col-reverse lg:flex-row gap-2">
      {/* gallery image */}
      <div className="lg:w-20 w-full flex flex-row justify-start items-center lg:flex-col gap-3">
        <div
          className=" w-20 h-20 p-2 border border-gray-200"
          onClick={() => setItemsImage(image)}>
          <img src={image} className="w-full h-full object-cover" alt="" />
        </div>
        {gallery
          ? gallery.map((item, i) => (
              <div
                key={i}
                className={`w-20 h-20 p-2 ${item.url === itemsImage ? "border border-orange-400" : "border border-gray-200"} cursor-pointer`} // ✅
                onClick={() => setItemsImage(item.url)}>
                <img
                  src={item.url}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            ))
          : null}
      </div>
      {/* main image */}
      <div className="flex-1 min-w-0 min-h-0">
        {" "}
        {/* <- tambahin ini */}
        <div className="w-full h-full overflow-hidden">
          {" "}
          {/* <- kasih tinggi pasti + overflow-hidden */}
          <img
            src={itemsImage ? itemsImage : image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
