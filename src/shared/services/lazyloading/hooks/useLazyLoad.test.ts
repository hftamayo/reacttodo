import { renderHook, act } from '@testing-library/react-hooks';
import { useInView } from 'react-intersection-observer';
import useLazyLoad from './useLazyLoad';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

describe('useLazyLoad', () => {
  it('should set shouldFetch to true when inView is true', () => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    const { result } = renderHook(() => useLazyLoad());

    act(() => {
      result.current.ref();
    });

    expect(result.current.shouldFetch).toBe(true);
  });

  it('should set shouldFetch to false when inView is false', () => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    const { result } = renderHook(() => useLazyLoad());

    act(() => {
      result.current.ref();
    });

    expect(result.current.shouldFetch).toBe(false);
  });

  it('should return a ref from useInView', () => {
    const mockRef = jest.fn();
    (useInView as jest.Mock).mockReturnValue({
      ref: mockRef,
      inView: false,
    });

    const { result } = renderHook(() => useLazyLoad());

    expect(result.current.ref).toBe(mockRef);
  });
});
