export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PhotoSearchParams {
    query: string;
    page?: number;
    per_page?: number;
    orientation?: 'landscape' | 'portrait' | 'square';
    size?: 'small' | 'medium' | 'large';
    color?: string;
    locale?: string;
  }

export interface PexelsResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  prev_page?: string;
  next_page?: string;
}

export interface PexelsError {
  error: string;
  status: number;
} 