import { renderHook, act } from '@testing-library/react';
import { usePexelsPhoto } from '../usePexelsPhoto';
import { getPhotoById } from '../../mocks/pexelsApi';
import { Photo } from '../../types/pexels';

// Mock the API service
jest.mock('../../services/pexelsApi', () => require('../../mocks/pexelsApi'));

const mockGetPhotoById = getPhotoById as jest.MockedFunction<typeof getPhotoById>;

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

describe('usePexelsPhoto', () => {
  const mockPhoto = createMockPhoto(123);

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock Image constructor
    // @ts-ignore
    global.Image = jest.fn(() => ({
      src: '',
      onload: jest.fn(),
      onerror: jest.fn()
    }));
  });

  it('should initialize with loading true when id is provided', () => {
    const { result } = renderHook(() => usePexelsPhoto('123'));

    expect(result.current).toEqual({
      photo: null,
      loading: true,
      error: null
    });
  });

  it('should initialize with loading false when id is undefined', () => {
    const { result } = renderHook(() => usePexelsPhoto(undefined));

    expect(result.current).toEqual({
      photo: null,
      loading: false,
      error: null
    });
  });

  it('should fetch and return photo data successfully', async () => {
    mockGetPhotoById.mockResolvedValueOnce(mockPhoto);

    const { result } = renderHook(() => usePexelsPhoto('123'));

    // Initially should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.photo).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for the API call to resolve
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockGetPhotoById).toHaveBeenCalledWith('123');
    expect(result.current.photo).toEqual(mockPhoto);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    // Should preload the large image
    // @ts-ignore
    expect(global.Image).toHaveBeenCalledTimes(1);
    // @ts-ignore
    expect(global.Image.mock.results[0].value.src).toBe(mockPhoto.src.large);
  });

  it('should handle API errors', async () => {
    const error = new Error('API Error');
    mockGetPhotoById.mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePexelsPhoto('123'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe('API Error');
    expect(result.current.loading).toBe(false);
    expect(result.current.photo).toBeNull();
  });

  it('should handle non-Error objects thrown by API', async () => {
    mockGetPhotoById.mockRejectedValueOnce('Some string error');

    const { result } = renderHook(() => usePexelsPhoto('123'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe('Failed to load photo');
    expect(result.current.loading).toBe(false);
    expect(result.current.photo).toBeNull();
  });

  it('should cleanup when unmounted during fetch', async () => {
    mockGetPhotoById.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockPhoto), 100))
    );

    const { unmount } = renderHook(() => usePexelsPhoto('123'));

    // Unmount immediately, before the fetch completes
    unmount();

    // Wait for the original timeout
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    // The API should have been called
    expect(mockGetPhotoById).toHaveBeenCalledTimes(1);
    // But the state should not have been updated (no errors thrown)
  });

  it('should update when id prop changes', async () => {
    const firstPhoto = createMockPhoto(123);
    const secondPhoto = createMockPhoto(456);

    mockGetPhotoById
      .mockResolvedValueOnce(firstPhoto)
      .mockResolvedValueOnce(secondPhoto);

    const { result, rerender } = renderHook(
      (props) => usePexelsPhoto(props), 
      { initialProps: '123' }
    );

    // Wait for first fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.photo?.id).toBe(123);

    // Change the id prop
    rerender('456');

    // Should go back to loading state
    expect(result.current.loading).toBe(true);

    // Wait for second fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.photo?.id).toBe(456);
    expect(mockGetPhotoById).toHaveBeenCalledTimes(2);
    expect(mockGetPhotoById).toHaveBeenNthCalledWith(1, '123');
    expect(mockGetPhotoById).toHaveBeenNthCalledWith(2, '456');
  });

  it('should not fetch when id is undefined', async () => {
    const { result } = renderHook(() => usePexelsPhoto(undefined));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockGetPhotoById).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.photo).toBeNull();
    expect(result.current.error).toBeNull();
  });
}); 