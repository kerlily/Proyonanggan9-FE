import { fetchBeritas, transformBeritaForComponent } from '@/lib/api';
import HeroClient from "./components/Hero";

export const revalidate = 1800; // 30 menit (homepage update lebih sering)

export default async function Home() {
  // Fetch di server side
  const beritas = await fetchBeritas();
  const transformedBeritas = beritas.slice(0, 6).map(transformBeritaForComponent); // Limit 6 berita
  
  return <HeroClient initialBeritas={transformedBeritas} />;
}