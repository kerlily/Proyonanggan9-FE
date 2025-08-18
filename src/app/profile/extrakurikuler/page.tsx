import Image from "next/image";
import { intrakurikuler, ekstrakurikuler } from "@/contents/extrakurikuler";

export default function EkstrakurikulerPage() {
  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 pt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Kegiatan Intra & Ekstrakurikuler
      </h1>

      {/* Intrakurikuler */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Intrakurikuler
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {intrakurikuler.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ekstrakurikuler */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Ekstrakurikuler
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ekstrakurikuler.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
