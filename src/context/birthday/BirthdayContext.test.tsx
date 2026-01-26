import { renderHook, waitFor, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockBirthdayData } from '../../features/birthdays/mocks/mockBirthdayData';
import { BirthdayProvider, useBirthdayContext } from './BirthdayContext';

describe('BirthdayContext', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBirthdayData)
      } as Response)
    );
  });

  it('renders the birthday list and sorts by year by descending order by default', async () => {
    const { result } = renderHook(() => useBirthdayContext(), {
      wrapper: BirthdayProvider
    });

    act(() => {
      result.current.fetchData();
    });

    await waitFor(() => {
      expect(result.current.birthdaysData.length).toBeGreaterThan(0);
    });

    expect(result.current.birthdaysData[0].year).toBe(2009);
    expect(result.current.birthdaysData[1].year).toBe(2004);
  });

  it('toggles sort order when handleToggleSort is called', async () => {
    const { result } = renderHook(() => useBirthdayContext(), {
      wrapper: BirthdayProvider
    });

    act(() => {
      result.current.fetchData();
    });

    await waitFor(() => {
      expect(result.current.birthdaysData.length).toBeGreaterThan(0);
    });

    expect(result.current.birthdaysData[0].year).toBe(2009);
    expect(result.current.sortOrder[1]).toBe('desc');

    act(() => {
      result.current.handleToggleSort();
    });

    expect(result.current.sortOrder[1]).toBe('asc');
    expect(result.current.birthdaysData[0].year).toBe(2001);
  });

  it('sorting order should be descending', async () => {
    const { result } = renderHook(() => useBirthdayContext(), {
      wrapper: BirthdayProvider
    });

    act(() => {
      result.current.fetchData();
    });

    await waitFor(() => {
      expect(result.current.birthdaysData.length).toBeGreaterThan(0);
    });

    expect(result.current.birthdaysData[0].year).toBe(2009);
    expect(result.current.sortOrder[1]).toBe('desc');

    act(() => {
      result.current.handleToggleSort();
    });

    expect(result.current.sortOrder[1]).toBe('asc');
    expect(result.current.birthdaysData[0].year).toBe(2001);

    act(() => {
      result.current.handleToggleSort();
    });

    expect(result.current.sortOrder[1]).toBe('desc');
    expect(result.current.birthdaysData[0].year).toBe(2009);
  });
});
