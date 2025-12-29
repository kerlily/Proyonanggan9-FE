import { Metadata } from 'next'
import GuruClient from './GuruClient'

export const metadata: Metadata = {
  title: 'Guru & Tenaga Pendidik',
  description: 'Daftar guru dan tenaga pendidik profesional SD Negeri Proyonanggan 09 Batang yang berdedikasi dalam mendidik siswa-siswi',
  keywords: ['guru SD Proyonanggan', 'tenaga pendidik Batang', 'staf pengajar'],
  openGraph: {
    title: 'Guru & Tenaga Pendidik - SD Negeri Proyonanggan 09',
    description: 'Kenali guru-guru profesional di SD Negeri Proyonanggan 09',
  },
  alternates: {
    canonical: 'https://sdnproyonanggan9.my.id/profile/guru'
  }
}

export const revalidate = 86400 // Cache 24 jam

export default function GuruPage() {
  return <GuruClient />
}