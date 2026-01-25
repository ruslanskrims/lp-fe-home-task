import { useEffect, useState } from 'react';
import { GeneralInfo } from '../types';

export const usePagination = (birthdaysData: GeneralInfo[], itemsPerPage: number) => {
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [paginatedData, setPaginatedData] = useState<GeneralInfo[]>([]);
  const totalPagesAmount = Math.ceil(birthdaysData.length / itemsPerPage);
  const startIndex = (activePageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const paginatedBirthdayData = birthdaysData.slice(startIndex, endIndex);
    setPaginatedData(paginatedBirthdayData);
    setTotalPageNumber(totalPagesAmount);
  }, [birthdaysData, activePageNumber, startIndex, endIndex, totalPagesAmount]);

  const navigateToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesAmount) {
      setActivePageNumber(pageNumber);
    }
  };

  return {
    activePageNumber,
    setActivePageNumber,
    totalPageNumber,
    paginatedData,
    navigateToPage
  };
};
