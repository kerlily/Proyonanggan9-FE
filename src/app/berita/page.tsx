/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import NewsCard from "../components/NewsCard";
import { fetchBeritas, transformBeritaForComponent } from "@/lib/api";
import HeroSlide from "../components/HeroSlide";
import { motion } from "framer-motion";
import { fadeIn, slideInLeft, fadeInUp, staggerContainer } from "../utils/animations";
import { useEffect, useState } from "react";

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBeritas() {
      try {
        const beritas = await fetchBeritas();
        const transformedBeritas = beritas.map(transformBeritaForComponent);
        setBeritaList(transformedBeritas);
      } catch (error) {
        console.error('Error loading beritas:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBeritas();
  }, []);

  return (
    <section className="relative">
      {/* Hero Slide Full Width */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 relative overflow-hidden shadow-lg"
      >
        <HeroSlide />
      </motion.div>

      {/* Konten Berita */}
      <motion.div
        {...slideInLeft}
        transition={{ duration: 0.5, delayChildren: 0.2 }}
        className="container max-w-7xl mx-auto px-4 pt-2 md:pt-16 pb-12 relative z-10"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Berita Terbaru</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Memuat berita...</p>
          </div>
        ) : beritaList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Belum ada berita yang dipublikasikan.
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {beritaList.map((news, idx) => (
              <motion.div key={news.id} variants={fadeInUp} custom={idx}>
                <NewsCard {...news} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}