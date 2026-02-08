/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react"
import NewsCard from "../components/NewsCard"
import { motion } from "framer-motion"
import { slideInLeft, fadeInUp, staggerContainer } from "../utils/animations"

const ITEMS_PER_PAGE = 9; 

interface BeritaClientDisplayProps {
  beritas: any[];
  type?: 'berita' | 'pengumuman';
}

export default function BeritaClientDisplay({ 
  beritas, 
  type = 'berita'
}: BeritaClientDisplayProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredBeritas = beritas.filter(item => {
    if (type === 'pengumuman') {
      return item.type === 'pengumuman';
    }
    return item.type === 'berita' || !item.type;
  });

  const loadMore = () => {
    setVisibleCount(prev => Math.min(filteredBeritas.length, prev + ITEMS_PER_PAGE));
  };

  const pageTitle = type === 'pengumuman' ? 'Pengumuman Terbaru' : 'Berita Terbaru';
  const emptyMessage = type === 'pengumuman' 
    ? 'Belum ada pengumuman yang dipublikasikan.'
    : 'Belum ada berita yang dipublikasikan.';

  if (filteredBeritas.length === 0) {
    return (
      <section className="relative">
        <motion.div
          {...slideInLeft}
          className="container max-w-7xl mx-auto px-4 pt-2 md:pt-20 pb-12 relative z-10"
        >
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-3xl font-bold text-center">{pageTitle}</h1>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {emptyMessage}
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
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-center">{pageTitle}</h1>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredBeritas.slice(0, visibleCount).map((news, idx) => (
            <motion.div key={news.id} variants={fadeInUp} custom={idx}>
              <NewsCard {...news} />
            </motion.div>
          ))}
        </motion.div>

        {visibleCount < filteredBeritas.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-white bg-primary"
            >
              Muat Lebih Banyak ({filteredBeritas.length - visibleCount} tersisa)
            </button>
          </div>
        )}
      </motion.div>
    </section>
  )
}
