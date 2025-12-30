"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideInLeft, fadeInUp, staggerContainer, cardHover } from "@/app/utils/animations";

const BATCH = 12; // Naikkan batch size

type Foto = {
  id: number;
  image_url: string;
};

export default function GalleryClientWrapper({ initialFotos }: { initialFotos: Foto[] }) {
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(initialFotos.length, prev + BATCH));
      setLoadingMore(false);
    }, 300);
  };

  if (initialFotos.length === 0) {
    return (
      <section className="container max-w-7xl mx-auto px-4 py-12 pt-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Gallery Foto</h1>
        <p className="text-center text-gray-500">Tidak ada foto tersedia</p>
      </section>
    );
  }

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 pt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Gallery Foto</h1>

      <motion.div
        {...slideInLeft}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {initialFotos.slice(0, visibleCount).map((foto, idx) => (
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
                sizes="(max-width: 768px) 50vw, 25vw"
                loading={idx < 12 ? "eager" : "lazy"}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {visibleCount < initialFotos.length && (
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
    </section>
  );
}