import { Metadata } from "next";
import VisiMisiClient from "./VisiMisiClient";

export const metadata: Metadata = {
  title: 'Visi & Misi',
  description: 'Visi dan Misi SD Negeri Proyonanggan 09 Batang: Mewujudkan siswa yang cerdas, terampil, beriman, bertaqwa, berakhlak mulia, dan peduli lingkungan',
  keywords: ['visi misi SD Proyonanggan', 'tujuan sekolah', 'visi pendidikan'],
  openGraph: {
    title: 'Visi & Misi - SD Negeri Proyonanggan 09',
    description: 'Terwujudnya siswa yang cerdas, terampil, beriman, bertaqwa, berakhlak mulia, serta peduli terhadap lingkungan',
    images: ['/sekolah/depan_P.JPG'],
  },
  alternates: {
    canonical: 'https://sdnproyonanggan9.my.id/profile/visi-misi'
  }
};

export default function VisiMisi() {
  return <VisiMisiClient />;
}