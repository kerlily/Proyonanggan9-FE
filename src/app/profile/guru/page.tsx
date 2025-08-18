'use client'
import GuruCard from "@/app/components/GuruCard";
import { guruList } from "@/contents/guru";
import { motion } from "framer-motion";
import { slideInLeft, fadeInUp, staggerContainer } from "@/app/utils/animations";

export default function GuruPage() {
  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 pt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Daftar Guru & Tenaga Pendidik
      </h1>

      <motion.div
        {...slideInLeft}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {guruList.map((guru, idx) => (
          <motion.div key={guru.id} variants={fadeInUp} custom={idx}>
            <GuruCard
              key={guru.id}
              nama={guru.nama}
              jabatan={guru.jabatan}
              imageUrl={guru.imageUrl}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
