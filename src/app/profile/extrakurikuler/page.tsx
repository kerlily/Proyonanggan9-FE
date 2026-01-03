import { Metadata } from 'next'
import EkstrakurikulerClient from './EkstrakurikulerClient'

export const metadata: Metadata = {
  title: 'Kegiatan Intra & Ekstrakurikuler',
  description: 'Program ekstrakurikuler SD Negeri Proyonanggan 09: Pramuka, Drumband, Pencak Silat, Hadrah, dan kegiatan olahraga',
  keywords: ['ekstrakurikuler SD Proyonanggan', 'pramuka', 'drumband', 'pencak silat'],
  alternates: {
    canonical: 'https://sdnproyonanggan9.my.id/profile/extrakurikuler'
  }
}

export default function EkstrakurikulerPage() {
  return <EkstrakurikulerClient />
}