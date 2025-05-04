import { useState, useCallback, useRef } from 'react';
import { Photo } from '../types/pexels';
import { GRID } from '../styles/constants';

interface ColumnTracker {
  index: number;
  height: number;
}

interface VirtualItem {
  index: number;
  offset: number;
  height: number;
  photo: Photo;
}

interface UseGridCalculationsProps {
  containerWidth: number;
}

interface UseGridCalculationsReturn {
  columns: number;
  updateColumns: () => void;
  getPhotoHeight: (photo: Photo) => number;
  getPhotoColumn: (photo: Photo, index: number) => number;
  itemHeights: WeakMap<Photo, number>;
  columnHeights: ColumnTracker[];
  handleImageLoad: (photo: Photo, height: number) => void;
  forceUpdate: number;
}

export const useGridCalculations = ({
  containerWidth
}: UseGridCalculationsProps): UseGridCalculationsReturn => {
  const [columns, setColumns] = useState<number>(3);
  const [forceUpdate, setForceUpdate] = useState(0);
  const itemHeights = useRef(new WeakMap<Photo, number>());
  const columnHeights = useRef<ColumnTracker[]>([]);
  const lastColumnAssignments = useRef<Map<string, number>>(new Map());

  const updateColumns = useCallback(() => {
    if (containerWidth) {
      const availableWidth = containerWidth - (GRID.gapSize * 2);
      const maxPossibleColumns = Math.floor((availableWidth + GRID.gapSize) / (GRID.columnWidth + GRID.gapSize));
      const newColumns = Math.min(Math.max(maxPossibleColumns, GRID.minColumns), GRID.maxColumns);
      
      setColumns(prevColumns => {
        if (prevColumns !== newColumns) {
          lastColumnAssignments.current.clear();
          columnHeights.current = [];
          return newColumns;
        }
        return prevColumns;
      });
    }
  }, [containerWidth]);

  const getPhotoHeight = useCallback((photo: Photo): number => {
    return itemHeights.current.get(photo) || photo.height * (GRID.columnWidth / photo.width);
  }, []);

  const findShortestColumn = useCallback((): number => {
    return columnHeights.current.reduce((minIdx, col, idx) => 
      col.height < columnHeights.current[minIdx].height ? idx : minIdx
    , 0);
  }, []);

  const getPhotoColumn = useCallback((photo: Photo, index: number): number => {
    const photoId = photo.id.toString();
    if (lastColumnAssignments.current.has(photoId)) {
      const previousColumn = lastColumnAssignments.current.get(photoId)!;
      if (previousColumn < columns) {
        const columnHeight = columnHeights.current[previousColumn].height;
        const shortestHeight = Math.min(...columnHeights.current.map(col => col.height));
        
        if (columnHeight - shortestHeight <= GRID.maxHeightDifference) {
          return previousColumn;
        }
      }
    }
    
    const shortestColumnIndex = findShortestColumn();
    lastColumnAssignments.current.set(photoId, shortestColumnIndex);
    return shortestColumnIndex;
  }, [columns, findShortestColumn]);

  const handleImageLoad = useCallback((photo: Photo, height: number) => {
    itemHeights.current.set(photo, height);
    setForceUpdate(prev => prev + 1);
  }, []);

  return {
    columns,
    updateColumns,
    getPhotoHeight,
    getPhotoColumn,
    itemHeights: itemHeights.current,
    columnHeights: columnHeights.current,
    handleImageLoad,
    forceUpdate
  };
}; 