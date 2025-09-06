import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

// Mock timers
jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    // Change the value
    rerender({ value: 'changed', delay: 500 });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('changed'); // Should now be changed
  });

  it('should cancel previous timeout when value changes quickly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change value multiple times quickly
    rerender({ value: 'first', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'second', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'final', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('final'); // Should be the last value
  });
});