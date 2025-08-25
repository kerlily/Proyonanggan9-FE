export default function Sitemap() {
  // Base URL for sitemap — set to the Vercel deployment
  const baseUrl = "https://sdnegeriproyonanggan9.vercel.app";

  const pages = [
    "",
    "profile/visi-misi",
    "profile/sejarah",
    "profile/guru",
    "profile/fasilitas",
    "profile/ekstrakurikuler",
    "berita",
    "contact",
  ];

  const today = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map((page) => {
        const loc = `${baseUrl}/${page}`.replace(/\/\/$/, "");
        return `
      <url>
        <loc>${loc}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`;
      })
      .join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=3600",
    },
  });
}
