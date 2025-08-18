import { beritaDummy } from "../../../contents/NewsList";
import Image from "next/image";

export default async function BeritaDetail({ params }: { params?: Promise<Record<string, string | string[] | undefined>> | undefined }) {
  // Await params (Next's generated PageProps expects params to be Promise-wrapped)
  const resolvedParams = await params;
  const id = resolvedParams && typeof resolvedParams.id === 'string' ? resolvedParams.id : undefined;
  const berita = beritaDummy.find((item) => item.id === id);

  if (!berita) return <div className="container max-w-3xl mx-auto px-4 py-12">Berita tidak ditemukan.</div>;

  return (
    <div className="container pt-20 max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">{berita.title}</h1>
      <div className="relative w-full h-64 mb-4">
        <Image src={berita.imageUrl} alt={berita.title} fill className="object-cover rounded" />
      </div>
      <p className="text-gray-500 mb-2">{berita.date}</p>
      <p className="text-lg text-gray-700 dark:text-gray-300">{berita.excerpt}</p>
    </div>
  );
}
