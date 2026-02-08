// src/app/page.tsx
import { fetchBeritas, transformBeritaForComponent } from '@/lib/api';
import HeroClient from "./components/Hero";

// ✅ SSR untuk data fresh
export default async function Home() {
  const beritas = await fetchBeritas();
  const transformedBeritas = beritas.slice(0, 6).map(transformBeritaForComponent);
  
  return <HeroClient initialBeritas={transformedBeritas} />;
}