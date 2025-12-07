'use client';

import Image from "next/image";
import { motion } from 'framer-motion'
import {
  fadeInDown,
  fadeInLeft,
  fadeInRight,
} from '../../utils/animations'

export default function VisiMisi() {
  return (
    <section className="container max-w-6xl mx-auto px-4 py-12">
      <motion.h2
      {...fadeInDown}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-3xl md:text-4xl font-bold text-center p-10  text-gray-900 dark:text-white">
        Visi & Misi
      </motion.h2>

      <div
      className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visi */}
        <motion.div        
      {...fadeInLeft}
      transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
          {/* Gambar */}
          <div className="p-4">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image
                src="/sekolah/depan_P.JPG"
                alt="Visi Sekolah"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Konten */}
          <div className="px-6 pb-6 md:px-8 md:pb-8 flex-1">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Visi
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              Terwujudnya siswa yang cerdas, terampil, beriman, bertaqwa,
              berakhlak mulia, serta peduli terhadap lingkungan.
            </p>
          </div>
        </motion.div>

        {/* Misi */}
        <motion.div
        
      {...fadeInRight}
      transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
          {/* Gambar */}
          <div className="p-4">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image
                src="/sekolah/lapangan.JPG"
                alt="Misi Sekolah"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Konten */}
          <div className="px-6 pb-6 md:px-8 md:pb-8 flex-1">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Misi
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              <li>Meningkatkan kualitas pembelajaran yang aktif, kreatif, dan menyenangkan.</li>
              <li>Menanamkan nilai iman, taqwa, dan akhlak mulia.</li>
              <li>Mendorong siswa untuk berprestasi dalam bidang akademik dan non-akademik.</li>
              <li>Mengembangkan keterampilan serta kepedulian terhadap lingkungan.</li>
              <li>Menciptakan lingkungan sekolah yang aman, nyaman, dan kondusif.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
