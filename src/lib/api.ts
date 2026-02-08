const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
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
  revalidate?: number | false; 
}

async function apiFetch<T>(
  endpoint: string, 
  options: ApiFetchOptions = {}
): Promise<ApiResponse<T>> {
  const { retries = 2, revalidate = 3600, ...fetchOptions } = options;
  
  for (let i = 0; i <= retries; i++) {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      
      const response = await fetch(url, {
        ...fetchOptions,
        next: { 
          revalidate: revalidate === false ? 0 : revalidate,
          tags: [endpoint] 
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
    { revalidate: 86400 } // 24 jam
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


// Update semua fetch functions
export async function fetchBeritas(): Promise<Berita[]> {
  const { data, error } = await apiFetch<{ beritas: Berita[] }>(
    'beritas',
    { revalidate: 0 } // ✅ No cache
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

export async function fetchPengumuman(): Promise<Berita[]> {
  const { data, error } = await apiFetch<{ pengumuman: Berita[] }>(
    'pengumuman',
    { revalidate: 0 } // ✅ No cache
  );
  
  if (error || !data.pengumuman) {
    console.error('Error fetching pengumuman:', error);
    return [];
  }

  return data.pengumuman
    .sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_by);
      const dateB = new Date(b.published_at || b.created_by);
      return dateB.getTime() - dateA.getTime();
    });
}


export async function fetchBeritaById(id: string): Promise<Berita | null> {
  const { data, error } = await apiFetch<{ berita: Berita }>(
    `beritas/${id}`,
    { revalidate: 3600 } // 1 jam
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
    { revalidate: 86400 } // 24 jam
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

export async function fetchBeritasNoCache(): Promise<Berita[]> {
  const { data, error } = await apiFetch<{ beritas: Berita[] }>(
    'beritas',
    { revalidate: false, retries: 1 } 
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