// src/app/pengumuman/page.tsx (buat file baru - copy dari berita/page.tsx)
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { Metadata } from 'next'
import { fetchPengumuman, transformBeritaForComponent } from '@/lib/api'
import BeritaClientDisplay from '../berita/BeritaClient' // REUSE!

export const metadata: Metadata = {
  title: 'Pengumuman',
  description: 'Pengumuman penting SD Negeri Proyonanggan 09 Batang',
}

export default async function PengumumanPage() {
  const pengumuman = await fetchPengumuman();
  const transformed = pengumuman.map(transformBeritaForComponent);
  
  return <BeritaClientDisplay beritas={transformed} />; // REUSE component!
}