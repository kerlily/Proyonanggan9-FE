// src/app/contact/ContactInfo.tsx
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

// Pure SSG
export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Informasi Kontak</h2>
        <p className="text-secondary">
          Silakan hubungi kami melalui informasi berikut atau kirimkan pesan
          langsung melalui formulir.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 hover:translate-x-2 transition-transform">
          <FaEnvelope className="h-6 w-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <a
              href="mailto:sdnproyonanggan09@gmail.com"
              className="text-secondary hover:text-primary"
            >
              sdnproyonanggan09@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 hover:translate-x-2 transition-transform">
          <FaPhone className="h-6 w-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Telepon</h3>
            <a
              href="tel:+62285392825"
              className="text-secondary hover:text-primary"
            >
              (0285) 392825
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 hover:translate-x-2 transition-transform">
          <FaMapMarkerAlt className="h-6 w-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Alamat</h3>
            <p className="text-secondary">
              Jl. Ki Mangun Sarkoro No. 4,<br />
              Kel. Proyonanggan Selatan,<br />
              Kab. Batang, Jawa Tengah
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}