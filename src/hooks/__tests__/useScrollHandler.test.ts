import { renderHook, act } from '@testing-library/react';
import { useScrollHandler } from '../useScrollHandler';
import { GRID } from '../../styles/constants';

describe('useScrollHandler', () => {
  const mockLoadMore = jest.fn();
  let rafCallback: FrameRequestCallback;
  
  beforeEach(() => {
    mockLoadMore.mockClear();
    // Mock requestAnimationFrame to capture the callback
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback: FrameRequestCallback) => {
      rafCallback = callback;
      return 1;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should initialize with scrollTop as 0', () => {
    const { result } = renderHook(() =>
      useScrollHandler({ loading: false, loadMore: mockLoadMore })
    );

    expect(result.current.scrollTop).toBe(0);
  });

  it('should not call loadMore when loading is true', () => {
    const { result } = renderHook(() =>
      useScrollHandler({ loading: true, loadMore: mockLoadMore })
    );

    act(() => {
      result.current.handleScroll({
        currentTarget: {
          scrollTop: 1000,
          scrollHeight: 2000,
          clientHeight: 500
        }
      } as React.UIEvent<HTMLDivElement>);
    });

    // Execute rAF callback
    act(() => {
      rafCallback(0);
    });

    expect(mockLoadMore).not.toHaveBeenCalled();
  });

  it('should call loadMore when scroll reaches threshold and not loading', () => {
    const { result } = renderHook(() =>
      useScrollHandler({ loading: false, loadMore: mockLoadMore })
    );

    const clientHeight = 500;
    const scrollHeight = 2000;
    const scrollTop = scrollHeight - clientHeight - (GRID.loadThreshold - 100); // Ensure we're within threshold

    act(() => {
      result.current.handleScroll({
        currentTarget: {
          scrollTop,
          scrollHeight,
          clientHeight
        }
      } as React.UIEvent<HTMLDivElement>);
    });

    // Execute rAF callback
    act(() => {
      rafCallback(0);
    });

    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should not call loadMore when scroll is at top (scrollTop = 0)', () => {
    const { result } = renderHook(() =>
      useScrollHandler({ loading: false, loadMore: mockLoadMore })
    );

    act(() => {
      result.current.handleScroll({
        currentTarget: {
          scrollTop: 0,
          scrollHeight: 2000,
          clientHeight: 500
        }
      } as React.UIEvent<HTMLDivElement>);
    });

    // Execute rAF callback
    act(() => {
      rafCallback(0);
    });

    expect(mockLoadMore).not.toHaveBeenCalled();
  });

  it('should not call loadMore when not reaching threshold', () => {
    const { result } = renderHook(() =>
      useScrollHandler({ loading: false, loadMore: mockLoadMore })
    );

    const clientHeight = 500;
    const scrollHeight = 2000;
    const scrollTop = scrollHeight - clientHeight - (GRID.loadThreshold + 100); // Ensure we're outside threshold

    act(() => {
      result.current.handleScroll({
        currentTarget: {
          scrollTop,
          scrollHeight,
          clientHeight
        }
      } as React.UIEvent<HTMLDivElement>);
    });

    // Execute rAF callback
    act(() => {
      rafCallback(0);
    });

    expect(mockLoadMore).not.toHaveBeenCalled();
  });

  it('should update scrollTop value after scroll', () => {
    const { result, rerender } = renderHook(() =>
      useScrollHandler({ loading: false, loadMore: mockLoadMore })
    );

    const scrollTop = 100;

    act(() => {
      result.current.handleScroll({
        currentTarget: {
          scrollTop,
          scrollHeight: 2000,
          clientHeight: 500
        }
      } as React.UIEvent<HTMLDivElement>);
    });

    // Execute rAF callback
    act(() => {
      rafCallback(0);
    });

    // Force a rerender of the same hook instance
    rerender();

    expect(result.current.scrollTop).toBe(scrollTop);
  });

  it('should debounce scroll events using requestAnimationFrame', () => {
    const { result } = renderHook(() =>
      useScrollHandler({ loading: false, loadMore: mockLoadMore })
    );

    const clientHeight = 500;
    const scrollHeight = 2000;
    const scrollTop = scrollHeight - clientHeight - (GRID.loadThreshold - 100); // Within threshold

    // Track rAF calls
    let rafCallCount = 0;
    window.requestAnimationFrame = jest.fn().mockImplementation((callback: FrameRequestCallback) => {
      rafCallback = callback;
      rafCallCount++;
      return rafCallCount;
    });

    // Trigger multiple scroll events rapidly
    act(() => {
      for (let i = 0; i < 5; i++) {
        result.current.handleScroll({
          currentTarget: {
            scrollTop,
            scrollHeight,
            clientHeight
          }
        } as React.UIEvent<HTMLDivElement>);
      }
    });

    // Execute the last rAF callback
    act(() => {
      rafCallback(0);
    });

    expect(mockLoadMore).toHaveBeenCalledTimes(1);
    expect(window.cancelAnimationFrame).toHaveBeenCalledTimes(4);
    expect(rafCallCount).toBe(5);
  });
}); 