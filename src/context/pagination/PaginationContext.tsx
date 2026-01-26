import { createContext, useContext, ReactNode } from 'react';
import { GeneralInfo } from '../../features/birthdays/types';
import { usePagination } from '../../shared/hooks/usePagination';
import { useBirthdayContext } from '../birthday/BirthdayContext';

type PaginationContextType = {
  navigateToPage: (pageNumber: number) => void;
  paginatedData: GeneralInfo[];
  activePageNumber: number;
  setActivePageNumber: (pageNumber: number) => void;
  totalPageNumber: number;
  showVisiblePages: () => (number | string)[];
};

export const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export function PaginationProvider({ children }: { children: ReactNode }) {
  const { birthdaysData } = useBirthdayContext();
  const { activePageNumber, setActivePageNumber, totalPageNumber, paginatedData, navigateToPage } =
    usePagination(birthdaysData, 13);

  const showVisiblePages = () => {
    const maxVisiblePages = 6;
    if (totalPageNumber <= maxVisiblePages) {
      return [...Array(totalPageNumber).keys()].map(num => num + 1);
    } else if (activePageNumber <= 5) {
      return [...Array.from({ length: maxVisiblePages }, (_, i) => i + 1), '...'];
    } else if (activePageNumber >= totalPageNumber - 4) {
      return [
        '...',
        ...Array.from(
          { length: maxVisiblePages },
          (_, i) => totalPageNumber - maxVisiblePages + 1 + i
        )
      ];
    }
    return [
      '...',
      activePageNumber - 2,
      activePageNumber - 1,
      activePageNumber,
      activePageNumber + 1,
      activePageNumber + 2,
      '...'
    ];
  };

  return (
    <PaginationContext.Provider
      value={{
        navigateToPage,
        paginatedData,
        activePageNumber,
        setActivePageNumber,
        totalPageNumber,
        showVisiblePages
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export function usePaginationContext() {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePaginationContext must be used within a PaginationContext');
  }
  return context;
}
