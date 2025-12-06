'use client';
import Image from "next/image";
import { motion } from 'framer-motion'
import {
  fadeInDown,
  slideInLeft,
} from '../../utils/animations'

export default function SejarahPage() {
  return (
    <section className="container max-w-6xl mx-auto px-4 py-12 pt-20">
      {/* Judul */}
      <motion.h1
        {...fadeInDown}
      transition={{ ...fadeInDown.transition, delay: 0.2 }}
      className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Sejarah SD Negeri Proyonanggan 09
      </motion.h1>

      {/* Gambar Header */}
      <motion.div
      {...fadeInDown}
      
      transition={{ ...fadeInDown.transition, delay: 0.4 }}
      className="relative w-3/5 mx-auto aspect-video mb-8">
        <Image
          src="/sekolah/depan_L.jpg" 
          alt="Sejarah SD Negeri Proyonanggan 09"
          fill
          className="object-cover rounded-lg shadow-lg"
        />
      </motion.div>


      {/* Konten */}
      <div
      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 md:p-8 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
        <motion.p
        {...slideInLeft}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-4">
          SD Negeri Proyonanggan 09 Batang berdiri sebagai salah satu sekolah dasar negeri 
          yang berkomitmen untuk memberikan pendidikan dasar yang berkualitas bagi 
          masyarakat sekitar. Sejak awal berdirinya, sekolah ini menjadi bagian penting 
          dalam mencerdaskan kehidupan bangsa di Kabupaten Batang.
        </motion.p>
        <motion.p
        {...slideInLeft}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mb-4">
          Seiring berjalannya waktu, SD Negeri Proyonanggan 09 terus berkembang baik dari segi 
          sarana dan prasarana maupun kualitas tenaga pendidik. Hal ini dibuktikan dengan 
          peningkatan jumlah siswa setiap tahunnya serta prestasi yang berhasil diraih di 
          berbagai bidang, baik akademik maupun non-akademik.
        </motion.p>
        <motion.p
        {...slideInLeft}
        transition={{ duration: 0.5, delay: 1 }}
        >

          Dengan semangat kebersamaan, sekolah ini berupaya mencetak generasi penerus bangsa 
          yang berkarakter, disiplin, berprestasi, dan peduli terhadap lingkungan. Nilai-nilai 
          tersebut menjadi dasar dalam perjalanan panjang sejarah SD Negeri Proyonanggan 09 
          hingga saat ini.
        </motion.p>
      </div>
    </section>
  );
}
