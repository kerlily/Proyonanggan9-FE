/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react"
import NewsCard from "../components/NewsCard"
import { motion } from "framer-motion"
import { slideInLeft, fadeInUp, staggerContainer } from "../utils/animations"

const ITEMS_PER_PAGE = 9; // 9 item per halaman

interface BeritaClientDisplayProps {
  beritas: any[];
}

export default function BeritaClientDisplay({ beritas }: BeritaClientDisplayProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(beritas.length, prev + ITEMS_PER_PAGE));
  };

  if (beritas.length === 0) {
    return (
      <section className="relative">
        <motion.div
          {...slideInLeft}
          className="container max-w-7xl mx-auto px-4 pt-2 md:pt-20 pb-12 relative z-10"
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Berita Terbaru</h1>
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Belum ada berita yang dipublikasikan.
            </p>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative">
      <motion.div
        {...slideInLeft}
        transition={{ duration: 0.5, delayChildren: 0.2 }}
        className="container max-w-7xl mx-auto px-4 pt-2 md:pt-20 pb-12 relative z-10"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Berita Terbaru</h1>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {beritas.slice(0, visibleCount).map((news, idx) => (
            <motion.div key={news.id} variants={fadeInUp} custom={idx}>
              <NewsCard {...news} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleCount < beritas.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Muat Lebih Banyak ({beritas.length - visibleCount} tersisa)
            </button>
          </div>
        )}
      </motion.div>
    </section>
  )
}