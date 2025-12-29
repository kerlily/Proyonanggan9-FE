import { Metadata } from "next";
import GalleryClient from "./GalleryClient";

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

export const revalidate = 2592000 // Cache 30 hari

export default function GalleryPage() {
  return <GalleryClient />;
  }