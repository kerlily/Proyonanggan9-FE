// src/app/berita/[id]/page.tsx
import { fetchBeritaById, formatDate } from "@/lib/api";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>
}

// ✅ Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  if (!id) {
    return {
      title: 'Berita Tidak Ditemukan',
    };
  }

  const berita = await fetchBeritaById(id);

  if (!berita) {
    return {
      title: 'Berita Tidak Ditemukan',
    };
  }

  return {
    title: berita.title,
    description: berita.description.substring(0, 160),
    openGraph: {
      title: berita.title,
      description: berita.description.substring(0, 160),
      images: [berita.image_url],
      type: 'article',
    },
    alternates: {
      canonical: `https://sdnproyonanggan9.my.id/berita/${id}`
    }
  };
}

// ✅ SSR - no generateStaticParams
export default async function BeritaDetail({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  if (!id) {
    return <ErrorView message="ID berita tidak valid" />;
  }

  const berita = await fetchBeritaById(id);

  if (!berita) {
    return <ErrorView message="Berita tidak ditemukan" />;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": berita.title,
            "image": [berita.image_url],
            "datePublished": berita.published_at,
            "author": {
              "@type": "Organization",
              "name": "SD Negeri Proyonanggan 09"
            }
          }),
        }}
      />

      <article className="container pt-20 max-w-3xl mx-auto px-4 py-12">
        <Link 
          href="/berita" 
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          ← Kembali ke Berita
        </Link>

        <header>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{berita.title}</h1>
          
          <div className="relative w-full h-64 md:h-96 mb-4 rounded-lg overflow-hidden">
            <Image 
              src={berita.image_url} 
              alt={berita.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
          
          <time className="text-gray-500 dark:text-gray-400 mb-4 block">
            {formatDate(berita.published_at)}
          </time>
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {berita.description}
          </p>
        </div>
      </article>
    </>
  );
}

function ErrorView({ message }: { message: string }) {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 pt-20">
      <p className="text-center text-gray-600 dark:text-gray-400">{message}</p>
      <div className="text-center mt-4">
        <Link href="/berita" className="text-primary hover:underline">
          ← Kembali ke Berita
        </Link>
      </div>
    </div>
  );
}