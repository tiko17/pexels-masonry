import { renderHook } from '@testing-library/react';
import { useVirtualization } from '../useVirtualization';
import { Photo } from '../../types/pexels';
import { GRID } from '../../styles/constants';
import { act } from 'react-dom/test-utils';

// Mock photo data
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

const mockPhotos = Array.from({ length: 20 }, (_, i) => createMockPhoto(i + 1));

describe('useVirtualization', () => {
  const defaultProps = {
    photos: mockPhotos,
    columns: 3,
    containerHeight: 800,
    scrollTop: 0,
    getPhotoHeight: (photo: Photo) => Math.round((photo.height / photo.width) * 300),
    getPhotoColumn: (photo: Photo, index: number) => index % 3,
    columnHeights: [],
    onHeightChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct virtual items', () => {
    const { result } = renderHook(() => useVirtualization(defaultProps));

    expect(result.current.virtualItems).toHaveLength(3); // 3 columns
    expect(result.current.virtualItems[0].length).toBeGreaterThan(0); // Should have items
    expect(result.current.totalHeight).toBeGreaterThan(0);
  });

  it('should calculate correct grid dimensions', () => {
    const { result } = renderHook(() => useVirtualization(defaultProps));

    expect(result.current.gridDimensions).toEqual({
      columnWidth: GRID.columnWidth,
      totalWidth: '100%'
    });
  });

  it('should update item height when updateHeight is called', () => {
    const { result } = renderHook(() => useVirtualization(defaultProps));

    act(() => {
      result.current.updateHeight(mockPhotos[0], 500);
    });

    // The first item in the first column should have the updated height
    const firstColumnFirstItem = result.current.virtualItems[0].find(
      item => item.photo.id === mockPhotos[0].id
    );
    expect(firstColumnFirstItem?.height).toBe(500);
  });

  it('should handle scrolling and show correct visible items', () => {
    const { result, rerender } = renderHook(
      (props) => useVirtualization(props),
      { initialProps: defaultProps }
    );

    // Get initial visible items
    const initialVisibleItems = result.current.virtualItems.flat()
      .filter(item => item.isVisible)
      .length;

    // Scroll down
    const scrolledProps = {
      ...defaultProps,
      scrollTop: 1000
    };

    rerender(scrolledProps);

    // Get new visible items
    const scrolledVisibleItems = result.current.virtualItems.flat()
      .filter(item => item.isVisible)
      .length;

    // Should have different visible items after scrolling
    expect(scrolledVisibleItems).toBeGreaterThan(0);
    expect(scrolledVisibleItems).not.toBe(initialVisibleItems);
  });

  it('should call onHeightChange when total height changes', () => {
    const onHeightChange = jest.fn();
    renderHook(() => useVirtualization({
      ...defaultProps,
      onHeightChange
    }));

    expect(onHeightChange).toHaveBeenCalledTimes(1);
    expect(onHeightChange).toHaveBeenCalledWith(expect.any(Number));
  });

  it('should handle empty photos array', () => {
    const { result } = renderHook(() => useVirtualization({
      ...defaultProps,
      photos: []
    }));

    expect(result.current.virtualItems).toHaveLength(3); // Still 3 columns
    expect(result.current.virtualItems[0]).toHaveLength(0); // But empty
    expect(result.current.totalHeight).toBe(800); // Should be at least containerHeight
  });

  it('should handle different column counts', () => {
    const { result, rerender } = renderHook(
      (props) => useVirtualization(props),
      { initialProps: defaultProps }
    );

    // Initial check with 3 columns
    expect(result.current.virtualItems).toHaveLength(3);

    // Change to 4 columns
    rerender({
      ...defaultProps,
      columns: 4
    });

    expect(result.current.virtualItems).toHaveLength(4);
  });

  it('should maintain item order within columns', () => {
    const { result } = renderHook(() => useVirtualization(defaultProps));

    // Check that items in each column are ordered by their original index
    result.current.virtualItems.forEach(column => {
      const indices = column.map(item => item.index);
      const sortedIndices = [...indices].sort((a, b) => a - b);
      expect(indices).toEqual(sortedIndices);
    });
  });

  it('should calculate correct offsets for items', () => {
    const { result } = renderHook(() => useVirtualization(defaultProps));

    result.current.virtualItems.forEach(column => {
      let expectedOffset = 0;
      column.forEach(item => {
        expect(item.offset).toBe(expectedOffset);
        expectedOffset += item.height + GRID.gapSize;
      });
    });
  });
}); 