import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { GeneralInfo } from '../../features/birthdays/types';
import { useFetchOnThisDayData } from '../../shared/hooks/useFetchOnThisDayData';

type BirthdayContextType = {
  birthdaysData: GeneralInfo[];
  isLoading: boolean;
  error: string | null;
  sortOrder: [keyof GeneralInfo, 'asc' | 'desc'];
  handleToggleSort: () => void;
  setError: (error: string | null) => void;
  fetchData: () => void;
};

export const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

export function BirthdayProvider({ children }: { children: ReactNode }) {
  const [sortedBy, setSortedBy] = useState<[keyof GeneralInfo, 'asc' | 'desc']>(['year', 'desc']);
  const { isLoading, birthdaysData, error, setError, fetchData } = useFetchOnThisDayData();

  const sortedBirthdaysData = useMemo(() => {
    return [...birthdaysData].sort((a, b) =>
      sortedBy[1] === 'asc' ? a.year - b.year : b.year - a.year
    );
  }, [birthdaysData, sortedBy]);

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
        birthdaysData: sortedBirthdaysData,
        isLoading,
        error,
        sortOrder: sortedBy,
        handleToggleSort,
        setError,
        fetchData
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
}

export function useBirthdayContext() {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error('useBirthdayContext must be used within a BirthdayContext');
  }
  return context;
}
