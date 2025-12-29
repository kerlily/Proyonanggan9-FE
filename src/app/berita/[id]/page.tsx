import { fetchBeritaById, formatDate } from "@/lib/api";
import Image from "next/image";
import { Metadata } from "next";

export const revalidate = 3600;

// Generate dynamic metadata untuk SEO
export async function generateMetadata({ 
  params 
}: { 
  params?: Promise<Record<string, string | string[] | undefined>> | undefined 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams && typeof resolvedParams.id === 'string' ? resolvedParams.id : undefined;
  
  if (!id) {
    return {
      title: 'Berita Tidak Ditemukan',
      description: 'Halaman berita yang Anda cari tidak ditemukan'
    };
  }

  const berita = await fetchBeritaById(id);

  if (!berita) {
    return {
      title: 'Berita Tidak Ditemukan',
      description: 'Berita yang Anda cari tidak tersedia'
    };
  }

  return {
    title: berita.title,
    description: berita.description.substring(0, 160),
    keywords: [
      berita.title,
      "berita sekolah",
      "SD Proyonanggan 09",
      "berita pendidikan Batang"
    ],
    openGraph: {
      title: berita.title,
      description: berita.description.substring(0, 160),
      images: [berita.image_url],
      type: 'article',
      publishedTime: berita.published_at || undefined,
      authors: ['SD Negeri Proyonanggan 09'],
    },
    twitter: {
      card: 'summary_large_image',
      title: berita.title,
      description: berita.description.substring(0, 160),
      images: [berita.image_url],
    },
    alternates: {
      canonical: `https://sdnproyonanggan9.my.id/berita/${id}`
    }
  };
}

export default async function BeritaDetail({ 
  params 
}: { 
  params?: Promise<Record<string, string | string[] | undefined>> | undefined 
}) {
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
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": berita.title,
            "image": [berita.image_url],
            "datePublished": berita.published_at,
            "dateModified": berita.published_at,
            "author": {
              "@type": "Organization",
              "name": "SD Negeri Proyonanggan 09",
              "url": "https://sdnproyonanggan9.my.id"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SD Negeri Proyonanggan 09",
              "logo": {
                "@type": "ImageObject",
                "url": "https://sdnproyonanggan9.my.id/logo.png"
              }
            },
            "description": berita.description.substring(0, 160)
          }),
        }}
      />

      <article className="container pt-20 max-w-3xl mx-auto px-4 py-12">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{berita.title}</h1>
          
          <div className="relative w-full h-64 md:h-96 mb-4">
            <Image 
              src={berita.image_url} 
              alt={berita.title} 
              fill 
              className="object-cover rounded"
              priority
            />
          </div>
          
          <time 
            dateTime={berita.published_at || undefined}
            className="text-gray-500 dark:text-gray-400 mb-4 block"
          >
            {formatDate(berita.published_at)}
          </time>
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {berita.description}
          </p>
        </div>
      </article>
    </>
  );
}