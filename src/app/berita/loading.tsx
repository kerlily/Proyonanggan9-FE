export default function BeritaLoading() {
  return (
    <section className="relative">
      <div className="container max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mb-8" />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}