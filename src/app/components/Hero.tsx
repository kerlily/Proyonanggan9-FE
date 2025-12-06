/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, slideInLeft } from '../utils/animations'
import HeroSlide from "./HeroSlide"
import NewsCarousel from './NewsCarousel'
import { fetchBeritas, transformBeritaForComponent } from '@/lib/api'
import SchoolInfoLoader from './SchoolInfoLoader'
import LazyLoadOnScroll from './LazyLoadOnScroll'


const Hero = () => {
  const [beritaList, setBeritaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Load beritas
        const beritas = await fetchBeritas();
        const transformedBeritas = beritas.map(transformBeritaForComponent);
        setBeritaList(transformedBeritas);

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

       {/* Circular Gallery */}
      <motion.div 
        {...slideInLeft}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ height: '600px', position: 'relative' }}
      >
      <LazyLoadOnScroll
        loader={() => import('./CircularGallery')}
        bend={0}
        textColor="#0077B6"
        borderRadius={0.05}
        scrollEase={0.02}
      />
      {/* <CircularGallery 
        bend={0}
        textColor="#0077B6"
        borderRadius={0.05}
        scrollEase={0.02}
      /> */}
      </motion.div>

    </section>
  )
}

export default Hero