/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const MotionDiv = dynamic<any>(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg" />
    ),
  }
);

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  type?: string;  
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, excerpt, imageUrl, date, type }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative w-full h-48">
         {/* Badge Pengumuman di atas gambar */}
        {type === 'pengumuman' && (
          <div className="absolute top-2 left-2 z-10">
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
              📢 PENGUMUMAN
            </span>
          </div>
        )}
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
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
          prefetch={false}
        >
          Baca selengkapnya →
        </Link>
      </div>
    </MotionDiv>
  );
};

export default NewsCard;
