import { useMemo, useRef, useEffect, useState } from 'react';
import { Photo } from '../types/pexels';
import { GRID } from '../styles/constants';

// Screen-size based buffer calculations
const getBufferSizes = (viewportHeight: number) => {
  const MULTIPLIER = 0.8; // Further reduced from 1.2 for even more conservative buffering
  return {
    TOP: viewportHeight * MULTIPLIER, // Buffer above viewport
    BOTTOM: viewportHeight * 1.2 * MULTIPLIER, // Further reduced buffer below
    UNMOUNT: viewportHeight * 1.5 * MULTIPLIER, // Further reduced unmount distance
    MAX_MOUNTED: Math.max(20, Math.ceil((viewportHeight / 500) * 12)), // Even more conservative mounted items
    MIN_HEIGHT: 300 // Minimum height per item during initial load
  };
};

interface VirtualItem {
  index: number;
  offset: number;
  height: number;
  photo: Photo;
  isVisible: boolean;
  distanceToCenter?: number;
}

interface UseVirtualizationProps {
  photos: Photo[];
  columns: number;
  containerHeight: number;
  scrollTop: number;
  getPhotoHeight: (photo: Photo) => number;
  getPhotoColumn: (photo: Photo, index: number) => number;
  columnHeights: { index: number; height: number; }[];
  onHeightChange?: (height: number) => void;
}

interface UseVirtualizationReturn {
  virtualItems: VirtualItem[][];
  totalHeight: number;
  gridDimensions: {
    columnWidth: number;
    totalWidth: string;
  };
  updateHeight: (photo: Photo, newHeight: number) => void;
}

export const useVirtualization = ({
  photos,
  columns,
  containerHeight,
  scrollTop,
  getPhotoHeight,
  getPhotoColumn,
  columnHeights,
  onHeightChange,
}: UseVirtualizationProps): UseVirtualizationReturn => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [itemHeights, setItemHeights] = useState<Map<string, number>>(new Map());
  
  // Get dynamic buffer sizes based on container height
  const BUFFER = useMemo(() => getBufferSizes(containerHeight), [containerHeight]);

  const getItemHeight = (photo: Photo): number => {
    return itemHeights.get(photo.id.toString()) || getPhotoHeight(photo) || BUFFER.MIN_HEIGHT;
  };

  const updateHeight = (photo: Photo, newHeight: number) => {
    setItemHeights(prev => {
      const next = new Map(prev);
      next.set(photo.id.toString(), newHeight);
      return next;
    });
  };

  const virtualItems = useMemo(() => {
    const items: VirtualItem[][] = Array.from({ length: columns }, () => []);
    columnHeights.length = 0;
    columnHeights.push(...Array.from({ length: columns }, (_, i) => ({ index: i, height: 0 })));

    photos.forEach((photo, index) => {
      const columnIndex = getPhotoColumn(photo, index);
      const height = getItemHeight(photo);
      const column = columnHeights[columnIndex];
      
      items[columnIndex].push({
        index,
        offset: column.height,
        height,
        photo,
        isVisible: false
      });
      
      column.height += height + GRID.gapSize;
    });

    return items;
  }, [photos, columns, getPhotoColumn, columnHeights, itemHeights]);

  const visibleItems = useMemo(() => {
    const visibleStart = Math.max(0, scrollTop - BUFFER.TOP);
    const visibleEnd = scrollTop + containerHeight + BUFFER.BOTTOM;
    const viewportCenter = scrollTop + (containerHeight / 2);

    // Flatten all items and calculate their distances to viewport center
    const allItems = virtualItems.flat().map(item => {
      const itemCenter = item.offset + (item.height / 2);
      return {
        ...item,
        distanceToCenter: Math.abs(itemCenter - viewportCenter),
        isInBuffer: (
          item.offset < visibleEnd && 
          item.offset + item.height > visibleStart
        )
      };
    });

    // First prioritize items in buffer, then by distance to center
    allItems.sort((a, b) => {
      if (a.isInBuffer !== b.isInBuffer) {
        return a.isInBuffer ? -1 : 1;
      }
      return a.distanceToCenter! - b.distanceToCenter!;
    });

    // Take only the closest MAX_MOUNTED items, but ensure all in-buffer items are included
    const inBufferItems = allItems.filter(item => item.isInBuffer);
    const remainingSlots = Math.max(0, BUFFER.MAX_MOUNTED - inBufferItems.length);
    const outOfBufferItems = allItems
      .filter(item => !item.isInBuffer)
      .slice(0, remainingSlots);

    const mountedItems = new Set([
      ...inBufferItems.map(item => item.index),
      ...outOfBufferItems.map(item => item.index)
    ]);

    // Redistribute items back to columns, but only the mounted ones
    return virtualItems.map(column =>
      column
        .filter(item => mountedItems.has(item.index))
        .map(item => ({
          ...item,
          isVisible: item.offset < visibleEnd && item.offset + item.height > visibleStart
        }))
    );
  }, [virtualItems, containerHeight, scrollTop]);

  const totalHeight = useMemo(() => {
    const maxColumnHeight = Math.max(...columnHeights.map(col => col.height));
    const minTotalHeight = photos.length > 0 ? 
      Math.ceil(photos.length / columns) * (BUFFER.MIN_HEIGHT + GRID.gapSize) :
      0;
    return Math.max(maxColumnHeight + GRID.gapSize, containerHeight, minTotalHeight);
  }, [columnHeights, containerHeight, photos.length, columns]);

  // Notify when total height changes
  useEffect(() => {
    onHeightChange?.(totalHeight);
  }, [totalHeight, onHeightChange]);

  const gridDimensions = useMemo(() => {
    if (!containerRef.current) return { columnWidth: GRID.columnWidth, totalWidth: '100%' };
    
    const containerWidth = containerRef.current.offsetWidth;
    const totalGapWidth = GRID.gapSize * (columns - 1);
    const availableWidth = containerWidth - totalGapWidth;
    const exactColumnWidth = Math.floor(availableWidth / columns);
    const totalColumnsWidth = (exactColumnWidth * columns) + totalGapWidth;
    
    return {
      columnWidth: exactColumnWidth,
      totalWidth: `${totalColumnsWidth}px`
    };
  }, [columns]);

  return {
    virtualItems: visibleItems,
    totalHeight,
    gridDimensions,
    updateHeight
  };
}; 