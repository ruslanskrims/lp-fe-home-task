import { useState } from 'react';
import { GeneralInfo } from './types';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import BirthdayItem from './BirthdayItem';
import { useFetchOnThisDayData } from './hooks/useFetchOnThisDayData';
import Button from '../../components/Button/Button';
import './BirthdayList.scss';

function BirthdayList() {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const { isLoading, birthdayData, error } = useFetchOnThisDayData(isButtonVisible);
  return (
    <div className="birthday-list__container">
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
        <ul className="birthday-list__items">
          {birthdayData?.map((generalInfo: GeneralInfo, index: number) => (
            <BirthdayItem
              id={index}
              text={generalInfo?.text}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default BirthdayList;
