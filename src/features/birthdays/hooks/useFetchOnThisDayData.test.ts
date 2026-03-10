import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useFetchOnThisDayData } from './useFetchOnThisDayData';
import { mockBirthdayData } from '../mocks/mockBirthdayData';
import { BirthdayProvider } from '../context/BirthdayContext';
import { HttpStatusCode } from '../../../shared/enums/HttpStatusCode.enum';

describe('useFetchOnThisDayData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const fetchMock = async (status: number) => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        status: status,
        ok: false,
        json: () => Promise.resolve(mockBirthdayData)
      } as Response)
    );
    const { result } = renderHook(() => useFetchOnThisDayData(), {
      wrapper: BirthdayProvider
    });

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.fetchData();
    });

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });

    expect(result.current.birthdaysData.length).toBe(0);

    return result;
  };

  it('should call useFetchOnThisDayData custom hook and fetch data', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBirthdayData)
      } as Response)
    );
    const { result } = renderHook(() => useFetchOnThisDayData(), {
      wrapper: BirthdayProvider
    });

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.fetchData();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.birthdaysData.length).toBeGreaterThan(0);
    });

    expect(result.current.birthdaysData.length).toBe(8);
    expect(result.current.error).toBeNull();
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('should show error modal with HTTP 400 error', async () => {
    const result = await fetchMock(HttpStatusCode.BadRequest);
    expect(result.current.error).toBe(
      'HTTP Error 400: Bad Request. Please check the request parameters.'
    );
  });

  it('should show error modal with HTTP 404 error', async () => {
    const result = await fetchMock(HttpStatusCode.NotFound);
    expect(result.current.error).toBe('HTTP Error 404: Resource not found.');
  });

  it('should show error modal with HTTP 501 error', async () => {
    const result = await fetchMock(HttpStatusCode.NotImplemented);
    expect(result.current.error).toBe('HTTP Error 501: Service not implemented.');
  });

  it('should show error modal with any other errors', async () => {
    const result = await fetchMock(HttpStatusCode.InternalServerError);
    expect(result.current.error).toBe('HTTP Error: 500');
  });
});
