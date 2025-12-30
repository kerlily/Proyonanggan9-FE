// app/not-found.tsx
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen text-gray-900 dark:text-white transition-colors duration-300 dark:bg-gray-900">
      <div className="container min-h-screen flex items-center justify-center">
        {/* Center the pair (text + image) and reduce gap so image sits dekat teks on desktop */}
        <div className="w-full flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-center gap-8 lg:gap-6">

          {/* IMAGE (DESKTOP ONLY) */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:shrink-0">
            <Image
              src="/404.png"
              alt="Karakter bingung"
              width={300}
              height={300}
              priority
              className="opacity-95"
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="max-w-md">
            <h1 className="text-7xl sm:text-8xl font-bold text-primary mb-4 animate-bounce">
              404
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              Halaman Tidak Ditemukan
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
              Oops! Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.
            </p>

            <Link
              href="/"
              className="inline-flex items-center justify-center w-full sm:w-auto btn btn-primary px-6 py-3"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
