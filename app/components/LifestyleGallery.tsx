export default function LifestyleGallery() {
  return (
    <div className="w-full px-4 sm:px-8 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Gaya Hidup Aktif</h2>
        <p className="text-sm text-gray-500 mt-1">
          Dari lari pagi sampai nongkrong santai
        </p>
      </div>

      <div className="flex flex-row gap-2 sm:gap-4">
        {/* Foto 1: Fokus kaki orang lari pakai sepatu */}
        <div className="relative flex-1 h-[160px] sm:h-[380px] rounded-lg overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800"
            alt="Detail sepatu saat lari"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-white">
            <p className="text-[11px] sm:text-sm font-medium">
              Setiap Langkah Berarti
            </p>
          </div>
        </div>

        {/* Foto 2: Orang lari full body */}
        <div className="relative flex-1 h-[160px] sm:h-[380px] rounded-lg overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800"
            alt="Orang sedang lari pagi"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-white">
            <p className="text-[11px] sm:text-sm font-medium">
              Lari Pagi, Semangat Baru
            </p>
          </div>
        </div>

        {/* Foto 3: Orang nongkrong pakai sneakers */}
        <div className="relative flex-1 h-[160px] sm:h-[380px] rounded-lg overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800"
            alt="Orang nongkrong santai pakai sneakers"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-white">
            <p className="text-[11px] sm:text-sm font-medium">
              Santai Tetap Stylish
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
