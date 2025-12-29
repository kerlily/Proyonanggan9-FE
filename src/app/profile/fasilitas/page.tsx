import { Metadata } from "next";
import FasilitasClient from "./FasilitasClient";

export const metadata: Metadata = {
  title: "Fasilitas Sekolah",
  description:
    "Fasilitas lengkap SD Negeri Proyonanggan 09 Batang untuk mendukung proses belajar mengajar yang optimal bagi siswa-siswi.",
  keywords: [
    "fasilitas sekolah SD Proyonanggan",
    "ruang kelas nyaman",
    "perpustakaan lengkap",
    "fasilitas olahraga",
    "fasilitas kesehatan",
  ],
  openGraph: {
    title: "Fasilitas Sekolah - SD Negeri Proyonanggan 09",
    description:
      "Jelajahi fasilitas unggulan di SD Negeri Proyonanggan 09 Batang yang mendukung pembelajaran efektif dan kenyamanan siswa.",
  },
  alternates: {
    canonical: "https://sdnproyonanggan9.my.id/profile/fasilitas",
  }
}

export const revalidate = 2592000 

export default function FasilitasPage() {
  return <FasilitasClient />;
}