import Button from '../../../shared/components/Button/Button';
import ErrorModal from '../../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/LoadingSpinner/LoadingSpinner';
import SortButton from '../../../shared/components/SortButton/SortButton';
import Pagination from '../../pagination/components/Pagination';
import { usePaginationContext } from '../../pagination/context/PaginationContext';
import { useBirthdayContext } from '../context/BirthdayContext';
import { GeneralInfo } from '../types/types';
import BirthdayItem from './BirthdayItem';
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
