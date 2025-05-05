import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Photo } from '../../types/pexels';
import { useSearchPhotos } from '../../hooks/useSearchPhotos';
import { useGridCalculations } from '../../hooks/useGridCalculations';
import { useScrollHandler } from '../../hooks/useScrollHandler';
import { useVirtualization } from '../../hooks/useVirtualization';
import { theme } from '../../styles/index';
import {
  GridContainer,
  MasonryColumn,
  VirtualContainer,
  ErrorMessage,
  ScrollContainer,
  PhotoItem,
} from './styled';
import PhotoCard from '../PhotoCard';
import LoadingState from '../LoadingState';

const MemoizedPhotoCard = memo(PhotoCard);

interface MasonryGridProps {
  searchQuery?: string;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ searchQuery = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const navigate = useNavigate();
  
  const { photos, loading, error, loadMore } = useSearchPhotos(searchQuery);

  const {
    columns,
    updateColumns,
    getPhotoHeight,
    getPhotoColumn,
    columnHeights,
  } = useGridCalculations({
    containerWidth: containerRef.current?.offsetWidth || 0
  });

  const { scrollTop, handleScroll } = useScrollHandler({
    loading,
    loadMore
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        updateColumns();
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateColumns]);

  const { virtualItems, totalHeight, gridDimensions, updateHeight } = useVirtualization({
    photos,
    columns,
    containerHeight,
    scrollTop,
    getPhotoHeight,
    getPhotoColumn,
    columnHeights,
  });

  const handleImageLoad = useCallback((photo: Photo, height: number) => {
    updateHeight(photo, height);
  }, [updateHeight]);

  const handlePhotoClick = useCallback((photo: Photo) => {
    navigate(`/photo/${photo.id}`);
  }, [navigate]);

  if (error) {
    return <ThemeProvider theme={theme}>
      <ErrorMessage variant="default">{error}</ErrorMessage>
    </ThemeProvider>;
  }

  return (
    <ThemeProvider theme={theme}>
      <GridContainer>
        <ScrollContainer 
          ref={containerRef} 
          onScroll={handleScroll}
        >
          <VirtualContainer 
            $totalHeight={totalHeight}
            $totalWidth={gridDimensions.totalWidth}
          >
            {virtualItems.map((column, columnIndex) => (
              <MasonryColumn
                key={columnIndex}
                width={gridDimensions.columnWidth}
              >
                {column.map(item => (
                  <PhotoItem
                    key={item.photo.id}
                    offset={item.offset}
                    height={item.height}
                  >
                    <MemoizedPhotoCard
                      photo={item.photo}
                      onLoad={(height) => handleImageLoad(item.photo, height)}
                      onClick={() => handlePhotoClick(item.photo)}
                      isVisible={item.isVisible}
                    />
                  </PhotoItem>
                ))}
              </MasonryColumn>
            ))}
          </VirtualContainer>
          {loading && <LoadingState />}
        </ScrollContainer>
      </GridContainer>
    </ThemeProvider>
  );
};

export default MasonryGrid;