import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import { PaginationContext } from '../../../context/pagination/PaginationContext';

describe('Pagination', () => {
  const renderPagination = () => {
    const mockNavigateToPage = vi.fn();
    const mockContextValue = {
      activePageNumber: 2,
      totalPageNumber: 5,
      navigateToPage: mockNavigateToPage,
      birthdaysData: [],
      paginatedData: [],
      showVisiblePages: () => [1, 2, 3, 4, 5],
      setActivePageNumber: vi.fn()
    } as React.ContextType<typeof PaginationContext>;

    const user = userEvent.setup();

    render(
      <PaginationContext.Provider value={mockContextValue}>
        <Pagination />
      </PaginationContext.Provider>
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
