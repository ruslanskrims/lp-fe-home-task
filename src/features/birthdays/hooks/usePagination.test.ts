import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePagination } from './usePagination';
import { BirthdayProvider } from '../context/BirthdayContext';
import { mockBirthdayData } from '../../../mocks/birthdays/mockBirthdayData';
import { act } from 'react';

describe('usePagination', () => {
  it('should render 2 pages for the pagination', async () => {
    const { result } = renderHook(() => usePagination(mockBirthdayData.births, 2), {
      wrapper: BirthdayProvider
    });

    expect(result.current.activePageNumber).toBe(1);
    expect(result.current.totalPageNumber).toBe(2);
  });

  it('should navigate to the page between first and last pages', async () => {
    const { result } = renderHook(() => usePagination(mockBirthdayData.births, 1), {
      wrapper: BirthdayProvider
    });

    expect(result.current.activePageNumber).toBe(1);
    expect(result.current.totalPageNumber).toBe(4);

    act(() => {
      result.current.navigateToPage(3);
    });

    expect(result.current.activePageNumber).toBe(3);
  });
});
