import { GeneralInfo } from './types';
import BirthdayItem from './BirthdayItem';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import Button from '../../shared/components/Button/Button';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import SortButton from '../../shared/components/SortButton/SortButton';
import Pagination from '../../shared/components/Pagination/Pagination';
import { useBirthdayContext } from '../../context/birthday/BirthdayContext';
import { usePaginationContext } from '../../context/pagination/PaginationContext';
import './BirthdayList.scss';

function BirthdayList() {
  const { birthdaysData, isLoading, error, sortOrder, handleToggleSort, setError, fetchData } =
    useBirthdayContext();
  const { paginatedData } = usePaginationContext();
  const isDataEmpty = birthdaysData.length === 0;

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
        text="Get today's birthday list"
        disabled={isLoading}
        className="button"
      />
      {isLoading ? (
        <LoadingSpinner
          text="Loading..."
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
              <Pagination />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BirthdayList;
