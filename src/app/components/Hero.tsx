'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, slideInLeft } from '../utils/animations'
import HeroSlide from "./HeroSlide"
import NewsCarousel from './NewsCarousel'
import { fetchBeritas, fetchGalleries, transformBeritaForComponent, transformGalleryForComponent } from '@/lib/api'
import SchoolInfoLoader from './SchoolInfoLoader'

const Hero = () => {
  const [beritaList, setBeritaList] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Load beritas
        const beritas = await fetchBeritas();
        const transformedBeritas = beritas.map(transformBeritaForComponent);
        setBeritaList(transformedBeritas);

        // Load galleries
        const galleries = await fetchGalleries();
        const transformedGalleries = galleries.map(transformGalleryForComponent);
        setGalleryItems(transformedGalleries);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <section className="relative">
      {/* Hero Slide Full Width */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 relative overflow-hidden shadow-lg "
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
        <motion.div
          {...slideInLeft}
          transition={{ duration: 0.5, delayChildren: 0.4 }}
          className=""
        >
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">Memuat berita...</p>
            </div>
          ) : (
            <div className="px-4">
              <NewsCarousel items={beritaList} />
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* School Info */}
      <motion.div 
        {...slideInLeft}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <SchoolInfoLoader />
      </motion.div>

    </section>
  )
}

export default Hero