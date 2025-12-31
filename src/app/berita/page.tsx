// src/app/berita/page.tsx
export const dynamic = 'force-static'
export const revalidate = 1800
export const fetchCache = 'default-cache'

import { Metadata } from 'next'
import { fetchBeritas, transformBeritaForComponent } from '@/lib/api'
import BeritaClientDisplay from './BeritaClient'

export const metadata: Metadata = {
  title: 'Berita Terbaru',
  description: 'Berita dan informasi terkini SD Negeri Proyonanggan 09 Batang',
  alternates: {
    canonical: 'https://sdnproyonanggan9.my.id/berita'
  }
}

export default async function BeritaPage() {
  const beritas = await fetchBeritas();
  const transformedBeritas = beritas.map(transformBeritaForComponent);
  
  return <BeritaClientDisplay beritas={transformedBeritas} />;
}