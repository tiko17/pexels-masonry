import { useCallback, useRef } from 'react';
import { GRID } from '../styles/constants';

interface UseScrollHandlerProps {
  loading: boolean;
  loadMore: () => void;
}

interface UseScrollHandlerReturn {
  scrollTop: number;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export const useScrollHandler = ({
  loading,
  loadMore
}: UseScrollHandlerProps): UseScrollHandlerReturn => {
  const scrollTopRef = useRef(0);
  const scrollTimeout = useRef<number | undefined>(undefined);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    
    if (scrollTimeout.current) {
      window.cancelAnimationFrame(scrollTimeout.current);
    }

    scrollTimeout.current = window.requestAnimationFrame(() => {
      const { scrollTop, scrollHeight, clientHeight } = target;
      scrollTopRef.current = scrollTop;
      
      if (!loading && 
          scrollHeight - (scrollTop + clientHeight) < GRID.loadThreshold && 
          scrollTop > 0) {
        loadMore();
      }
    });
  }, [loading, loadMore]);

  return {
    scrollTop: scrollTopRef.current,
    handleScroll
  };
}; 