// API configuration and utility functions

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

// Generic fetch function with error handling
async function apiFetch<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}/${endpoint}`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return { 
      data: {} as T, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Fetch all gurus
export async function fetchGurus(): Promise<Guru[]> {
  const { data, error } = await apiFetch<{ gurus: Guru[] }>(`${API_PREFIX}/guru`);
  
  if (error || !data.gurus) {
    console.error('Error fetching gurus:', error);
    return [];
  }

  // Map data and add default jabatan if not present
  return data.gurus.map(guru => ({
    ...guru,
    jabatan: guru.jabatan || 'Guru',
    imageUrl: guru.photo // Add alias for compatibility
  }));
}

// Fetch all beritas
export async function fetchBeritas(): Promise<Berita[]> {
  const { data, error } = await apiFetch<{ beritas: Berita[] }>('beritas');
  
  if (error || !data.beritas) {
    console.error('Error fetching beritas:', error);
    return [];
  }

  // Filter only published beritas and sort by date
  return data.beritas
    .filter(berita => berita.is_published)
    .sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_by);
      const dateB = new Date(b.published_at || b.created_by);
      return dateB.getTime() - dateA.getTime();
    });
}

// Fetch single berita by ID
export async function fetchBeritaById(id: string): Promise<Berita | null> {
  const { data, error } = await apiFetch<{ berita: Berita }>(`beritas/${id}`);

  if (error || !data.berita) {
    console.error('Error fetching berita by id:', error);
    return null;
  }

  return data.berita;
}


// Fetch all galleries
export async function fetchGalleries(): Promise<Gallery[]> {
  const { data, error } = await apiFetch<{ galleries: Gallery[] }>('galleries');
  
  if (error || !data.galleries) {
    console.error('Error fetching galleries:', error);
    return [];
  }

  // Add default text for each gallery item
  return data.galleries.map((item, index) => ({
    ...item,
    text: item.text || `Galeri ${index + 1}`
  }));
}

// Format date helper
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

// Transform berita for compatibility with existing components
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

// Transform guru for compatibility with existing components
export function transformGuruForComponent(guru: Guru) {
  return {
    id: guru.id,
    nama: guru.nama,
    jabatan: guru.jabatan || 'Guru',
    imageUrl: guru.photo,
    nip: guru.nip
  };
}

// Transform gallery for CircularGallery component
export function transformGalleryForComponent(gallery: Gallery) {
  return {
    image: gallery.image_url,
    text: gallery.text || 'Galeri Sekolah'
  };
}