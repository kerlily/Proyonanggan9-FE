'use client'

import Image from "next/image";
import { fasilitasList } from "@/contents/fasilitas";
import { motion } from "framer-motion";
import { slideInLeft, fadeInUp, staggerContainer, cardHover } from "@/app/utils/animations";

export default function FasilitasPage() {
  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 pt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Fasilitas Sekolah
      </h1>

      <motion.div
        {...slideInLeft}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {fasilitasList.map((fasilitas, idx) => (
          <motion.div
            key={fasilitas.id}
            variants={fadeInUp}
            custom={idx}
            whileHover={cardHover.whileHover}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            style={{ zIndex: 10, transformOrigin: 'center' }}
          >
            <div className="relative w-full aspect-video">
              <Image
                src={fasilitas.imageUrl}
                alt={fasilitas.nama}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {fasilitas.nama}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {fasilitas.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
