 /* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import GuruCard from "@/app/components/GuruCard"
import { motion } from "framer-motion"
import { slideInLeft, fadeInUp, staggerContainer, cardHover } from "@/app/utils/animations"

interface GuruClientDisplayProps {
  gurus: any[];
}

export default function GuruClientDisplay({ gurus }: GuruClientDisplayProps) {
  if (gurus.length === 0) {
    return (
      <section className="container max-w-7xl mx-auto px-4 py-12 pt-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Daftar Guru & Tenaga Pendidik
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Data guru sedang tidak tersedia.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 pt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Daftar Guru & Tenaga Pendidik
      </h1>

      <motion.div
        {...slideInLeft}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {gurus.map((guru, idx) => (
          <motion.div
            whileHover={cardHover.whileHover}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            style={{ zIndex: 10, transformOrigin: 'center' }}
            key={guru.id}
            variants={fadeInUp}
            custom={idx}
          >
            <GuruCard
              nama={guru.nama}
              nip={guru.nip}
              imageUrl={guru.imageUrl}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}