'use client'

// ...existing code...
import NewsCard from "../components/NewsCard";
import { beritaDummy } from "../../contents/NewsList";
import HeroSlide from "../components/HeroSlide";
import { motion } from "framer-motion";
import { fadeIn, slideInLeft  } from "../utils/animations";

export default function BeritaPage() {
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
        className="container max-w-7xl mx-auto px-4 pt-2 md:pt-16 pb-12 relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Berita Terbaru</h1>
        <motion.div
        {...slideInLeft}
        transition={{ duration: 0.5, delayChildren: 0.4 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beritaDummy.map((news: {
            id: string;
            title: string;
            excerpt: string;
            imageUrl: string;
            date: string;
          }) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
