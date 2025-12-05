import { fetchBeritaById, formatDate } from "@/lib/api";
import Image from "next/image";

export const revalidate = 3600; // Revalidate every hour

export default async function BeritaDetail({ 
  params 
}: { 
  params?: Promise<Record<string, string | string[] | undefined>> | undefined 
}) {
  // Await params
  const resolvedParams = await params;
  const id = resolvedParams && typeof resolvedParams.id === 'string' ? resolvedParams.id : undefined;
  
  if (!id) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12 pt-20">
        <p className="text-center text-gray-600 dark:text-gray-400">
          ID berita tidak valid.
        </p>
      </div>
    );
  }

  // Fetch berita from API
  const berita = await fetchBeritaById(id);

  if (!berita) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12 pt-20">
        <p className="text-center text-gray-600 dark:text-gray-400">
          Berita tidak ditemukan.
        </p>
      </div>
    );
  }

  return (
    <div className="container pt-20 max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{berita.title}</h1>
      
      <div className="relative w-full h-64 md:h-96 mb-4">
        <Image 
          src={berita.image_url} 
          alt={berita.title} 
          fill 
          className="object-cover rounded" 
        />
      </div>
      
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        {formatDate(berita.published_at)}
      </p>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {berita.description}
        </p>
      </div>
    </div>
  );
}