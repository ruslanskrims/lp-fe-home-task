import { GeneralInfo } from './types';
import { useBirthdayContext } from './context/BirthdayContext';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import BirthdayItem from './BirthdayItem';
import Button from '../../components/Button/Button';
import SortButton from '../../components/SortButton/SortButton';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import './BirthdayList.scss';
import Pagination from '../../components/Pagination/Pagination';
import { useEffect, useState } from 'react';

function BirthdayList() {
  const { birthdaysData, isLoading, error, sortOrder, handleToggleSort, setError, fetchData } =
    useBirthdayContext();
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [paginatedData, setPaginatedData] = useState<GeneralInfo[]>([]);
  const MAX_ITEMS_PER_PAGE = 15;
  const totalPagesAmount = Math.ceil(birthdaysData.length / MAX_ITEMS_PER_PAGE);
  const startIndex = (activePageNumber - 1) * MAX_ITEMS_PER_PAGE;
  const endIndex = startIndex + MAX_ITEMS_PER_PAGE;

  useEffect(() => {
    const paginatedBirthdayData = birthdaysData.slice(startIndex, endIndex);
    setPaginatedData(paginatedBirthdayData);
    setTotalPageNumber(totalPagesAmount);
  }, [birthdaysData.length, activePageNumber]);

  const isDataEmpty = birthdaysData.length === 0;

  const navigateTOPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesAmount) {
      setActivePageNumber(pageNumber);
    }
  };

  return (
    <div className="container birthday-list__container">
      <div className="birthday-list__title">Today's Birthdays</div>
      {error && (
        <ErrorModal
          error={error}
          setError={setError}
        />
      )}
      <Button
        onClick={fetchData}
        text={"Get today's birthday list"}
        disabled={isLoading}
      />
      {isLoading ? (
        <LoadingSpinner
          text={'Loading...'}
          color="#407ff3"
        />
      ) : (
        <div className="birthday-list">
          {!isDataEmpty && (
            <>
              <SortButton
                onToggle={handleToggleSort}
                sortedBy={sortOrder[1]}
              />

              <ul className="birthday-list__items">
                {paginatedData.map(({ text, year }: GeneralInfo, index: number) => (
                  <BirthdayItem
                    key={index}
                    text={text}
                    year={year}
                  />
                ))}
              </ul>
              <Pagination
                activePageNumber={activePageNumber}
                onPageChange={pageNumber => setActivePageNumber(pageNumber)}
                onHandleNextPage={() => navigateTOPage(activePageNumber + 1)}
                onHandlePreviousPage={() => navigateTOPage(activePageNumber - 1)}
                totalPagesNumber={totalPageNumber}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BirthdayList;
