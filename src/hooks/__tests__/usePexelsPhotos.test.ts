import { renderHook, act } from '@testing-library/react';
import { usePexelsPhotos } from '../usePexelsPhotos';
import { getCuratedPhotos } from '../../mocks/pexelsApi';
import { Photo } from '../../types/pexels';

// Mock the API service
jest.mock('../../services/pexelsApi', () => require('../../mocks/pexelsApi'));

const mockGetCuratedPhotos = getCuratedPhotos as jest.MockedFunction<typeof getCuratedPhotos>;

const createMockPhoto = (id: number): Photo => ({
  id,
  width: 800,
  height: 600,
  url: `photo${id}.jpg`,
  photographer: `Photographer ${id}`,
  photographer_url: `https://www.pexels.com/@photographer${id}`,
  photographer_id: id,
  avg_color: '#FFFFFF',
  src: {
    original: `photo${id}.jpg`,
    large2x: `photo${id}.jpg`,
    large: `photo${id}.jpg`,
    medium: `photo${id}.jpg`,
    small: `photo${id}.jpg`,
    portrait: `photo${id}.jpg`,
    landscape: `photo${id}.jpg`,
    tiny: `photo${id}.jpg`
  },
  liked: false,
  alt: `Photo ${id}`
});

describe('usePexelsPhotos', () => {
  const mockPhotos = [
    createMockPhoto(1),
    createMockPhoto(2),
    createMockPhoto(3)
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCuratedPhotos.mockResolvedValue({
      photos: mockPhotos,
      total_results: 3,
      page: 1,
      per_page: 30
    });
  });

  it('should fetch photos on initial mount', async () => {
    const { result } = renderHook(() => usePexelsPhotos());

    // Initially should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.photos).toEqual([]);

    // Wait for the API call to resolve
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockGetCuratedPhotos).toHaveBeenCalledWith(1, 30);
    expect(result.current.photos).toEqual(mockPhotos);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors', async () => {
    const error = new Error('API Error');
    mockGetCuratedPhotos.mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePexelsPhotos());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe('API Error');
    expect(result.current.loading).toBe(false);
    expect(result.current.photos).toEqual([]);
  });

  it('should load more photos when loadMore is called', async () => {
    const { result } = renderHook(() => usePexelsPhotos());

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const morePhotos = [
      createMockPhoto(4),
      createMockPhoto(5),
      createMockPhoto(6)
    ];

    mockGetCuratedPhotos.mockResolvedValueOnce({
      photos: morePhotos,
      total_results: 6,
      page: 2,
      per_page: 30
    });

    // Call loadMore
    await act(async () => {
      await result.current.loadMore();
    });

    expect(mockGetCuratedPhotos).toHaveBeenCalledWith(2, 30);
    expect(result.current.photos).toEqual([...mockPhotos, ...morePhotos]);
    expect(result.current.loading).toBe(false);
  });

  it('should handle duplicate photos when loading more', async () => {
    const { result } = renderHook(() => usePexelsPhotos());

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const morePhotos = [
      createMockPhoto(1), // Duplicate
      createMockPhoto(4), // New
      createMockPhoto(5)  // New
    ];

    mockGetCuratedPhotos.mockResolvedValueOnce({
      photos: morePhotos,
      total_results: 5,
      page: 2,
      per_page: 30
    });

    // Call loadMore
    await act(async () => {
      await result.current.loadMore();
    });

    // Should only add unique photos
    expect(result.current.photos).toHaveLength(5); // 3 initial + 2 new unique
    expect(result.current.photos.map(p => p.id)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should prevent concurrent loading more requests', async () => {
    const { result } = renderHook(() => usePexelsPhotos());

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Call loadMore multiple times rapidly
    await act(async () => {
      result.current.loadMore();
      result.current.loadMore();
      result.current.loadMore();
    });

    // Should only make one additional API call
    expect(mockGetCuratedPhotos).toHaveBeenCalledTimes(2); // Initial + one loadMore
  });

  it('should handle errors during loadMore', async () => {
    const { result } = renderHook(() => usePexelsPhotos());

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const error = new Error('Load more error');
    mockGetCuratedPhotos.mockRejectedValueOnce(error);

    // Call loadMore
    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.error).toBe('Load more error');
    expect(result.current.loading).toBe(false);
    // Should keep existing photos
    expect(result.current.photos).toEqual(mockPhotos);
  });
}); 