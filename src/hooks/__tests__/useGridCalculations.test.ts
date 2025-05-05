import { renderHook, act } from '@testing-library/react';
import { useGridCalculations } from '../useGridCalculations';
import { GRID } from '../../styles/constants';
import { Photo } from '../../types/pexels';

const createMockPhoto = (id: number, width: number, height: number): Photo => ({
  id,
  width,
  height,
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

describe('useGridCalculations', () => {
  const mockPhoto1 = createMockPhoto(1, 800, 600);
  const mockPhoto2 = createMockPhoto(2, 1200, 900);

  it('should initialize with default columns', () => {
    const { result } = renderHook(() => useGridCalculations({
      containerWidth: 1200
    }));

    expect(result.current.columns).toBe(3);
  });

  it('should calculate columns based on container width', () => {
    const { result } = renderHook(() => useGridCalculations({
      containerWidth: 1200
    }));

    act(() => {
      result.current.updateColumns();
    });

    const expectedColumns = Math.min(
      Math.max(
        Math.floor((1200 - GRID.gapSize * 2 + GRID.gapSize) / (GRID.columnWidth + GRID.gapSize)),
        GRID.minColumns
      ),
      GRID.maxColumns
    );

    expect(result.current.columns).toBe(expectedColumns);
  });

  it('should calculate photo height proportionally', () => {
    const { result } = renderHook(() => useGridCalculations({
      containerWidth: 1200
    }));

    const expectedHeight = mockPhoto1.height * (GRID.columnWidth / mockPhoto1.width);
    expect(result.current.getPhotoHeight(mockPhoto1)).toBe(expectedHeight);
  });

  it('should use cached height after image load', () => {
    const { result } = renderHook(() => useGridCalculations({
      containerWidth: 1200
    }));

    const loadedHeight = 500;
    act(() => {
      result.current.handleImageLoad(mockPhoto1, loadedHeight);
    });

    expect(result.current.getPhotoHeight(mockPhoto1)).toBe(loadedHeight);
  });

  it('should assign photos to shortest column', () => {
    const { result } = renderHook(() => useGridCalculations({
      containerWidth: 1200
    }));

    // First photo should go to column 0 as all columns are empty
    const firstColumn = result.current.getPhotoColumn(mockPhoto1, 0);
    expect(firstColumn).toBe(0);

    // Simulate adding height to the first column
    result.current.columnHeights.push(
      { index: 0, height: 500 },
      { index: 1, height: 0 },
      { index: 2, height: 0 }
    );

    // Second photo should go to column 1 or 2 as they are shorter
    const secondColumn = result.current.getPhotoColumn(mockPhoto2, 1);
    expect(secondColumn).toBe(1);
  });

  it('should reuse previous column assignment if height difference is acceptable', () => {
    const { result } = renderHook(() => useGridCalculations({
      containerWidth: 1200
    }));

    // Set up column heights
    result.current.columnHeights.push(
      { index: 0, height: 500 },
      { index: 1, height: 500 + GRID.maxHeightDifference - 10 }, // Within acceptable difference
      { index: 2, height: 0 }
    );

    // First assignment
    const firstColumn = result.current.getPhotoColumn(mockPhoto1, 0);
    
    // Second assignment of the same photo should reuse the column
    const secondColumn = result.current.getPhotoColumn(mockPhoto1, 0);
    
    expect(secondColumn).toBe(firstColumn);
  });

  it('should clear column assignments when columns change', () => {
    const { result } = renderHook(() => useGridCalculations({
      containerWidth: 1200
    }));

    // Assign a photo to a column
    const initialColumn = result.current.getPhotoColumn(mockPhoto1, 0);

    // Change container width to force column update
    const { result: newResult } = renderHook(() => useGridCalculations({
      containerWidth: 800 // Smaller width that should result in fewer columns
    }));

    act(() => {
      newResult.current.updateColumns();
    });

    // The photo should be assigned to the shortest column without considering previous assignment
    const newColumn = newResult.current.getPhotoColumn(mockPhoto1, 0);
    expect(newColumn).toBe(0); // Should start fresh with column 0
  });

  it('should increment forceUpdate when image loads', () => {
    const { result } = renderHook(() => useGridCalculations({
      containerWidth: 1200
    }));

    const initialForceUpdate = result.current.forceUpdate;

    act(() => {
      result.current.handleImageLoad(mockPhoto1, 500);
    });

    expect(result.current.forceUpdate).toBe(initialForceUpdate + 1);
  });

  it('should maintain column heights within maxHeightDifference', () => {
    const { result } = renderHook(() => useGridCalculations({
      containerWidth: 1200
    }));

    // Set up column heights with significant differences
    result.current.columnHeights.push(
      { index: 0, height: 500 },
      { index: 1, height: 1500 }, // Much taller than others
      { index: 2, height: 600 }
    );

    // Even if a photo was previously in column 1, it should be reassigned
    // to a shorter column if the height difference is too large
    const column = result.current.getPhotoColumn(mockPhoto1, 0);
    expect(column).not.toBe(1); // Should not use the tallest column
  });
}); 