import { renderHook, waitFor, act, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PaginationProvider, usePaginationContext } from './PaginationContext';
import { BirthdayProvider, useBirthdayContext } from '../birthday/BirthdayContext';
import { mockBirthdayData } from '../../features/birthdays/mocks/mockBirthdayData';
import { usePagination } from '../../shared/hooks/usePagination';

describe('PaginationContext', () => {
  beforeEach(() => {
    const largeMockData = {
      ...mockBirthdayData,
      births: Array.from({ length: 100 }, (_, i) => ({
        text: `Person ${i + 1}, profession`,
        pages: [],
        year: 2000 + i
      }))
    };

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(largeMockData)
      } as Response)
    );
  });

  it('shows visible pages with ellipsis at end when activePageNumber <= 5', async () => {
    const { result } = renderHook(
      () => ({
        pagination: usePaginationContext(),
        birthday: useBirthdayContext()
      }),
      {
        wrapper: ({ children }) => (
          <BirthdayProvider>
            <PaginationProvider>{children}</PaginationProvider>
          </BirthdayProvider>
        )
      }
    );

    act(() => {
      result.current.birthday.fetchData();
    });

    await waitFor(() => {
      expect(result.current.pagination.totalPageNumber).toBeGreaterThan(6);
      expect(result.current.pagination.activePageNumber).toBe(1);
    });

    act(() => {
      result.current.pagination.setActivePageNumber(3);
    });

    const visiblePages = result.current.pagination.showVisiblePages();
    expect(visiblePages).toEqual([1, 2, 3, 4, 5, 6, '...']);
  });

  it('shows visible pages with ellipsis at the end when activePageNumber >= totalPageNumber - 4', async () => {
    const { result } = renderHook(
      () => ({
        pagination: usePaginationContext(),
        birthday: useBirthdayContext()
      }),
      {
        wrapper: ({ children }) => (
          <BirthdayProvider>
            <PaginationProvider>{children}</PaginationProvider>
          </BirthdayProvider>
        )
      }
    );

    act(() => {
      result.current.birthday.fetchData();
    });

    await waitFor(() => {
      expect(result.current.pagination.totalPageNumber).toBeGreaterThan(6);
    });

    act(() => {
      result.current.pagination.setActivePageNumber(6);
    });

    const visiblePages = result.current.pagination.showVisiblePages();
    expect(visiblePages).toEqual(['...', 3, 4, 5, 6, 7, 8]);
  });
});
