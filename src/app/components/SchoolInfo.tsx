export default function SchoolInfo() {
  return (
    <section className="container max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Video / Media */}
        <div className="w-full">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/-H3ap6vuoq8?si=Hoo-PnisNgK-5qQb&autoplay=1&mute=1&playsinline=1&controls=0&loop=1&playlist=-H3ap6vuoq8"
              title="Profil SD Negeri Proyonanggan 09"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Teks Penjelasan */}
        <div className="w-full">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            SD Negeri Proyonanggan 09
            <span className="border-b-4 border-yellow-400 w-8 inline-block align-bottom"></span>
          </h1>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            <p className="mb-4">
              SD Negeri Proyonanggan 09 Batang adalah salah satu sekolah dasar negeri
              yang berlokasi di Jl. Ki Mangun Sarkoro No. 4, Kelurahan Proyonanggan
              Selatan, Kabupaten Batang, Jawa Tengah. Sekolah ini berkomitmen untuk
              mencetak generasi yang berkarakter, berprestasi, dan peduli lingkungan
              melalui kegiatan belajar mengajar yang berkualitas, disiplin, dan
              menyenangkan.
            </p>
            <p>
              Dengan dukungan tenaga pendidik yang berkompeten serta fasilitas yang
              memadai, SD Negeri Proyonanggan 09 terus berupaya menciptakan
              lingkungan belajar yang aman, nyaman, dan kondusif. Selain pembelajaran
              akademik, sekolah juga mendorong siswa untuk mengembangkan potensi di
              bidang seni, olahraga, dan kegiatan ekstrakurikuler.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
