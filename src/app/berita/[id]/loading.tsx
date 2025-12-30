export default function BeritaDetailLoading() {
  return (
    <article className="container pt-20 max-w-3xl mx-auto px-4 py-12">
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6" />
      
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
      
      <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
      
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6" />
      
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ))}
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </article>
  );
}