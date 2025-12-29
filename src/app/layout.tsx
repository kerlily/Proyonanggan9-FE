// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ CARA 1: metadataBase di dalam metadata object
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : "https://sdnproyonanggan9.my.id"
  ),
  
  title: {
    default: "SD Negeri Proyonanggan 09 Batang - Sekolah Dasar Berkualitas",
    template: "%s | SD Negeri Proyonanggan 09"
  },
  
  description: "SD Negeri Proyonanggan 09 Batang adalah sekolah dasar negeri berkualitas di Jl. Ki Mangun Sarkoro No.4, Batang, Jawa Tengah. Mencetak siswa berkarakter, berprestasi, dan peduli lingkungan.",
  
  keywords: [
    "SD Negeri Proyonanggan 09",
    "SDN Proyonanggan 9",
    "Sekolah Dasar Batang",
    "SD Negeri Batang",
    "Proyonanggan Batang",
    "Pendidikan Batang",
  ],
  
  authors: [{ name: "SD Negeri Proyonanggan 09 Batang" }],
  creator: "SD Negeri Proyonanggan 09",
  publisher: "SD Negeri Proyonanggan 09",
  
  // Geo targeting
  other: {
    "geo.region": "ID-JT",
    "geo.placename": "Batang",
    "geo.position": "-6.920139;109.731161"
  },

  // Open Graph
  openGraph: {
    title: "SD Negeri Proyonanggan 09 Batang - Sekolah Dasar Berkualitas",
    description: "Sekolah dasar negeri berkualitas di Batang dengan fasilitas lengkap dan tenaga pendidik profesional",
    url: "/", // ✅ Relative URL, akan digabung dengan metadataBase
    siteName: "SD Negeri Proyonanggan 09",
    images: [
      {
        url: "/logo.png", // ✅ Relative URL
        width: 1200,
        height: 630,
        alt: "Logo SD Negeri Proyonanggan 09",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "SD Negeri Proyonanggan 09 Batang",
    description: "Sekolah dasar negeri berkualitas di Batang, Jawa Tengah",
    images: ["/logo.png"], // ✅ Relative URL
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical (relative)
  alternates: {
    canonical: "/",
  },

  // Google verification
  verification: {
    google: "google60a7787a0e7a22b5",
  },

  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://proyonanggan.my.id" />
        <link rel="dns-prefetch" href="https://proyonanggan.my.id" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white transition-colors dark:bg-gray-900 dark:text-white`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main> 
          <Footer />
        </ThemeProvider>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "School",
              "@id": "https://sdnproyonanggan9.my.id/#school",
              name: "SD Negeri Proyonanggan 09",
              alternateName: "SDN Proyonanggan 9",
              url: "https://sdnproyonanggan9.my.id",
              logo: {
                "@type": "ImageObject",
                url: "https://sdnproyonanggan9.my.id/logo.png",
                width: 200,
                height: 200
              },
              image: [
                "https://sdnproyonanggan9.my.id/logo.png",
                "https://sdnproyonanggan9.my.id/sekolah/depan_L.JPG"
              ],
              description: "SD Negeri Proyonanggan 09 adalah sekolah dasar negeri berkualitas di Batang",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Ki Mangun Sarkoro No. 4",
                addressLocality: "Proyonanggan Selatan",
                addressRegion: "Jawa Tengah",
                postalCode: "51211",
                addressCountry: "ID"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -6.920139,
                longitude: 109.731161
              },
              telephone: "+62-285-392825",
              email: "sdnproyonanggan09@gmail.com",
              areaServed: {
                "@type": "City",
                name: "Batang"
              },
              openingHours: "Mo-Fr 07:00-14:00",
              priceRange: "Gratis (Sekolah Negeri)"
            }),
          }}
        />
      </body>
    </html>
  );
}