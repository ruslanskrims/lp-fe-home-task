import { GeneralInfo } from './types';
import { useBirthdayContext } from './context/BirthdayContext';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import BirthdayItem from './BirthdayItem';
import Button from '../../components/Button/Button';
import SortButton from '../../components/SortButton/SortButton';
import './BirthdayList.scss';

function BirthdayList() {
  const {
    birthdaysData,
    isLoading,
    error,
    isButtonVisible,
    sortOrder,
    setIsButtonVisible,
    handleToggleSort
  } = useBirthdayContext();

  return (
    <div className="container birthday-list__container">
      <div className="birthday-list__title">Today's Birthdays</div>
      {isButtonVisible ? (
        <Button
          onClick={() => setIsButtonVisible(!isButtonVisible)}
          text={"Get today's birthday list"}
        />
      ) : isLoading ? (
        <LoadingSpinner
          text={'Loading...'}
          color="#407ff3"
        />
      ) : (
        <div>
          <SortButton
            onToggle={handleToggleSort}
            sortedBy={sortOrder[1]}
          />
          <ul className="birthday-list__items">
            {birthdaysData?.map(({ text, year }: GeneralInfo, index: number) => (
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
