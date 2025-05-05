import { renderHook, act } from '@testing-library/react';
import { useSearchPhotos } from '../useSearchPhotos';
import { searchPhotos, getCuratedPhotos, mockPhoto } from '../../mocks/pexelsApi';
import { Photo } from '../../types/pexels';

// Mock the API service
jest.mock('../../services/pexelsApi', () => require('../../mocks/pexelsApi'));

const mockSearchPhotos = searchPhotos as jest.MockedFunction<typeof searchPhotos>;
const mockGetCuratedPhotos = getCuratedPhotos as jest.MockedFunction<typeof getCuratedPhotos>;

const mockPhotos: Photo[] = [mockPhoto];

const morePhotos: Photo[] = [
  {
    ...mockPhoto,
    id: 2,
    photographer: 'Jane Smith',
    photographer_url: 'https://www.pexels.com/@janesmith',
    photographer_id: 2,
    alt: 'Photo 2'
  }
];

describe('useSearchPhotos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchPhotos.mockResolvedValue({ photos: mockPhotos, total_results: 1, page: 1, per_page: 30, next_page: undefined });
    mockGetCuratedPhotos.mockResolvedValue({ photos: mockPhotos, total_results: 1, page: 1, per_page: 30, next_page: undefined });
  });

  it('should fetch curated photos when query is empty', async () => {
    const { result } = renderHook(() => useSearchPhotos(''));

    // Initially should be loading with empty photos
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

  it('should search photos when query is provided', async () => {
    const { result } = renderHook(() => useSearchPhotos('nature'));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockSearchPhotos).toHaveBeenCalledWith({
      query: 'nature',
      page: 1,
      per_page: 30
    });
    expect(result.current.photos).toEqual(mockPhotos);
    expect(result.current.loading).toBe(false);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('API Error');
    mockSearchPhotos.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useSearchPhotos('nature'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe('API Error');
    expect(result.current.loading).toBe(false);
    expect(result.current.photos).toEqual([]);
  });

  it('should load more photos when loadMore is called', async () => {
    const { result } = renderHook(() => useSearchPhotos('nature'));

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    mockSearchPhotos.mockResolvedValueOnce({
      photos: morePhotos,
      total_results: 2,
      page: 2,
      per_page: 30,
      next_page: undefined
    });

    // Call loadMore
    await act(async () => {
      await result.current.loadMore();
    });

    expect(mockSearchPhotos).toHaveBeenCalledWith({
      query: 'nature',
      page: 2,
      per_page: 30
    });
    expect(result.current.photos).toEqual([...mockPhotos, ...morePhotos]);
  });

  it('should handle duplicate photos when loading more', async () => {
    const { result } = renderHook(() => useSearchPhotos('nature'));

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    mockSearchPhotos.mockResolvedValueOnce({
      photos: [...mockPhotos, ...morePhotos],
      total_results: 2,
      page: 2,
      per_page: 30,
      next_page: undefined
    });

    // Call loadMore
    await act(async () => {
      await result.current.loadMore();
    });

    // Should only add unique photos
    expect(result.current.photos).toHaveLength(2); // 1 initial + 1 new unique
    expect(result.current.photos.map(p => p.id)).toEqual([mockPhoto.id, morePhotos[0].id]);
  });

  it('should prevent concurrent loading more requests', async () => {
    const { result } = renderHook(() => useSearchPhotos('nature'));

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
    expect(mockSearchPhotos).toHaveBeenCalledTimes(2); // Initial + one loadMore
  });

  it('should handle errors during loadMore', async () => {
    const { result } = renderHook(() => useSearchPhotos('nature'));

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const error = new Error('Load more error');
    mockSearchPhotos.mockRejectedValueOnce(error);

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