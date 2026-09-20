"use client";

import { useRef } from "react";
import { useCreateRooms } from "@/services/useCreateRooms";

const ModalCreateRoom = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  const mutate = useCreateRooms();

  const { isPending: loading } = mutate;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await mutate.mutateAsync(formData);

    if (result.status === 200 || result.status === 201) {
      closeModal();
      form.reset();
    }
  };

  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={openModal}>
        + Tambah Room
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">Tambah Room Baru</h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="label">
                <span className="label-text">Nama Room</span>
              </label>
              <input
                name="name"
                type="text"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Deskripsi</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">
                  <span className="label-text">Harga</span>
                </label>
                <input
                  name="price"
                  type="number"
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Kapasitas</span>
                </label>
                <input
                  name="capacity"
                  type="number"
                  defaultValue={1}
                  required
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Gambar Room</span>
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={closeModal}
                disabled={loading}>
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan Room"}
              </button>
            </div>
          </form>
        </div>

        {/* klik area luar modal buat close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ModalCreateRoom;
