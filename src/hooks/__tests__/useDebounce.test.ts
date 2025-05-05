import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500));
    expect(result.current).toBe('initial value');
  });

  it('should update the value after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    // Update the value
    rerender({ value: 'new value', delay: 500 });

    // Value should not change immediately
    expect(result.current).toBe('initial value');

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should be updated after delay
    expect(result.current).toBe('new value');
  });

  it('should cancel previous timeout when value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    // Update value multiple times
    rerender({ value: 'value 1', delay: 500 });
    rerender({ value: 'value 2', delay: 500 });
    rerender({ value: 'value 3', delay: 500 });

    // Advance time partially
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Value should still be initial
    expect(result.current).toBe('initial value');

    // Advance remaining time
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Should only get the last value
    expect(result.current).toBe('value 3');
  });

  it('should work with different types of values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: { test: 1 }, delay: 500 } }
    );

    expect(result.current).toEqual({ test: 1 });

    rerender({ value: { test: 2 }, delay: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toEqual({ test: 2 });
  });
}); 