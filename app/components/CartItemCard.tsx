"use client";

type CartItemCardProps = {
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  checked: boolean;
  onCheckChange: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItemCard({
  name,
  image,
  size,
  price,
  quantity,
  checked,
  onCheckChange,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheckChange}
        className="w-4 h-4 mt-1 accent-orange-500 cursor-pointer"
      />

      {/* Gambar produk */}
      <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-md overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Info produk */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 line-clamp-2">{name}</p>

        <div className="mt-1">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            Ukuran: {size}
          </span>
        </div>

        <div className="flex w-full items-end justify-between mt-3">
          <p className="text-orange-500 font-semibold text-sm">
            Rp{price.toLocaleString("id-ID")}
          </p>

          {/* Stepper quantity */}
          <div className="flex w-full items-center ms-4 justify-end border border-gray-300 rounded">
            <button
              onClick={onDecrease}
              className="w-6  h-6 flex items-center justify-center text-gray-600 hover:bg-gray-50">
              −
            </button>
            <span className="w-7  text-center text-sm">{quantity}</span>
            <button
              onClick={onIncrease}
              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-50">
              +
            </button>
          </div>
        </div>
      </div>

      {/* Tombol hapus (icon trash) */}
      <button
        onClick={onRemove}
        aria-label="Hapus item"
        className="text-gray-400 hover:text-red-500 mt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
