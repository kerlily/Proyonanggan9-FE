import { Metadata } from 'next'
import BeritaClient from './BeritaClient'

export const metadata: Metadata = {
  title: 'Berita Terbaru',
  description: 'Berita dan informasi terkini SD Negeri Proyonanggan 09 Batang - kegiatan sekolah, prestasi siswa, dan pengumuman penting',
  keywords: ['berita SD Proyonanggan', 'informasi sekolah', 'kegiatan sekolah Batang'],
  openGraph: {
    title: 'Berita Terbaru - SD Negeri Proyonanggan 09',
    description: 'Update berita dan kegiatan terbaru SD Negeri Proyonanggan 09',
  },
  alternates: {
    canonical: 'https://sdnproyonanggan9.my.id/berita'
  }
}

export const revalidate = 3600 // Cache 1 jam

export default function BeritaPage() {
  return <BeritaClient />
}