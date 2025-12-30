import { Metadata } from "next";
import GalleryClientWrapper from "./GalleryClient";

async function getGalleryData() {
  try {
    const res = await fetch('https://proyonanggan.my.id/api/galleries', {
      next: { revalidate: 86400 } // Cache 24 jam (lebih realistis)
    });
    
    if (!res.ok) throw new Error('Failed to fetch');
    
    const data = await res.json();
    return data.galleries || [];
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Gallery Foto Sekolah",
  description:
    "Koleksi foto kegiatan dan momen berharga di SD Negeri Proyonanggan 09 Batang yang menampilkan suasana belajar mengajar serta acara sekolah.",
  keywords: [
    "foto sekolah SD Proyonanggan",
    "kegiatan sekolah",
    "momens sekolah",
    "fasilitas sekolah",
  ],
  openGraph: {
    title: "Gallery Foto Sekolah - SD Negeri Proyonanggan 09",
    description:
      "Jelajahi galeri foto SD Negeri Proyonanggan 09 Batang yang menampilkan berbagai kegiatan seru dan fasilitas unggulan sekolah kami.",
  },
  alternates: {
    canonical: "https://sdnproyonanggan9.my.id/gallery",
  }
}

export const revalidate = 86400; 

export default async function GalleryPage() {
  const fotos = await getGalleryData();
  
  return <GalleryClientWrapper initialFotos={fotos} />;
}