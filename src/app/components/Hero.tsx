 'use client'

import React from 'react'

import { motion } from 'framer-motion'
import { fadeInUp,fadeIn } from '../utils/animations'
import HeroSlide from "./HeroSlide"
import NewsCarousel from './NewsCarousel'
import { beritaDummy } from '../../contents/NewsList'
import { slideInLeft } from '../utils/animations'
import LazyLoadOnScroll from './LazyLoadOnScroll'



const Hero = () => {
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
        className="container max-w-7xl mx-auto px-4 pt-2 md:pt-16 pb-12 relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Berita Terbaru</h1>
        <motion.div
          {...slideInLeft}
          transition={{ duration: 0.5, delayChildren: 0.4 }}
          className="">
          {/* News carousel: horizontal, 1 per mobile, up to 3 per row on large screens */}
          <div className="px-4">
            <NewsCarousel items={beritaDummy} />
          </div>
        </motion.div>
      </motion.div>

  {/* Konten Hero */}
  <motion.div 
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
  <LazyLoadOnScroll loader={() => import('./SchoolInfo')} />
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
      </motion.div>
    </section>
  )
}

export default Hero
