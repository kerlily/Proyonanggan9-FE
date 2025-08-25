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

// Base metadata URL set to deployed Vercel domain
export const metadataBase = new URL("https://sdnegeriproyonanggan9.vercel.app");

export const metadata: Metadata = {
  title: "SD Negeri Proyonanggan 09",
  description: "Website resmi SD Negeri Proyonanggan 09 Batang",
  keywords: [
    "SD Negeri",
    "Proyonanggan",
    "sekolah dasar",
    "Batang",
    "pendidikan",
  ],
  authors: [{ name: "SD Negeri Proyonanggan 09" }],
  openGraph: {
    title: "SD Negeri Proyonanggan 09",
    description: "Website resmi SD Negeri Proyonanggan 09 Batang",
  url: "https://sdnegeriproyonanggan9.vercel.app",
    siteName: "SD Negeri Proyonanggan 09",
    images: [
      {
        url: "https://sdnegeriproyonanggan9.vercel.app/logo.png",
        alt: "SD Negeri Proyonanggan 09",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
  card: "summary_large_image",
    title: "SD Negeri Proyonanggan 09",
    description: "Website resmi SD Negeri Proyonanggan 09 Batang",
  images: ["https://sdnegeriproyonanggan9.vercel.app/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sdnegeriproyonanggan9.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
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

        {/* Structured data (JSON-LD) for better indexing — update contact info if needed */}
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "School",
              name: "SD Negeri Proyonanggan 09",
              url: "https://sdnegeriproyonanggan9.vercel.app",
              logo: "https://sdnegeriproyonanggan9.vercel.app/logo.png",
              sameAs: [],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Ki Mangun Sarkoro No. 4",
                addressLocality: "Proyonanggan Selatan",
                addressRegion: "Kabupaten Batang",
                addressCountry: "ID",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}