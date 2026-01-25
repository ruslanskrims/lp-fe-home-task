import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useFetchOnThisDayData } from '../hooks/useFetchOnThisDayData';
import { usePagination } from '../hooks/usePagination';
import { GeneralInfo } from '../types';

type BirthdayContextType = {
  birthdaysData: GeneralInfo[];
  isLoading: boolean;
  error: string | null;
  sortOrder: [keyof GeneralInfo, 'asc' | 'desc'];
  handleToggleSort: () => void;
  setError: (error: string | null) => void;
  fetchData: () => void;
  navigateToPage: (pageNumber: number) => void;
  paginatedData: GeneralInfo[];
  activePageNumber: number;
  setActivePageNumber: (pageNumber: number) => void;
  totalPageNumber: number;
};

export const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

export function BirthdayProvider({ children }: { children: ReactNode }) {
  const [sortedBy, setSortedBy] = useState<[keyof GeneralInfo, 'asc' | 'desc']>(['year', 'desc']);
  const { isLoading, birthdaysData, error, setBirthdaysData, setError, fetchData } =
    useFetchOnThisDayData();
  const { activePageNumber, setActivePageNumber, totalPageNumber, paginatedData, navigateToPage } =
    usePagination(birthdaysData, 15);

  useEffect(() => {
    if (birthdaysData.length > 0) {
      setBirthdaysData(prevBirthdaysData =>
        [...prevBirthdaysData].sort((a, b) => {
          if (sortedBy[1] === 'asc') {
            return a.year - b.year;
          } else {
            return b.year - a.year;
          }
        })
      );
    }
  }, [sortedBy, birthdaysData.length]);

  const handleToggleSort = () => {
    if (sortedBy[1] === 'asc') {
      setSortedBy([sortedBy[0], 'desc']);
    } else {
      setSortedBy([sortedBy[0], 'asc']);
    }
  };

  return (
    <BirthdayContext.Provider
      value={{
        birthdaysData,
        isLoading,
        error,
        sortOrder: sortedBy,
        handleToggleSort,
        setError,
        fetchData,
        navigateToPage,
        paginatedData,
        activePageNumber,
        setActivePageNumber,
        totalPageNumber
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
}

export function useBirthdayContext() {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error('useBirthdayContext must be used within a BirthdayProvider');
  }
  return context;
}
