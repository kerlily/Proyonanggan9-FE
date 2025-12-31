export const dynamic = 'force-static' 
export const revalidate = 1800 
export const fetchCache = 'default-cache'

import { fetchBeritas, transformBeritaForComponent } from '@/lib/api';
import HeroClient from "./components/Hero";

export default async function Home() {
  const beritas = await fetchBeritas();
  const transformedBeritas = beritas.slice(0, 6).map(transformBeritaForComponent);
  
  return <HeroClient initialBeritas={transformedBeritas} />;
}