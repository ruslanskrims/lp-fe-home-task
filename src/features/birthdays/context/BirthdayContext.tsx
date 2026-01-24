import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GeneralInfo } from '../types';
import { useFetchOnThisDayData } from '../hooks/useFetchOnThisDayData';

type BirthdayContextType = {
  birthdaysData: GeneralInfo[];
  isLoading: boolean;
  error: string | null;
  isButtonVisible: boolean;
  sortOrder: [keyof GeneralInfo, 'asc' | 'desc'];
  setIsButtonVisible: (isVisible: boolean) => void;
  handleToggleSort: () => void;
};

export const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

export function BirthdayProvider({ children }: { children: ReactNode }) {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [sortedBy, setSortedBy] = useState<[keyof GeneralInfo, 'asc' | 'desc']>(['year', 'desc']);
  const { isLoading, birthdaysData, error, setBirthdaysData } =
    useFetchOnThisDayData(isButtonVisible);

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
        isButtonVisible,
        setIsButtonVisible,
        handleToggleSort
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
