import { Metadata } from 'next'
import { fetchBeritas, transformBeritaForComponent } from '@/lib/api'
import BeritaClientDisplay from './BeritaClient'

export const metadata: Metadata = {
  title: 'Berita Terbaru',
  description: 'Berita dan informasi terkini SD Negeri Proyonanggan 09 Batang',
  keywords: ['berita SD Proyonanggan', 'informasi sekolah'],
  alternates: {
    canonical: 'https://sdnproyonanggan9.my.id/berita'
  }
}

export const revalidate = 1800; // 30 menit (berita update lebih sering)

export default async function BeritaPage() {
  const beritas = await fetchBeritas();
  const transformedBeritas = beritas.map(transformBeritaForComponent);
  
  return <BeritaClientDisplay beritas={transformedBeritas} />;
}