"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideInLeft, fadeInUp, staggerContainer, cardHover } from "@/app/utils/animations";

type Foto = {
  id: number;
  image_url: string;
};

const BATCH = 6; // jumlah item yang dimunculkan di awal + setiap load more

export default function GalleryPage() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://proyonanggan.my.id/api/galleries")
      .then((res) => res.json())
      .then((data) => {
        setFotos(data.galleries || []);
        setVisibleCount(Math.min(BATCH, (data.galleries || []).length));
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data gallery.");
      })
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(fotos.length, prev + BATCH));
      setLoadingMore(false);
    }, 300);
  };

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 pt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Gallery Foto
      </h1>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow animate-pulse">
              <div className="w-full aspect-4/3 bg-gray-300 rounded-md mb-3" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      {!loading && !error && (
        <>
          <motion.div
            {...slideInLeft}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {fotos.slice(0, visibleCount).map((foto, idx) => (
              <motion.div
                key={foto.id}
                variants={fadeInUp}
                custom={idx}
                whileHover={cardHover.whileHover}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full aspect-4/3">
                  <Image
                    src={foto.image_url}
                    alt={`galeri-${foto.id}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading={idx < 6 ? "eager" : "lazy"}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {visibleCount < fotos.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loadingMore ? "Memuat..." : "Muat lagi"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
