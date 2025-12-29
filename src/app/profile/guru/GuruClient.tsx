 /* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react"
import GuruCard from "@/app/components/GuruCard"
import { fetchGurus, transformGuruForComponent } from "@/lib/api"
import { motion } from "framer-motion"
import { slideInLeft, fadeInUp, staggerContainer, cardHover } from "@/app/utils/animations"

export default function GuruClient() {
  const [guruList, setGuruList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGurus() {
      try {
        const gurusData = await fetchGurus()
        const transformed = gurusData.map(transformGuruForComponent)
        setGuruList(transformed)
      } catch (error) {
        console.error('Error loading gurus:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGurus()
  }, [])

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 pt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Daftar Guru & Tenaga Pendidik
      </h1>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Memuat data guru...</p>
        </div>
      ) : guruList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Data guru sedang tidak tersedia.
          </p>
        </div>
      ) : (
        <motion.div
          {...slideInLeft}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {guruList.map((guru, idx) => (
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
      )}
    </section>
  )
}