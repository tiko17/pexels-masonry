// Mock axios before imports
jest.mock('axios', () => require('../../mocks/axios').default);

import mockAxios from '../../mocks/axios';
import { getPhotoById, searchPhotos, getCuratedPhotos, cache } from '../pexelsApi';
import { Photo, PexelsResponse } from '../../types/pexels';
import { INTERNAL_SERVER_ERROR, ERROR_MESSAGES, DEFAULT_PAGE, ITEMS_PER_PAGE } from '../../constants/api';

const { DEFAULT_ERROR, UNEXPECTED_ERROR, API_ERROR } = ERROR_MESSAGES;

const mockedAxios = mockAxios as jest.Mocked<typeof mockAxios>;

// Mock Date.now to return a fixed timestamp
const NOW = 1234567890000;
jest.spyOn(Date, 'now').mockImplementation(() => NOW);

describe('pexelsApi', () => {
  const mockPhoto: Photo = {
    id: 123,
    width: 800,
    height: 600,
    url: 'https://example.com/photo.jpg',
    photographer: 'John Doe',
    photographer_url: 'https://example.com/photographer',
    photographer_id: 456,
    avg_color: '#FFFFFF',
    src: {
      original: 'https://example.com/original.jpg',
      large2x: 'https://example.com/large2x.jpg',
      large: 'https://example.com/large.jpg',
      medium: 'https://example.com/medium.jpg',
      small: 'https://example.com/small.jpg',
      portrait: 'https://example.com/portrait.jpg',
      landscape: 'https://example.com/landscape.jpg',
      tiny: 'https://example.com/tiny.jpg',
    },
    liked: false,
    alt: 'Sample photo'
  };

  const mockPexelsResponse: PexelsResponse = {
    total_results: 1000,
    page: 1,
    per_page: 15,
    photos: [mockPhoto],
    next_page: 'https://api.pexels.com/v1/search?page=2'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear the cache before each test
    cache.clear();
    // Mock axios.create to return the mocked axios instance with correct config
    mockedAxios.create.mockReturnValue({
      ...mockedAxios,
      defaults: {
        baseURL: 'https://api.pexels.com/v1',
        headers: {
          'Authorization': process.env.REACT_APP_PEXELS_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: false,
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getPhotoById', () => {
    it('should fetch a photo by id successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockPhoto });
      const result = await getPhotoById('123');
      expect(result).toEqual(mockPhoto);
      expect(mockedAxios.get).toHaveBeenCalledWith('/photos/123');
    });

    it('should return cached data for subsequent calls within cache duration', async () => {
      // First call should make an API request
      mockedAxios.get.mockResolvedValueOnce({ data: mockPhoto });
      const result1 = await getPhotoById('123');
      expect(result1).toEqual(mockPhoto);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);

      // Second call should use cache
      const result2 = await getPhotoById('123');
      expect(result2).toEqual(mockPhoto);
      // Should still be called only once (no new API call)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('should handle API errors properly', async () => {
      const error = new Error('API Error');
      mockedAxios.get.mockRejectedValueOnce(error);
      mockedAxios.isAxiosError.mockReturnValueOnce(true);

      try {
        await getPhotoById('123');
      } catch (err) {
        expect(err).toEqual({
          error: DEFAULT_ERROR,
          status: INTERNAL_SERVER_ERROR
        });
      }
    });

    it('should handle unexpected errors', async () => {
      const error = new Error('Network error');
      mockedAxios.get.mockRejectedValueOnce(error);
      mockedAxios.isAxiosError.mockReturnValueOnce(false);

      try {
        await getPhotoById('123');
      } catch (err) {
        expect(err).toEqual({
          error: UNEXPECTED_ERROR,
          status: INTERNAL_SERVER_ERROR
        });
      }
    });
  });

  describe('searchPhotos', () => {
    const searchParams = {
      query: 'nature',
      page: 1,
      per_page: 15,
      orientation: 'landscape' as 'landscape' | 'portrait' | 'square',
      size: 'large' as 'small' | 'medium' | 'large',
      color: 'red',
      locale: 'en-US'
    };

    it('should search photos successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockPexelsResponse });
      const result = await searchPhotos(searchParams);
      expect(result).toEqual(mockPexelsResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith('/search', {
        params: searchParams
      });
    });

    it('should use default values for missing parameters', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockPexelsResponse });
      await searchPhotos({ query: 'nature' });
      expect(mockedAxios.get).toHaveBeenCalledWith('/search', {
        params: {
          query: 'nature',
          page: DEFAULT_PAGE,
          per_page: ITEMS_PER_PAGE,
          orientation: undefined,
          size: undefined,
          color: undefined,
          locale: undefined
        }
      });
    });

    it('should handle API errors properly', async () => {
      const error = new Error('API Error');
      mockedAxios.get.mockRejectedValueOnce(error);
      mockedAxios.isAxiosError.mockReturnValueOnce(true);

      try {
        await searchPhotos(searchParams);
      } catch (err) {
        expect(err).toEqual({
          error: DEFAULT_ERROR,
          status: INTERNAL_SERVER_ERROR
        });
      }
    });
  });

  describe('getCuratedPhotos', () => {
    it('should fetch curated photos successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockPexelsResponse });
      const result = await getCuratedPhotos(1, 15);
      expect(result).toEqual(mockPexelsResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith('/curated', {
        params: {
          page: 1,
          per_page: 15
        }
      });
    });

    it('should use default values when no parameters provided', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockPexelsResponse });
      await getCuratedPhotos();
      expect(mockedAxios.get).toHaveBeenCalledWith('/curated', {
        params: {
          page: DEFAULT_PAGE,
          per_page: ITEMS_PER_PAGE
        }
      });
    });

    it('should handle API errors properly', async () => {
      const error = new Error('API Error');
      mockedAxios.get.mockRejectedValueOnce(error);
      mockedAxios.isAxiosError.mockReturnValueOnce(true);

      try {
        await getCuratedPhotos();
      } catch (err) {
        expect(err).toEqual({
          error: DEFAULT_ERROR,
          status: INTERNAL_SERVER_ERROR
        });
      }
    });

    it('should return cached data for subsequent calls within cache duration', async () => {
      // Mock the first API call
      mockedAxios.get.mockResolvedValueOnce({ data: mockPexelsResponse });

      // First call should make an API request
      const result1 = await getCuratedPhotos(1, 15);
      expect(result1).toEqual(mockPexelsResponse);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith('/curated', {
        params: { page: 1, per_page: 15 }
      });

      // Second call should use cache
      const result2 = await getCuratedPhotos(1, 15);
      expect(result2).toEqual(mockPexelsResponse);
      // Should still be called only once (no new API call)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });
}); 