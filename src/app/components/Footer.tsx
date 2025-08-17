import Link from 'next/link'
import { FaFacebook, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-dark  border-t border-gray-200 dark:border-gray-800">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Bagian Atas Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Profil Sekolah */}
          <div className='hidden md:block mt-8'>
            <h2 className="text-xl font-bold text-primary">SD Negeri Proyonanggan 09</h2>
            <p className="text-sm text-secondary mt-3">
              “Terwujudnya peserta didik yang berkarakter, berprestasi, dan peduli lingkungan”
            </p>
            <p className="text-sm text-secondary mt-2">
              Unggul dalam karakter, prestasi, dan kepedulian terhadap lingkungan.
            </p>
          </div>

          {/* Kontak */}
          <div className='hidden md:block mt-8'>
            <h3 className="text-lg font-semibold text-primary">Kontak</h3>
            <ul className="mt-3 space-y-2 text-secondary text-sm">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" /> 
                Jl. Ki Mangun Sarkoro No.4, Proyonanggan Selatan, Batang, Jawa Tengah
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-primary" /> 
                (0285) 123456
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-primary" /> 
                sdnproyonanggan09@sekolah.sch.id
              </li>
            </ul>
          </div>

          {/* Link Cepat */}
          <div className='hidden md:block mt-8'>
            <h3 className="text-lg font-semibold text-primary">Link Cepat</h3>
            <ul className="mt-3 space-y-2 text-secondary text-sm">
              <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
              <li><Link href="/profil" className="hover:text-primary">Profil Sekolah</Link></li>
              <li><Link href="/artikel" className="hover:text-primary">Artikel</Link></li>
              <li><Link href="/lms" className="hover:text-primary">E-Learning</Link></li>
              <li><Link href="/kontak" className="hover:text-primary">Kontak</Link></li>
            </ul>
          </div>

          {/* Peta Lokasi */}
          <div className='hidden md:block mt-8'>
            <h3 className="text-lg font-semibold text-primary">Lokasi Kami</h3>
            <div className="mt-3 w-full h-40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.75270984499!2d109.72917247507856!3d-6.920138693079519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70249ecf9c8d4d%3A0x957b451204d03f96!2sSD%20Negeri%20Proyonanggan%209!5e0!3m2!1sen!2sus!4v1755248326288!5m2!1sen!2sus" 
                width="100%"
                height="100%"
                style={{ border: 0 }}   
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Garis Pemisah */}
        <div className="hidden md:block border-t border-gray-300 dark:border-gray-700 my-8"></div>

        {/* Bagian Bawah Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-secondary">
          <p>© {new Date().getFullYear()} SD Negeri Proyonanggan 09. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaFacebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
