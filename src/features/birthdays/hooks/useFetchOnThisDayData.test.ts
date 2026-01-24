import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockBirthdayData } from '../../../mocks/birthdays/mockBirthdayData';
import { BirthdayProvider } from '../context/BirthdayContext';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchOnThisDayData } from './useFetchOnThisDayData';

describe('useFetchOnThisDayData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call useFetchOnThisDayData custom hook and fetch data', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBirthdayData)
      } as Response)
    );
    const { result } = renderHook(() => useFetchOnThisDayData(false), {
      wrapper: BirthdayProvider
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.birthdaysData.length).toBe(3);
    expect(result.current.error).toBeNull();
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });
});
