// src/app/profile/sejarah/page.tsx
import { Metadata } from 'next'
import SejarahClient from './SejarahClient'

export const metadata: Metadata = {
  title: 'Sejarah Sekolah',
  description: 'Sejarah berdirinya SD Negeri Proyonanggan 09 Batang dan perjalanan panjangnya dalam mencerdaskan generasi bangsa',
  keywords: ['sejarah SD Proyonanggan', 'sejarah sekolah Batang', 'profil sekolah'],
  alternates: {
    canonical: 'https://sdnproyonanggan9.my.id/profile/sejarah'
  }
}

export default function SejarahPage() {
  return <SejarahClient />
}