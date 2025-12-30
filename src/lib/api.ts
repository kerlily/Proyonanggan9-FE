// src/lib/api.ts - Optimized version
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://proyonanggan.my.id/api';
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || 'public';

// Type definitions (sama seperti sebelumnya)
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

// ✅ Optimized fetch dengan retry logic
async function apiFetch<T>(
  endpoint: string, 
  options: RequestInit & { retries?: number } = {}
): Promise<ApiResponse<T>> {
  const { retries = 2, ...fetchOptions } = options;
  
  for (let i = 0; i <= retries; i++) {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      
      const response = await fetch(url, {
        ...fetchOptions,
        next: { 
          revalidate: 3600,
          tags: [endpoint] // For on-demand revalidation
        },
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
      // Retry on last attempt
      if (i === retries) {
        console.error(`Failed after ${retries + 1} attempts:`, error);
        return { 
          data: {} as T, 
          error: error instanceof Error ? error.message : 'Network error' 
        };
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  
  return { data: {} as T, error: 'Max retries exceeded' };
}

// ✅ Parallel fetching untuk homepage
export async function fetchHomePageData() {
  const [beritas, galleries] = await Promise.all([
    fetchBeritas(),
    fetchGalleries()
  ]);
  
  return { beritas, galleries };
}

// Fetch functions (sama seperti sebelumnya, tapi dengan retry)
export async function fetchGurus(): Promise<Guru[]> {
  const { data, error } = await apiFetch<{ gurus: Guru[] }>(`${API_PREFIX}/guru`);
  
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
  const { data, error } = await apiFetch<{ beritas: Berita[] }>('beritas');
  
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
  const { data, error } = await apiFetch<{ berita: Berita }>(`beritas/${id}`);

  if (error || !data.berita) {
    console.error('Error fetching berita by id:', error);
    return null;
  }

  return data.berita;
}

export async function fetchGalleries(): Promise<Gallery[]> {
  const { data, error } = await apiFetch<{ galleries: Gallery[] }>('galleries');
  
  if (error || !data.galleries) {
    console.error('Error fetching galleries:', error);
    return [];
  }

  return data.galleries.map((item, index) => ({
    ...item,
    text: item.text || `Galeri ${index + 1}`
  }));
}

// Format date helper (sama)
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

// Transform functions (sama seperti sebelumnya)
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