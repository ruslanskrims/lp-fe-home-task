import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import { BirthdayContext } from '../../features/birthdays/context/BirthdayContext';

describe('Pagination', () => {
  const renderPagination = () => {
    const mockNavigateToPage = vi.fn();
    const mockContextValue = {
      activePageNumber: 2,
      totalPageNumber: 5,
      navigateToPage: mockNavigateToPage,
      birthdaysData: [],
      isLoading: false,
      error: null,
      sortOrder: ['year', 'desc'] as [string, 'asc' | 'desc'],
      handleToggleSort: vi.fn(),
      setError: vi.fn(),
      fetchData: vi.fn(),
      paginatedData: [],
      setActivePageNumber: vi.fn()
    } as React.ContextType<typeof BirthdayContext>;

    const user = userEvent.setup();

    render(
      <BirthdayContext.Provider value={mockContextValue}>
        <Pagination />
      </BirthdayContext.Provider>
    );

    return { mockNavigateToPage, user };
  };

  it('calls navigateToPage when page number button is clicked', async () => {
    const { mockNavigateToPage, user } = renderPagination();

    const pageButton = screen.getByRole('button', { name: '4' });
    await user.click(pageButton);

    expect(mockNavigateToPage).toHaveBeenCalledWith(4);
  });

  it('calls navigateToPage when next page number button is clicked', async () => {
    const { mockNavigateToPage, user } = renderPagination();

    const pageButton = screen.getByRole('button', { name: 'Next' });
    await user.click(pageButton);

    expect(mockNavigateToPage).toHaveBeenCalledWith(3);
  });

  it('calls navigateToPage when previous page number button is clicked', async () => {
    const { mockNavigateToPage, user } = renderPagination();

    const pageButton = screen.getByRole('button', { name: 'Previous' });
    await user.click(pageButton);

    expect(mockNavigateToPage).toHaveBeenCalledWith(1);
  });
});
