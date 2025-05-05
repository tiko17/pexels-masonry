import { Photo, PexelsResponse, PexelsError } from '../types/pexels';

export const mockPhoto: Photo = {
  id: 123,
  width: 800,
  height: 600,
  url: 'photo123.jpg',
  photographer: 'John Doe',
  photographer_url: 'https://www.pexels.com/@johndoe',
  photographer_id: 1,
  avg_color: '#FFFFFF',
  src: {
    original: 'photo123.jpg',
    large2x: 'photo123.jpg',
    large: 'photo123_large.jpg',
    medium: 'photo123.jpg',
    small: 'photo123.jpg',
    portrait: 'photo123.jpg',
    landscape: 'photo123.jpg',
    tiny: 'photo123.jpg'
  },
  liked: false,
  alt: 'Photo 123'
};

export const mockPexelsResponse: PexelsResponse = {
  total_results: 1,
  page: 1,
  per_page: 1,
  photos: [mockPhoto],
  next_page: undefined
};

export const mockPexelsError = new Error('API Error');

export const getPhotoById = jest.fn().mockImplementation(async (id: string) => {
  if (!id) {
    throw mockPexelsError;
  }
  return mockPhoto;
});

export const searchPhotos = jest.fn().mockImplementation(async (params: any) => {
  if (!params.query && !params.page) {
    throw mockPexelsError;
  }
  return mockPexelsResponse;
});

export const getCuratedPhotos = jest.fn().mockImplementation(async (page: number, perPage: number) => {
  if (!page || !perPage) {
    throw mockPexelsError;
  }
  return mockPexelsResponse;
}); 