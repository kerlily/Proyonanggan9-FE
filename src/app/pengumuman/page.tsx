// src/app/pengumuman/page.tsx
import { Metadata } from 'next'
import { fetchPengumuman, transformBeritaForComponent } from '@/lib/api'
import BeritaClientDisplay from '../berita/BeritaClient'

export const metadata: Metadata = {
  title: 'Pengumuman',
  description: 'Pengumuman penting SD Negeri Proyonanggan 09 Batang',
  alternates: {
    canonical: 'https://sdnproyonanggan9.my.id/pengumuman'
  }
}

export default async function PengumumanPage() {
  const pengumuman = await fetchPengumuman();
  const transformed = pengumuman.map(transformBeritaForComponent);
  
  // ✅ Pass type="pengumuman"
  return <BeritaClientDisplay beritas={transformed} type="pengumuman" />;
}