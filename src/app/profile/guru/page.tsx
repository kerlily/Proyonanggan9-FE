import { Metadata } from 'next'
import { fetchGurus, transformGuruForComponent } from '@/lib/api'
import GuruClientDisplay from './GuruClient'

export const metadata: Metadata = {
  title: 'Guru & Tenaga Pendidik',
  description: 'Daftar guru dan tenaga pendidik profesional SD Negeri Proyonanggan 09 Batang',
  keywords: ['guru SD Proyonanggan', 'tenaga pendidik Batang'],
  alternates: {
    canonical: 'https://sdnproyonanggan9.my.id/profile/guru'
  }
}

export const revalidate = 86400; 
export default async function GuruPage() {
  const gurusData = await fetchGurus();
  const transformedGurus = gurusData.map(transformGuruForComponent);
  
  return <GuruClientDisplay gurus={transformedGurus} />;
}