"use client";

import { useCreateProduct } from "@/services/useCreateProduct";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type SizeRow = { size: string; stock: string };

export const ModalCreateProduct = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [sizeRows, setSizeRows] = useState<SizeRow[]>([
    { size: "", stock: "" },
  ]);

  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);

    e.target.value = ""; // biar bisa pilih file yang sama lagi kalau perlu
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function addSizeRow() {
    setSizeRows((prev) => [...prev, { size: "", stock: "" }]);
  }

  function removeSizeRow(index: number) {
    setSizeRows((prev) => prev.filter((_, i) => i !== index));
  }

  function updateSizeRow(index: number, field: keyof SizeRow, value: string) {
    setSizeRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  }

  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  // function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setPreview(URL.createObjectURL(file));
  //   }
  // }

  const router = useRouter();

  const { mutate, isPending: loading } = useCreateProduct();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (images.length === 0) {
      alert("Upload minimal 1 gambar produk");
      return;
    }

    const validSizes = sizeRows.filter((r) => r.size.trim() !== "");
    if (validSizes.length === 0) {
      alert("Tambahkan minimal 1 ukuran");
      return;
    }

    const formData = new FormData(e.currentTarget);

    images.forEach((file) => {
      formData.append("images", file);
    });

    formData.append(
      "sizes",
      JSON.stringify(
        validSizes.map((r) => ({ size: r.size, stock: r.stock || "0" })),
      ),
    );

    mutate(formData, {
      onSuccess: () => {
        // router.push("/products");
        toast.success("success");
        router.refresh();
      },
    });
  }

  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={openModal}>
        + Add Product
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">Tambah Produk Baru</h3>

          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto space-y-5 p-6 border border-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Tambah Produk Baru</h2>

            {/* {isError && (
              <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md">
                {(error as any)?.response?.data?.error ??
                  "Gagal membuat produk"}
              </div>
            )} */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Nama Produk
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <input
                name="brand"
                type="text"
                required
                placeholder="Nike, Adidas, dll"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  required
                  defaultValue=""
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option value="" disabled>
                    Pilih gender
                  </option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Kategori
                </label>
                <select
                  name="kategori"
                  required
                  defaultValue=""
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option value="" disabled>
                    Pilih kategori
                  </option>
                  <option value="running">Running</option>
                  <option value="sneakers">Sneakers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Harga</label>
              <input
                name="price"
                type="number"
                required
                min={0}
                placeholder="1500000"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Deskripsi
              </label>
              <textarea
                name="description"
                required
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            {/* ===== Ukuran & Stok — dinamis ===== */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Ukuran & Stok
              </label>
              <div className="space-y-2">
                {sizeRows.map((row, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Ukuran (mis. 40)"
                      value={row.size}
                      onChange={(e) =>
                        updateSizeRow(index, "size", e.target.value)
                      }
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Stok"
                      min={0}
                      value={row.stock}
                      onChange={(e) =>
                        updateSizeRow(index, "stock", e.target.value)
                      }
                      className="w-24 border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                    {sizeRows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeRow(index)}
                        className="text-red-500 hover:text-red-700 text-sm px-2"
                        aria-label="Hapus ukuran ini">
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addSizeRow}
                className="mt-2 text-sm text-blue-600 hover:underline">
                + Tambah Ukuran
              </button>
            </div>

            {/* ===== Gallery Gambar — banyak sekaligus ===== */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Gambar Produk (foto pertama jadi thumbnail utama)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 file:text-sm"
              />

              {previews.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {previews.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-md border border-gray-200"
                      />
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-black text-white text-[10px] px-1.5 py-0.5 rounded">
                          Utama
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                        aria-label="Hapus gambar ini">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50">
              {loading ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
