// src/app/contact/page.tsx
import { Metadata } from 'next'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Hubungi SD Negeri Proyonanggan 09 Batang melalui formulir kontak, email, telepon, atau kunjungi langsung alamat kami',
  keywords: ['kontak SD Proyonanggan', 'hubungi sekolah Batang', 'alamat SD Proyonanggan'],
  alternates: {
    canonical: 'https://sdnproyonanggan9.my.id/contact'
  }
}


export default function ContactPage() {
  return (
    <div className="container max-w-7xl mx-auto py-12 pt-20">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Hubungi Kami
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  )
}