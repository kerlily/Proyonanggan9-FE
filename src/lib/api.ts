const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://proyonanggan.my.id/api';
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || 'public';

// Type definitions 
export interface Guru {
  id: string;
  nama: string; 
  nip: string;
  photo: string;
  jabatan?: string;
}

export interface Berita {
  id: number;
  title: string;
  description: string;
  is_published: boolean;
  published_at: string | null;
  created_by: string;
  image_url: string;
}

export interface Gallery {
  id: number;
  image_url: string;
  text?: string;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
}

interface ApiFetchOptions extends RequestInit {
  retries?: number;
  useCache?: boolean; // ✅ NEW: kontrol cache strategy
}

/**
 * Generic API fetch dengan retry logic
 * @param useCache - true untuk halaman (reliability), false untuk sitemap (freshness)
 */
async function apiFetch<T>(
  endpoint: string, 
  options: ApiFetchOptions = {}
): Promise<ApiResponse<T>> {
  const { retries = 2, useCache = true, ...fetchOptions } = options;
  
  for (let i = 0; i <= retries; i++) {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      
      const response = await fetch(url, {
        ...fetchOptions,
        // ✅ Conditional caching berdasarkan context
        cache: useCache ? 'force-cache' : 'no-store',
        next: useCache ? undefined : { revalidate: 0 },
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data };
      
    } catch (error) {
      if (i === retries) {
        console.error(`Failed after ${retries + 1} attempts:`, error);
        return { 
          data: {} as T, 
          error: error instanceof Error ? error.message : 'Network error' 
        };
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  
  return { data: {} as T, error: 'Max retries exceeded' };
}

// ===== CACHED VERSIONS (untuk halaman) =====

export async function fetchHomePageData() {
  const [beritas, galleries] = await Promise.all([
    fetchBeritas(),
    fetchGalleries()
  ]);
  
  return { beritas, galleries };
}

export async function fetchGurus(): Promise<Guru[]> {
  const { data, error } = await apiFetch<{ gurus: Guru[] }>(
    `${API_PREFIX}/guru`,
    { useCache: true } // ✅ Gunakan cache
  );
  
  if (error || !data.gurus) {
    console.error('Error fetching gurus:', error);
    return [];
  }

  return data.gurus.map(guru => ({
    ...guru,
    jabatan: guru.jabatan || 'Guru',
    imageUrl: guru.photo
  }));
}

export async function fetchBeritas(): Promise<Berita[]> {
  const { data, error } = await apiFetch<{ beritas: Berita[] }>(
    'beritas',
    { useCache: true } // ✅ Gunakan cache
  );
  
  if (error || !data.beritas) {
    console.error('Error fetching beritas:', error);
    return [];
  }

  return data.beritas
    .filter(berita => berita.is_published)
    .sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_by);
      const dateB = new Date(b.published_at || b.created_by);
      return dateB.getTime() - dateA.getTime();
    });
}

export async function fetchBeritaById(id: string): Promise<Berita | null> {
  const { data, error } = await apiFetch<{ berita: Berita }>(
    `beritas/${id}`,
    { useCache: true } // ✅ Gunakan cache
  );

  if (error || !data.berita) {
    console.error('Error fetching berita by id:', error);
    return null;
  }

  return data.berita;
}

export async function fetchGalleries(): Promise<Gallery[]> {
  const { data, error } = await apiFetch<{ galleries: Gallery[] }>(
    'galleries',
    { useCache: true } // ✅ Gunakan cache
  );
  
  if (error || !data.galleries) {
    console.error('Error fetching galleries:', error);
    return [];
  }

  return data.galleries.map((item, index) => ({
    ...item,
    text: item.text || `Galeri ${index + 1}`
  }));
}

// ===== NO-CACHE VERSIONS (khusus untuk sitemap) =====

/**
 * ✅ NEW: Fetch beritas tanpa cache untuk sitemap generation
 * Tetap ada retry logic untuk reliability
 */
export async function fetchBeritasNoCache(): Promise<Berita[]> {
  const { data, error } = await apiFetch<{ beritas: Berita[] }>(
    'beritas',
    { useCache: false, retries: 1 } // No cache, minimal retry
  );
  
  if (error || !data.beritas) {
    console.error('Error fetching beritas (no-cache):', error);
    return [];
  }

  return data.beritas
    .filter(berita => berita.is_published)
    .sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_by);
      const dateB = new Date(b.published_at || b.created_by);
      return dateB.getTime() - dateA.getTime();
    });
}

// ===== HELPERS =====

export function formatDate(dateString: string | null): string {
  if (!dateString) return 'Tanggal tidak tersedia';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Tanggal tidak valid';
  }
}

export function transformBeritaForComponent(berita: Berita) {
  return {
    id: berita.id.toString(),
    title: berita.title,
    excerpt: berita.description.substring(0, 150) + (berita.description.length > 150 ? '...' : ''),
    imageUrl: berita.image_url,
    date: formatDate(berita.published_at),
    description: berita.description
  };
}

export function transformGuruForComponent(guru: Guru) {
  return {
    id: guru.id,
    nama: guru.nama,
    jabatan: guru.jabatan || 'Guru',
    imageUrl: guru.photo,
    nip: guru.nip
  };
}

export function transformGalleryForComponent(gallery: Gallery) {
  return {
    image: gallery.image_url,
    text: gallery.text || 'Galeri Sekolah'
  };
}