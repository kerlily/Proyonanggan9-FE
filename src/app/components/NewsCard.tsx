import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { cardHover } from "../utils/animations";


interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  variants?: Variants;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, excerpt, imageUrl, date, variants }) => {
  return (
    <motion.div
  variants={variants}
  whileHover={cardHover.whileHover}
  transition={{ type: "spring", stiffness: 300 }}
      className="bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-shadow duration-300 overflow-hidden"
      style={{ zIndex: 10, transformOrigin: 'center' }}
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[220px]">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
          <h3 className="text-lg font-semibold mt-1 mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{excerpt}</p>
        </div>

        <Link
          href={`/berita/${id}`}
          className="mt-4 inline-block text-primary font-semibold hover:underline"
        >
          Baca selengkapnya →
        </Link>
      </div>
  </motion.div>
  );
};

export default NewsCard;
