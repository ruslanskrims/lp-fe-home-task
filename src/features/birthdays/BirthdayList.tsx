import { GeneralInfo } from './types';
import { useBirthdayContext } from './context/BirthdayContext';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import BirthdayItem from './BirthdayItem';
import Button from '../../components/Button/Button';
import SortButton from '../../components/SortButton/SortButton';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import './BirthdayList.scss';

function BirthdayList() {
  const { birthdaysData, isLoading, error, sortOrder, handleToggleSort, setError, fetchData } =
    useBirthdayContext();
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
            <SortButton
              onToggle={handleToggleSort}
              sortedBy={sortOrder[1]}
            />
          )}
          <ul className="birthday-list__items">
            {!isDataEmpty &&
              birthdaysData.map(({ text, year }: GeneralInfo, index: number) => (
                <BirthdayItem
                  key={index}
                  text={text}
                  year={year}
                />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BirthdayList;
