'use client';
import Image from "next/image";

export default function SejarahPage() {
  return (
    <section className="container max-w-6xl mx-auto px-4 py-12 pt-20">
      {/* Gambar Header */}
      <div className="relative w-full aspect-video mb-8">
        <Image
          src="https://picsum.photos/id/1047/1200/600" // contoh gambar sejarah
          alt="Sejarah SD Negeri Proyonanggan 09"
          fill
          className="object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Judul */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Sejarah SD Negeri Proyonanggan 09
      </h1>

      {/* Konten */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 md:p-8 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
        <p className="mb-4">
          SD Negeri Proyonanggan 09 Batang berdiri sebagai salah satu sekolah dasar negeri 
          yang berkomitmen untuk memberikan pendidikan dasar yang berkualitas bagi 
          masyarakat sekitar. Sejak awal berdirinya, sekolah ini menjadi bagian penting 
          dalam mencerdaskan kehidupan bangsa di Kabupaten Batang.
        </p>
        <p className="mb-4">
          Seiring berjalannya waktu, SD Negeri Proyonanggan 09 terus berkembang baik dari segi 
          sarana dan prasarana maupun kualitas tenaga pendidik. Hal ini dibuktikan dengan 
          peningkatan jumlah siswa setiap tahunnya serta prestasi yang berhasil diraih di 
          berbagai bidang, baik akademik maupun non-akademik.
        </p>
        <p>
          Dengan semangat kebersamaan, sekolah ini berupaya mencetak generasi penerus bangsa 
          yang berkarakter, disiplin, berprestasi, dan peduli terhadap lingkungan. Nilai-nilai 
          tersebut menjadi dasar dalam perjalanan panjang sejarah SD Negeri Proyonanggan 09 
          hingga saat ini.
        </p>
      </div>
    </section>
  );
}
